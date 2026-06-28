# Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Companion: read `2026-06-28-portfolio-site-design.md` (the spec) before any task.

**Goal:** Build & ship a bilingual (EN/VI), charcoal-copper, cinematic-yet-credible Next.js portfolio at `hgthinhng.vercel.app` that positions HT for buy-side recruiters across 4 pillars (Analyze / Build / AI-Solutions / Teach).

**Architecture:** Next.js 16 App Router (RSC) single-scroll landing (8 sections) + `/research` index + Velite-MDX case-study pages. Bilingual via next-intl `[locale]` routing with a hot-swap EN|VI toggle. Reuse proven patterns from the existing `stoix-read` repo (Velite + next-intl + Tailwind + motion). Charcoal+Copper design system. No 3D — wow from typography, scroll choreography, animated data-viz.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Motion (`motion/react`) · Lenis · next-intl · Velite (MDX) · Recharts + TanStack Table · Geist Sans/Mono + Source Serif 4 · lucide-react · next/image + @vercel/og · Vercel.

## Global Constraints

- **Dev location:** canonical repo lives in **WSL** `/home/hgthinhng/portfolio-site` (NOT `/mnt/c`). NEVER run `npm install` from WSL onto a `/mnt/c` path — it corrupts node bins ([[feedback_wsl_npm_install_breaks_windows_bat]]). All `npm`/`pnpm` commands run inside WSL against the WSL path.
- **Package manager:** `pnpm` (match modern Next.js tooling). If pnpm absent, `npm` is acceptable — stay consistent.
- **Next.js:** v16 App Router + React Server Components. Client components only where motion/interactivity requires (`'use client'` islands).
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js` JS object). Exactly ONE accent color: copper `#B87333`.
- **Fonts:** Geist Sans (display/UI), Geist Mono (numbers/data), Source Serif 4 (research body) — via `next/font`, self-hosted, CLS=0.
- **Locales:** `en` + `vi`. Auto-detect (Accept-Language). Sticky hot-swap toggle, cookie-persisted, instant (no full reload).
- **Copy rules (honesty gates — MANDATORY, copied from spec §10):** "built & validating" not "live capital"; microfin outputs = "scenario hypotheses, not probabilities/signals, not backtested"; "Passed CFA Levels I-III" not "charterholder"; teaching = independent/contract; clients anonymized; enterprise quoting (DN) = "anonymized enterprise AI-quoting consulting (POC stage)", no identifying detail; IHK = applied-AI engineering, never "personal second brain"; solo founder, never invent co-founders.
- **No-3D rule:** no react-three-fiber / WebGL / particle libs in v1.
- **Accessibility:** WCAG 2.2 AA target; honor `prefers-reduced-motion`; keyboard-navigable; labeled charts.
- **Commits:** frequent, conventional (`feat:`, `chore:`, `style:`), end with the Co-Authored-By line per environment rules. Commit after every task. Do NOT push until operator asks (work on a branch).
- **Responsive: PC-FIRST + both orientations (operator directive).** Primary target = desktop/laptop (recruiters on PC). Design desktop-first (≥1280 is the hero canvas), then adapt DOWN to tablet (≥768) and mobile (≥360). Every breakpoint MUST be tested in BOTH landscape AND portrait (phone-landscape, tablet-portrait, tablet-landscape) using `@media (orientation: …)` where layout must reflow. No section may overflow or clip at any orientation.
- **Verification mindset:** a task is "done" only when its **Gate:** passes — build green + the stated check. Never claim done on "it should work".

---

## Build Discipline (read before EVERY task — non-negotiable)

**1. Refer the full build files on every task.** Before writing any code, RE-READ: (a) the relevant section of the design spec `2026-06-28-portfolio-site-design.md`, and (b) the named reference file(s) in `/home/hgthinhng/stoix-read` for the pattern being lifted. Never build a task from the plan summary alone — open the spec section + the stoix-read source each time.

**2. Leverage the design skills on every UI/visual task** (both installed in the WSL profile `~/.claude/skills/`):
- **`design-taste-frontend`** — invoke FIRST on any new section/component: state the Design Read + apply the dials below, then build. It is the anti-slop portfolio skill.
- **`impeccable`** — invoke its sub-commands during build/refine: `shape` before a complex section, `craft` to build end-to-end, then `audit` (a11y/perf/responsive) + `critique` (UX) + `polish` at each phase gate; `typeset`/`layout`/`animate` for targeted passes. Honor its **absolute bans** (NO gradient text, NO per-section eyebrows or 01/02/03 numbered markers, NO side-stripe borders, NO identical card grids, NO hero-metric template, NO default glassmorphism) and run its **AI-slop test** before every ⛔ gate.

