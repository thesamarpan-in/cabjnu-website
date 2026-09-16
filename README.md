# Centre for Ayurveda Biology, JNU — Website

Phase 1 (static site) + Phase 2 (research database schema) of the
[roadmap](../CAB-JNU-Digital-Ecosystem-Roadmap.md).

Live at: `https://ayurveda.thesamarpan.co.in` (once DNS + Pages are wired
up — see below).

## Stack

- Next.js (static export — `output: 'export'`, no server runtime)
- Tailwind CSS
- Supabase (Postgres + Auth) — called client-side, secured by Row-Level
  Security, not by hiding the anon key
- Hosted on GitHub Pages, deployed via GitHub Actions on every push to `main`

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project's URL + anon key
npm run dev                  # http://localhost:3000
```

## First-time repo setup (do this once)

1. Create a new **empty** GitHub repository (do not use
   `theharshranjan/theharshranjan.github.io` — that repo is Samarpan's
   live commercial site; this needs to stay separate).
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial Phase 1 + 2 scaffold"
   git branch -M main
   git remote add origin https://github.com/<your-account>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo's **Settings -> Pages**, set Source to "GitHub Actions."
4. In **Settings -> Secrets and variables -> Actions**, add two repository
   secrets so the build has them (the workflow reads them at build time):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. In **Settings -> Pages -> Custom domain**, enter
   `ayurveda.thesamarpan.co.in` (this matches `public/CNAME`, which
   GitHub Pages requires to be present in every deploy).

## DNS (in Cloudflare, same account as thesamarpan.co.in)

Add one record:

| Type  | Name       | Target                    | Proxy status |
|-------|------------|----------------------------|--------------|
| CNAME | `ayurveda` | `<your-account>.github.io` | DNS only (grey cloud, not orange) |

Proxy status must be **DNS only**, not proxied — GitHub Pages issues its
own TLS certificate for the custom domain and needs to see the real
CNAME target directly; Cloudflare's proxy would break that handshake.

## Setting up Supabase (Phase 2)

1. Create a project at supabase.com (free tier).
2. Project -> SQL Editor -> New query -> paste and run
   `supabase/migrations/0001_init.sql`.
3. New query again -> paste and run `supabase/migrations/0002_rls.sql`.
4. Project Settings -> API -> copy the Project URL and `anon` `public`
   key into `.env.local` (local dev) and into the two GitHub Actions
   secrets above (production).

## Adding content

See `docs/data-entry-guide.md` — written for faculty/students with no
coding background.

## What's deliberately not built yet

Per the roadmap: the Medicinal Plant Atlas UI, QR code generation, the
research repository, the knowledge graph view, and the AI assistant.
The database schema (Phase 2) is ready to support all of them, but the
UI ships in the order the roadmap lays out, once each phase's data is
actually populated.
