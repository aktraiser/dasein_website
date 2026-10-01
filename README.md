# Dasein — website

Next.js 16 (App Router) + TypeScript. Bilingual (EN reference, FR), no CMS: all content lives in the repository.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things are

| Path | What |
| --- | --- |
| `content/dictionaries/en.ts`, `fr.ts` | All site copy. `fr.ts` is typed against `en.ts`, so a missing translation fails the build. |
| `content/work.ts` | Work / cases. Add an entry to publish a case. |
| `content/lab.ts` | Lab research tracks and log entries (experiments, demos, publications, open source). |
| `app/[lang]/…` | Pages: home, expertise, work, lab, about, contact. |
| `components/Architecture.tsx` | Scroll-driven Data → Knowledge → Intelligence → Agent → Enterprise → Infrastructure diagram. |
| `components/Ecosystem.tsx` | Interactive ecosystem matrix (routes across Data / AI / Agentic / Enterprise / Cloud). |
| `components/HeroGraph.tsx` | Animated network behind the hero. |
| `app/globals.css` | Design tokens (top of file) and all styles. |
| `app/api/contact/route.ts` | Contact form endpoint (Resend). |
| `proxy.ts` | Redirects `/` and un-prefixed paths to `/en` or `/fr` (cookie, then `Accept-Language`). |

## Configuration

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL` — production URL, used for canonical, hreflang, sitemap and Open Graph.
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` — contact form delivery. Without them, messages are only logged in development, and the endpoint returns 503 in production.

## Deploy

Works as-is on Vercel (import the repo, set the env vars). For Cloudflare, use the OpenNext adapter (`@opennextjs/cloudflare`).

## Adding a language

Add the locale to `lib/i18n.ts`, create `content/dictionaries/<locale>.ts`, register it in `content/dictionaries/index.ts`, and add the translations in `content/work.ts` and `content/lab.ts`.