**3. LOCKED Design Read + dials (use as global config for all UI tasks):**
> Reading this as: an **investor-builder portfolio** for **buy-side / fund recruiters (VN + international, conservative)**, with a **restrained-premium editorial** language, leaning toward **Next.js RSC + Tailwind v4 + a committed charcoal-copper palette + scroll-driven motion.**
- `DESIGN_VARIANCE: 6` (premium yet credible — not Awwwards-chaotic)
- `MOTION_INTENSITY: 5` (cinematic-restrained; ease-out, no bounce)
- `VISUAL_DENSITY: 3–4` (airy; typography + whitespace carry the luxury)
- Color strategy = **Committed** (copper carries identity against charcoal); exactly ONE accent.
- Anti-default bans: NO AI-purple, NO centered-hero-over-mesh, NO three-equal-feature-cards reflex, NO Inter+slate-900, NO glassmorphism-everywhere.

**4. PC-first + both orientations** — see Global Constraints. Desktop is the design canvas; adapt down; test landscape AND portrait at every breakpoint.

**5. Gate every task + every phase.** Each task ends at its explicit **Gate:** (build green + stated check). Each phase ends at a ⛔ PHASE GATE — STOP for operator review; never roll past a red gate.

---

# PHASE 0 — Scaffold & Deploy Skeleton

**Phase gate:** `hgthinhng.vercel.app` (or a Vercel preview URL) loads a live charcoal page with working EN|VI toggle; `pnpm build` green; `pnpm lint` clean.

### Task 0.1: Create Next.js repo in WSL

**Files:**
- Create: `/home/hgthinhng/portfolio-site/` (whole repo)
- Create: `/home/hgthinhng/portfolio-site/docs/` (copy the 2 design/plan docs in)

- [ ] **Step 1: Scaffold**

Run (in WSL):
```bash
cd /home/hgthinhng
pnpm create next-app@latest portfolio-site --ts --eslint --app --tailwind --src-dir --import-alias "@/*" --use-pnpm
cd portfolio-site
```
Accept defaults; confirm App Router + Tailwind + src dir.

- [ ] **Step 2: Copy design docs into repo**

```bash
mkdir -p /home/hgthinhng/portfolio-site/docs
cp "/mnt/c/Users/PC/Desktop/HT-CV/portfolio-site/docs/2026-06-28-portfolio-site-design.md" /home/hgthinhng/portfolio-site/docs/
cp "/mnt/c/Users/PC/Desktop/HT-CV/portfolio-site/docs/2026-06-28-portfolio-site-PLAN.md" /home/hgthinhng/portfolio-site/docs/
```

- [ ] **Step 3: Verify dev server boots**

Run: `pnpm dev` → open http://localhost:3000 → see Next.js starter. Ctrl-C.
Expected: page renders, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js 16 portfolio-site + design docs"
```

### Task 0.2: Confirm Next.js 16 + Tailwind v4 + clean baseline

**Files:**
- Modify: `package.json`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/layout.tsx`

- [ ] **Step 1: Pin versions**

In `package.json` ensure `next@^16`, `react@^19`, `tailwindcss@^4`. If scaffold gave older, run `pnpm add next@latest react@latest react-dom@latest` and `pnpm add -D tailwindcss@latest @tailwindcss/postcss`.

- [ ] **Step 2: Strip starter boilerplate**

Replace `src/app/page.tsx` body with a minimal `<main className="min-h-dvh grid place-items-center"><h1>HT</h1></main>`. Remove starter CSS in `globals.css` except the Tailwind import line `@import "tailwindcss";`.

- [ ] **Step 3: Build gate**

Run: `pnpm build`
Expected: build succeeds, no type errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: clean baseline, pin Next 16 / React 19 / Tailwind v4"
```

### Task 0.3: Charcoal+Copper design tokens + fonts

**Files:**
- Modify: `src/app/globals.css` (Tailwind `@theme` tokens)
- Create: `src/app/fonts.ts` (next/font)
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom props `--color-bg`, `--color-surface`, `--color-copper`, `--color-fg`, `--color-muted`; font CSS vars `--font-sans`, `--font-mono`, `--font-serif`.

- [ ] **Step 1: Define tokens in globals.css**

```css
@import "tailwindcss";

