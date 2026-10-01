/**
 * Contact form endpoint.
 *
 * Sends the message by email through Resend (https://resend.com) when these
 * environment variables are set:
 *   RESEND_API_KEY   — Resend API key
 *   CONTACT_TO       — address that receives the messages
 *   CONTACT_FROM     — verified sender, e.g. "Dasein <website@your-domain>"
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled in: pretend everything went fine.
  if ((body as Record<string, unknown>)?.website) return Response.json({ ok: true });

  const payload = parse(body);
  if (!payload) return Response.json({ ok: false }, { status: 400 });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] email delivery is not configured");
      return Response.json({ ok: false }, { status: 503 });
    }
    console.info("[contact] new message (not sent, email not configured)", payload);
    return Response.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      reply_to: payload.email,
      subject: `New project — ${payload.company} (${payload.name})`,
      text: `${payload.name} — ${payload.company}\n${payload.email}\n\n${payload.project}`,
      html: `<p><strong>${escape(payload.name)}</strong> — ${escape(payload.company)}<br>${escape(payload.email)}</p><p style="white-space:pre-wrap">${escape(payload.project)}</p>`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
