# gusmahler.com

Personal site and newsletter archive for Gus Mahler. Built with Astro 6, Tailwind 4, and MDX.

The site hosts [Prediction Markets Weekly](https://gusmahler.com/newsletter), a weekly briefing on the regulatory battle over U.S. prediction markets. The architecture is described in full in the [architecture doc](https://github.com/Gusmahler1/gusmahler-site/blob/main/docs/architecture.md) — the short version is: MDX is the source of truth, Astro renders the web archive, and a future email pipeline (Phase 2) will render the same MDX to email-safe HTML for sending via Resend.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro 6](https://astro.build) — static site, zero client JS by default |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Content | MDX + Astro Content Collections (content layer API) |
| Hosting | Cloudflare Pages (Phase 1 target) |
| Email send | Resend (Phase 2) |

## Structure

```
src/
├── content.config.ts       Zod schemas for issues, essays, projects collections
├── content/
│   ├── issues/             One .mdx per newsletter issue (2026-04-27.mdx, etc.)
│   ├── essays/             Long-form writing (Phase 3)
│   └── projects/           Project writeups (Phase 3)
├── components/
│   ├── GlanceList.astro    "This Week at a Glance" bullet section
│   ├── ScorecardTable.astro  Regulatory scorecard (Front / Status / Note)
│   ├── ImplicationBox.astro  Blue left-border callout box
│   └── SubscribeForm.astro   Email signup placeholder (wired in Phase 2)
├── layouts/
│   ├── BaseLayout.astro    Site chrome: nav, footer, meta
│   ├── IssueLayout.astro   Newsletter issue wrapper
│   └── EssayLayout.astro   Essay wrapper
└── pages/
    ├── index.astro         Home
    ├── about.astro         About
    ├── newsletter/
    │   ├── index.astro     Archive index
    │   └── [slug].astro    Per-issue page
    ├── writing/
    │   ├── index.astro     Essays index (placeholder)
    │   └── [slug].astro    Per-essay page
    └── projects/
        └── index.astro     Projects index (placeholder)
```

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # production build to dist/
npm run preview    # preview the build
```

## Adding a new issue

1. Create `src/content/issues/YYYY-MM-DD.mdx`
2. Add frontmatter: `title`, `date`, `subject`, `preview`, `glance` (array), `scorecard` (array of `{front, status, note}`)
3. Write the body in MDX. Use `<ImplicationBox>` for implication callouts — it takes children so you trim inline.
4. `npm run dev` and verify at `http://localhost:4321/newsletter/YYYY-MM-DD`
5. Commit and push. Cloudflare Pages rebuilds in ~30s.

## Brand palette

Defined via Tailwind 4 `@theme` in `src/styles/global.css`:

| Token | Hex | Usage |
|---|---|---|
| `sports` | `#4a7cdc` | Sports segment |
| `politics` | `#d4820a` | Politics segment |
| `financial` | `#2ab09a` | Financial/crypto segment |
| `other` | `#8a6fbe` | Other/niche segment |

Use as `text-sports`, `bg-politics`, `border-financial`, etc.

## Build phases

- **Phase 1 (this branch):** Astro site, MDX content pipeline, web archive, local dev only.
- **Phase 2:** react-email template, Resend send script, subscriber storage, one-command send.
- **Phase 3:** /writing essays, /projects writeups, RSS feed, OG images, sitemap.

Architecture doc: [`2026-05-12_architecture.md`](docs/architecture.md) *(to be committed)*