@theme {
  --color-bg: #161413;          /* warm charcoal */
  --color-surface: #1f1c1a;     /* raised surface */
  --color-copper: #b87333;      /* single accent */
  --color-copper-soft: #c98a4e;
  --color-fg: #ede8e2;          /* off-white */
  --color-muted: #9a938b;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-source-serif);
}

html { background: var(--color-bg); color: var(--color-fg); }
::selection { background: var(--color-copper); color: var(--color-bg); }
```

- [ ] **Step 2: Wire fonts**

```ts
// src/app/fonts.ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Source_Serif_4 } from "next/font/google";

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"], variable: "--font-source-serif", display: "swap",
});
export { GeistSans, GeistMono };
```
Run: `pnpm add geist`.

- [ ] **Step 3: Apply in layout**

In `src/app/layout.tsx`, add the three font variables to `<html className={...}>` (`GeistSans.variable`, `GeistMono.variable`, `sourceSerif.variable`), set `<body className="font-sans bg-bg text-fg">`.

- [ ] **Step 4: Verify visually**

Run `pnpm dev`; the `<h1>HT</h1>` shows off-white on warm charcoal in Geist. Selection highlight is copper.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: charcoal+copper tokens + Geist/Source Serif fonts"
```

### Task 0.4: next-intl bilingual baseline (en/vi) + `[locale]` routing

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Create: `messages/en.json`, `messages/vi.json`
- Move: `src/app/layout.tsx` + `page.tsx` → `src/app/[locale]/layout.tsx` + `page.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: `routing` (locales `['en','vi']`, defaultLocale `'en'`, `localeDetection: true`), `useTranslations()` available in components, `getMessages()` server-side.

- [ ] **Step 1: Install**

Run: `pnpm add next-intl`.

- [ ] **Step 2: Routing config**

```ts
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
  localeDetection: true,
});
```

- [ ] **Step 3: Request + middleware + plugin** (follow next-intl App Router docs exactly: `src/i18n/request.ts` returning messages per locale; `src/middleware.ts` using `createMiddleware(routing)` with matcher excluding `/_next`, `/api`, static; wrap `next.config.ts` with `createNextIntlPlugin()`).

- [ ] **Step 4: Move app under `[locale]`** and load messages in `[locale]/layout.tsx` via `NextIntlClientProvider`. Add `messages/en.json` `{"hero":{"title":"..."}}` and `messages/vi.json` with VI.

- [ ] **Step 5: Verify both locales**

Run `pnpm dev`: `/en` and `/vi` both render; `/` redirects per Accept-Language.
Expected: no missing-message errors.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: next-intl en/vi routing + middleware + messages"
```

### Task 0.5: Hot-swap EN|VI toggle component

**Files:**
- Create: `src/components/ui/locale-toggle.tsx` (`'use client'`)
- Create: `src/components/layout/site-header.tsx`
- Modify: `src/app/[locale]/layout.tsx` (render header)

**Interfaces:**
- Consumes: `routing` from `src/i18n/routing.ts`.
- Produces: `<LocaleToggle />`, `<SiteHeader />`.

- [ ] **Step 1: Toggle component**

A sticky segmented control rendering `EN | VI`; active locale has copper background; on click, `useRouter().replace(pathname, {locale})` from `next-intl/navigation` (instant client swap, no reload); persists via the cookie next-intl sets. Keyboard-accessible (`role="group"`, buttons).

- [ ] **Step 2: Header** — sticky top, transparent→charcoal on scroll, left = wordmark "HT", right = `<LocaleToggle/>`.

- [ ] **Step 3: Playwright smoke**

