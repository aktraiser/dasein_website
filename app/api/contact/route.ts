import nodemailer from "nodemailer";

/**
 * Contact form endpoint.
 *
 * Sends the message by email through the site's own mailbox (SMTP) when these
 * environment variables are set:
 *   SMTP_USER      — mailbox login, e.g. "contact@your-domain"
 *   SMTP_PASS      — mailbox password
 *   CONTACT_TO     — address that receives the messages
 *   CONTACT_FROM   — optional sender, e.g. "Dasein <contact@your-domain>" (defaults to SMTP_USER)
 *   SMTP_HOST      — optional, defaults to smtp.hostinger.com
 *   SMTP_PORT      — optional, defaults to 465 (implicit TLS)
 * Without them, messages are only logged (useful in development).
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { name: string; company: string; email: string; project: string };

function parse(body: unknown): Payload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  const fields = ["name", "company", "email", "project"] as const;
  const out = {} as Payload;
  for (const field of fields) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 5000) return null;
    out[field] = value.trim();
  }
  return EMAIL.test(out.email) ? out : null;
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// At most 5 messages per address every 10 minutes. Kept in memory: enough for the
// single server process the site runs on, and it resets on each deploy.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  hits.set(ip, [...recent, now]);
  // Forget addresses that have gone quiet, so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
  }
  return false;
}

export async function POST(request: Request) {
  if (limited(request)) {
    return Response.json({ ok: false }, { status: 429, headers: { "Retry-After": "600" } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled in: pretend everything went fine.
  if ((body as Record<string, unknown>)?.hp_check) {
    console.warn("[contact] message dropped: honeypot field was filled in");
    return Response.json({ ok: true });
  }

  const payload = parse(body);
  if (!payload) return Response.json({ ok: false }, { status: 400 });

  const { SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM, SMTP_HOST, SMTP_PORT } = process.env;

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] email delivery is not configured");
      return Response.json({ ok: false }, { status: 503 });
    }
    console.info("[contact] new message (not sent, email not configured)", payload);
    return Response.json({ ok: true });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: payload.email,
      subject: `New project — ${payload.company} (${payload.name})`,
      text: `${payload.name} — ${payload.company}\n${payload.email}\n\n${payload.project}`,
      html: `<p><strong>${escape(payload.name)}</strong> — ${escape(payload.company)}<br>${escape(payload.email)}</p><p style="white-space:pre-wrap">${escape(payload.project)}</p>`,
    });
  } catch (error) {
    // Never log the credentials: only the reason reported by the mail server.
    console.error("[contact] SMTP error", error instanceof Error ? error.message : error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