Run a quick check (or manual): load `/en`, click VI → URL becomes `/vi`, header label flips, no full reload (no white flash).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: sticky hot-swap EN|VI locale toggle + header"
```

### Task 0.6: Deploy skeleton to Vercel

**Files:**
- Create: `vercel.json` (if needed), confirm Vercel project.

- [ ] **Step 1: Push branch + import to Vercel** — operator action: create Vercel project from the repo (or `vercel` CLI), set project name so the URL is `hgthinhng.vercel.app` (rename in Vercel dashboard → Settings → Domains). No env vars needed yet.

- [ ] **Step 2: Verify live**

Open the Vercel URL → charcoal page + working EN|VI toggle. Run `gh api repos/<owner>/portfolio-site/commits/<sha>/status` or check Vercel dashboard for green deploy ([[reference_vercel_deploy_via_gh]]).

- [ ] **Step 3: Commit any config**

```bash
git add -A && git commit -m "chore: vercel deploy config"
```

**⛔ PHASE 0 GATE:** live URL renders, toggle works, build+lint green. Stop and let operator eyeball the live URL before Phase 1.

---

# PHASE 1 — Design System & Landing Shell (8 sections, static)

**Phase gate:** all 8 sections render top-to-bottom in both locales with placeholder copy from `messages/*`, responsive (mobile+desktop), scroll-reveal works, Lighthouse perf ≥ 90 on the static shell.

### Task 1.1: shadcn/ui init + base primitives

**Files:** `components.json`, `src/components/ui/*`

- [ ] **Step 1:** `pnpm dlx shadcn@latest init` → choose: style "new-york", base color "neutral", CSS variables yes. Point it at the charcoal-copper tokens (it should read Tailwind v4 theme).
- [ ] **Step 2:** Add primitives we'll use: `pnpm dlx shadcn@latest add button card badge separator`.
- [ ] **Step 3:** Verify a `<Button variant="outline">` renders with copper focus ring (tweak the generated CSS vars to map onto our tokens).
- [ ] **Step 4: Commit** `feat: shadcn/ui init + base primitives mapped to charcoal-copper`.

### Task 1.2: Motion + Lenis scaffolding (reuse stoix-read patterns)

**Files:**
- Create: `src/components/motion/reveal.tsx` (`'use client'`), `src/components/motion/lenis-provider.tsx`
- Reference: `/home/hgthinhng/stoix-read/` motion + scroll utilities (lift patterns, adapt names).

**Interfaces:**
- Produces: `<Reveal>` (fade+rise on in-view, respects reduced-motion), `<LenisProvider>` (wraps app).

- [ ] **Step 1:** `pnpm add motion lenis`.
- [ ] **Step 2:** `<Reveal>` uses `motion`'s `whileInView` opacity 0→1, y 16→0, `viewport={{once:true}}`, `ease:"easeOut"`, and short-circuits to no-animation when `useReducedMotion()` is true.
- [ ] **Step 3:** `<LenisProvider>` initializes Lenis, raf loop, cleanup on unmount; mount in `[locale]/layout.tsx`.
- [ ] **Step 4: Verify** scroll feels smooth; a wrapped block fades in on scroll; with OS reduce-motion on, it appears instantly.
- [ ] **Step 5: Commit** `feat: Motion Reveal + Lenis smooth scroll providers`.

### Task 1.3: Section scaffold + anchor nav

**Files:**
- Create: `src/components/sections/section.tsx` (shared wrapper: id, padding, max-width), `src/app/[locale]/page.tsx` (compose 8 sections in order)
- Create stub components: `src/components/sections/{hero,pillars,research,engine,ai-solutions,teach,about,contact}.tsx`

**Interfaces:**
- Produces: `<Section id="..." className="...">`, and 8 section components each exporting default. Pillars/footer anchors use the section ids (`#analyze`,`#build`,`#ai`,`#teach`,`#about`,`#contact`).

- [ ] **Step 1:** Build `<Section>` (semantic `<section>`, `scroll-mt` for sticky header offset, consistent vertical rhythm).
- [ ] **Step 2:** Create the 8 stubs (each renders its title from `useTranslations`), compose in `page.tsx`.
- [ ] **Step 3: Verify** page scrolls through 8 labeled bands in both `/en` and `/vi`; clicking a pillar anchor jumps to the right section (with Lenis).
- [ ] **Step 4: Commit** `feat: 8-section landing scaffold + anchor nav`.

### Task 1.4: Hero section

**Files:** `src/components/sections/hero.tsx`, messages keys `hero.*`

- [ ] **Step 1:** Layout per spec §2/§4.1: bold hero line (Geist display, large), copper-glow radial background + subtle film-grain overlay (CSS only), kicker line (4 pillars), bridge line, two CTAs (`View research` → `/[locale]/research`, `Contact` → `#contact`). Headline reveal via `<Reveal>` stagger.
- [ ] **Step 2:** Put EN + VI hero/kicker/bridge text in `messages/*` (draft from spec; operator finalizes later — placeholder allowed but mark `// TODO operator-final` in a comment, real text in messages).
- [ ] **Step 3: Verify** hero looks cinematic on desktop + mobile, both locales, no layout shift, grain doesn't tank perf.
- [ ] **Step 4: Commit** `feat: hero section (charcoal + copper glow + reveal)`.

### Task 1.5: 4 Pillars section

**Files:** `src/components/sections/pillars.tsx`, `src/content/pillars.ts` (data), messages `pillars.*`

**Interfaces:**
- Produces: `PILLARS` array `{ key, icon, anchor, metricKey }[]` consumed only here.

- [ ] **Step 1:** 4 cards (Analyze/Build/AI-Solutions/Teach), each lucide icon + label + 1-line + 1 metric + anchor link. Hover micro-interaction (copper border, slight lift) via Motion `whileHover`.
- [ ] **Step 2:** Metrics from spec (e.g. Build "130 tickers · daily"; Teach "7+ exam tracks, live"). Honesty-safe.
- [ ] **Step 3: Verify** 4 cards responsive grid (1col mobile → 4col desktop), anchors jump correctly, both locales.
- [ ] **Step 4: Commit** `feat: 4-pillar section with anchored cards`.

### Task 1.6: Remaining 6 section shells (Research/Engine/AI/Teach/About/Contact)

> Each is a static shell here (real data/viz/content come in P2/P3/P5). Build them as styled, responsive, bilingual placeholders with the correct headings, intro copy, and slots.

- [ ] **Step 1: Research** — section title + a 3-card grid placeholder + "See all writing →" and "Read my full publication →" buttons (hrefs: `/[locale]/research`, `https://stoix-read.vercel.app`).
- [ ] **Step 2: Engine** — title + intro + a row of 4 number-card placeholders + a chart placeholder box + architecture-diagram placeholder.
- [ ] **Step 3: AI-Solutions** — title + 5 item slots (news engine / exam-ops tutor / Opvia / enterprise-quoting-anon / IHK) with live-demo link slots.
- [ ] **Step 4: Teach** — title + exam-ops live-link card + curriculum stat + teaching list.
- [ ] **Step 5: About** — title + headshot slot + short story placeholder + credentials list (honesty-gated copy).
- [ ] **Step 6: Contact** — email, LinkedIn, Download CV button, copper CTA.
- [ ] **Step 7: Verify** full page scroll both locales, responsive, scroll-reveal on each.
- [ ] **Step 8: Commit** `feat: research/engine/ai/teach/about/contact section shells`.

**⛔ PHASE 1 GATE:** all 8 sections present + styled + bilingual + responsive + reveal; Lighthouse perf ≥90 on shell. Operator eyeball.

---

# PHASE 2 — Content Layer (Velite + bilingual MDX) & Research

**Phase gate:** `/[locale]/research` lists articles from MDX; a case-study page renders bilingual MDX with custom components; Ngư Ông Đắc Lợi migrated; build green.

### Task 2.1: Velite setup (reuse stoix-read config)

**Files:** `velite.config.ts`, `src/content/research/` (mdx), `package.json` build script

**Interfaces:**
- Produces: generated `.velite/` with `research` collection: `{ slug, locale, title, date, summary, tags[], cover?, featured, external?, sources[] }`.

- [ ] **Step 1:** `pnpm add -D velite`. Copy & adapt `/home/hgthinhng/stoix-read/velite.config.ts` schema to our frontmatter (add `external` URL field for StoiX-Read-linked items, `locale` field).
- [ ] **Step 2:** Update build to `velite && next build` (mirror stoix-read `vercel.json` / package scripts). Add `.velite` to `.gitignore`.
- [ ] **Step 3:** Create one sample `src/content/research/sample.en.mdx` + `sample.vi.mdx` with full frontmatter.
- [ ] **Step 4: Verify** `pnpm build` runs velite, generates the collection, no schema errors.
- [ ] **Step 5: Commit** `feat: Velite bilingual research content layer`.

### Task 2.2: MDX research components

**Files:** `src/components/mdx/{thesis-box,kpi-ribbon,chart-embed,pull-quote,risk-note,source-list}.tsx`, `src/components/mdx/mdx-content.tsx`

**Interfaces:**
- Produces: MDX component map `{ ThesisBox, KPIRibbon, ChartEmbed, PullQuote, RiskNote, SourceList }`; `<MDXContent code={...} />`.

- [ ] **Step 1:** Build the 6 components (charcoal-copper styled): ThesisBox (callout), KPIRibbon (stat row), PullQuote (serif), RiskNote (amber-muted callout), SourceList (numbered refs), ChartEmbed (wraps a Recharts chart by key — stub until P3).
- [ ] **Step 2:** Wire MDX renderer (use stoix-read's approach — Velite emits compiled code; render via its component).
- [ ] **Step 3: Verify** sample article renders all 6 components in both locales.
- [ ] **Step 4: Commit** `feat: MDX research memo components (thesis/kpi/quote/risk/sources/chart)`.

### Task 2.3: `/research` index + case-study route

**Files:** `src/app/[locale]/research/page.tsx`, `src/app/[locale]/research/[slug]/page.tsx`

**Interfaces:**
- Consumes: Velite `research` collection.
- Produces: index list (featured first, tag chips, date, EN/VI-aware) + dynamic case-study page (`generateStaticParams` over slugs×locales), `external` items render as outbound links not internal pages.

- [ ] **Step 1:** Index page: filter by current locale, sort featured→date, card grid; a banner CTA "Read my full publication →" to stoix-read.
- [ ] **Step 2:** `[slug]` page: load MDX for slug+locale, render memo layout (sticky TOC optional), `hreflang` alternate, per-article OG.
- [ ] **Step 3: Verify** index lists sample; clicking opens case-study; locale switch keeps you on the translated article.
- [ ] **Step 4: Commit** `feat: research index + bilingual case-study route`.

### Task 2.4: Migrate Ngư Ông Đắc Lợi

**Files:** `src/content/research/ngu-ong-dac-loi.en.mdx` + `.vi.mdx`, `public/research/ngu-ong-dac-loi.pdf`, cover image

- [ ] **Step 1:** Copy the PDF to `public/research/` (from `SELLING MYSELF/03_Showcase/Research-NguOngDacLoi.pdf`). Author a bilingual thesis summary in MDX (Thesis→Evidence→Risk→Conclusion) drawn from MASTER_PROFILE §1.1; embed a PDF preview/download link. Honesty-gated.
- [ ] **Step 2:** Mark `featured: true`. Add 2 placeholder StoiX-Read-linked `external` entries (operator picks final 2-3 in P5).
- [ ] **Step 3: Verify** it shows as a featured case-study, both locales, PDF opens.
- [ ] **Step 4: Commit** `feat: migrate Ngu Ong Dac Loi research case-study`.

**⛔ PHASE 2 GATE:** research index + case-study live, Ngư Ông published bilingual, Velite in build. Operator eyeball.

---

# PHASE 3 — The Engine viz (data-viz that proves "research engine")

**Phase gate:** Engine section shows animated number cards + a real Recharts chart + an architecture mini-diagram; charts labeled (fund-memo grade); reduced-motion safe.

### Task 3.1: Animated number cards

**Files:** `src/components/viz/stat-card.tsx` (`'use client'`), `src/content/engine-stats.ts`

**Interfaces:**
- Produces: `<StatCard value={number} label={string} suffix?={string} />` (count-up via Motion spring + `Intl.NumberFormat`), `ENGINE_STATS` data.

- [ ] **Step 1:** StatCard counts up on in-view; honesty-safe stats only (130 tickers · 1,863 trading days · 70+ news sources · 4 languages). Geist Mono numerals, copper accent.
- [ ] **Step 2:** Wire into Engine section row.
- [ ] **Step 3: Verify** counts animate once on scroll; instant when reduced-motion.
- [ ] **Step 4: Commit** `feat: animated engine stat cards`.

### Task 3.2: Recharts mini-viz + ChartEmbed

**Files:** `src/components/viz/conviction-chart.tsx`, sample data `src/content/sample-ranking.ts`, wire `ChartEmbed`

**Interfaces:**
- Consumes: shadcn chart (Recharts). Produces: a labeled bar/area chart (e.g. top-N conviction ranking or market breadth) with axes, units, a "illustrative / sample data" caption.

- [ ] **Step 1:** `pnpm dlx shadcn@latest add chart`; build a clean bar chart of sample conviction ranks (clearly labeled "illustrative sample" to stay honest — no implication of live signals). Scroll-reveal entrance.
- [ ] **Step 2:** Connect `ChartEmbed` MDX component to render named charts inside articles.
- [ ] **Step 3: Verify** chart renders crisp, labeled, responsive, SSR-safe.
- [ ] **Step 4: Commit** `feat: Recharts conviction chart + ChartEmbed wiring`.

### Task 3.3: Architecture mini-diagram (L0→L1→L2→L3) + optional ranking table

**Files:** `src/components/viz/architecture-diagram.tsx`, optional `src/components/viz/ranking-table.tsx` (TanStack)

- [ ] **Step 1:** Pure-CSS/SVG layered diagram L0→L1→L2→L3 with copper connectors + short labels (per spec §5 HLPP architecture_shape). Reveal on scroll.
- [ ] **Step 2 (optional):** `pnpm add @tanstack/react-table`; a small sortable sample ranking table for the Engine section.
- [ ] **Step 3: Verify** diagram readable mobile+desktop, both locales.
- [ ] **Step 4: Commit** `feat: HLPP architecture diagram (+ ranking table)`.

**⛔ PHASE 3 GATE:** Engine section is genuinely impressive + honest. Operator eyeball.

---

# PHASE 4 — Polish (motion / OG / perf / a11y)

**Phase gate:** Lighthouse ≥95 perf / ≥95 a11y on landing; OG cards render; reduced-motion fully honored; keyboard nav complete; **PC-first verified, NO overflow/clip in landscape OR portrait at 360/768/1280**; `impeccable` audit+critique pass + AI-slop test clean.

### Task 4.1: @vercel/og social cards

**Files:** `src/app/[locale]/opengraph-image.tsx`, per-article `opengraph-image.tsx`

- [ ] **Step 1:** Use Next built-in `ImageResponse` (or `@vercel/og`). Charcoal+copper OG with name + tagline; per-article OG with title.
- [ ] **Step 2: Verify** OG image route returns a PNG; preview in a card validator.
- [ ] **Step 3: Commit** `feat: OG social cards (charcoal+copper)`.

### Task 4.2: Motion polish + micro-interactions

- [ ] **Step 1:** Add tasteful: header shrink on scroll, magnetic/hover on CTAs + cards, section stagger, optional View Transitions for research nav. ALL ease-out, no bounce, reduced-motion guarded.
- [ ] **Step 2: Verify** feels cinematic but not busy; reduced-motion path clean.
- [ ] **Step 3: Commit** `style: motion polish + micro-interactions`.

### Task 4.3: Perf + a11y + responsive pass

- [ ] **Step 1:** `next/image` for all images (priority + blur on hero), audit client islands (keep RSC default), font preloading, remove unused CSS/JS.
- [ ] **Step 2:** a11y: landmarks, focus-visible (copper ring), alt text, color-contrast AA on charcoal, labeled charts, keyboard nav for toggle + nav.
- [ ] **Step 3: PC-first + orientation sweep.** Verify desktop ≥1280 is the polished canvas, then adapt down to 768 + 360. Test BOTH orientations at each: phone-landscape, tablet-portrait, tablet-landscape (Playwright `setViewportSize` + emulate orientation, or browser devtools). Fix any overflow/clip; add `@media (orientation: …)` reflow where needed (hero height on phone-landscape, pillar grid on tablet-portrait).
- [ ] **Step 4: Design-skill audit.** Run `impeccable` `audit` (a11y/perf/responsive) + `critique` (UX) on the landing; run its AI-slop test; fix P0/P1 findings. Confirm no absolute-ban violations.
- [ ] **Step 5: Verify** run Lighthouse (perf ≥95, a11y ≥95, best-practices, SEO) on `/en` and `/vi`.
- [ ] **Step 6: Commit** `perf: PC-first+orientation, a11y, impeccable audit, Lighthouse ≥95`.

**⛔ PHASE 4 GATE:** Lighthouse targets met both locales. Operator eyeball.

---

# PHASE 5 — Real content fill & ship

**Phase gate:** all copy final (EN+VI), 3-4 research featured, live demos linked/embedded, CV + headshot in, deployed to hgthinhng.vercel.app, operator sign-off.

### Task 5.1: Finalize all section copy (EN + VI)

- [ ] **Step 1:** With operator, finalize hero C wording, kicker, bridge, all 8 sections' copy in `messages/en.json` + `messages/vi.json`, drawn from MASTER_PROFILE + content inventory (spec §5). Enforce every honesty gate (Global Constraints).
- [ ] **Step 2: Verify** no placeholder/TODO strings remain; both locales complete; honesty review pass.
- [ ] **Step 3: Commit** `content: finalize bilingual section copy`.

### Task 5.2: Featured research + live-demo links/embeds

- [ ] **Step 1:** Operator picks 2-3 StoiX Read articles → add as `external` research entries linking to live stoix-read URLs. Confirm Ngư Ông case-study final.
- [ ] **Step 2:** Wire live-demo links: exam-ops.vercel.app (Teach + AI), stoix-read.vercel.app (Research), Telegram bot (Build). Ensure exam-ops Supabase is un-paused before linking (note the caveat).
- [ ] **Step 3:** IHK + microfin: add screen-capture stills or short clips (or a Vercel preview deploy w/ neutral demo data) — operator decision per spec §12.5.
- [ ] **Step 4: Verify** every external link opens; no broken/paused demo.
- [ ] **Step 5: Commit** `content: featured research + live-demo links`.

### Task 5.3: CV PDF + headshot + final About

- [ ] **Step 1:** Add `public/HT-CV.pdf` (operator's latest) + professional headshot (Photofeeler-selected) to `public/`. Wire Download CV button + About headshot.
- [ ] **Step 2: Verify** CV downloads, headshot crisp/optimized.
- [ ] **Step 3: Commit** `content: CV PDF + headshot + final About`.

### Task 5.4: Final QA + ship

- [ ] **Step 1:** Full bilingual click-through; Playwright smoke of all routes; final Lighthouse; broken-link check; honesty-gate final review.
- [ ] **Step 2:** Confirm Vercel domain = hgthinhng.vercel.app; production deploy green (`gh api .../commits/<sha>/status`).
- [ ] **Step 3:** Operator sign-off → (operator pushes/promotes to production — do not auto-promote).
- [ ] **Step 4: Commit + tag** `chore: v1 ship`.

**⛔ PHASE 5 GATE:** operator sign-off on the live site.

---

## Self-Review (plan vs spec)

- **Spec coverage:** §2 positioning→T1.4; §3 IA→T0.4/T2.3; §4 8 sections→T1.4-1.6 + P3/P5; §5 content inventory→P5 copy + per-section; §6 research strategy→T2.3/T2.4/T5.2; §7 design system→T0.3/T1.1/T1.2/T4.2; §8 stack→P0; §9 i18n→T0.4/T0.5; §10 honesty→Global Constraints + T5.1; §11 phases→all; §12 open decisions→T5.1-5.3. No uncovered requirement.
- **Honesty gates:** encoded as Global Constraints + enforced in T1.4, T2.4, T3.x captions, T5.1, T5.4.
- **Type consistency:** `<Reveal>`, `<Section>`, `<StatCard>`, `<ChartEmbed>`, `research` collection fields used consistently across tasks.
- **Known soft spots (intended, not placeholders):** exact next-intl wiring (T0.4 step 3) and Velite/MDX renderer (T2.1-2.2) say "follow/adapt stoix-read" rather than inlining all code — because the canonical, working reference exists in `/home/hgthinhng/stoix-read` and must be read at execution time (DRY against a live repo beats transcribing it stale).

## How to run a long session (fresh session)

1. Open a fresh Claude Code session in WSL at `/home/hgthinhng/portfolio-site` (after Task 0.1 creates it; for the very first run, start in `/home/hgthinhng`).
2. Paste: *"Execute the plan at `docs/2026-06-28-portfolio-site-PLAN.md` using superpowers:subagent-driven-development. Read `docs/2026-06-28-portfolio-site-design.md` first AND re-read the relevant spec section before each task. Reference `/home/hgthinhng/stoix-read` for Velite/next-intl/motion patterns. Use the `design-taste-frontend` skill (Design Read + dials) and `impeccable` (shape/craft/audit/critique/polish) on every UI task — honor its absolute bans + AI-slop test. Build PC-FIRST and test BOTH landscape & portrait at every breakpoint. Stop at each ⛔ PHASE GATE for my review."*
3. Work phase-by-phase; review at each ⛔ gate; do not push/promote to production without sign-off.
