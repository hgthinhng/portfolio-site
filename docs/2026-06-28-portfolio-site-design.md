# Design Spec — Portfolio Website "hgthinhng.vercel.app"

**Owner:** Nguyen Hung Thinh (HT) — investment analyst / quant-fintech builder
**Date:** 2026-06-28
**Status:** Design locked (brainstorming complete). Implementation plan: see `2026-06-28-portfolio-site-PLAN.md`.
**Repo target:** `C:\Users\PC\Desktop\HT-CV\portfolio-site\` (new Next.js repo, own git)

---

## 1. Goal & strategy

A bilingual (EN/VI), cinematic-yet-credible personal portfolio that positions HT for **buy-side (fund / asset-management) recruiters** in Vietnam and internationally. The "wow" must come from **substance presented tastefully** (typography, scroll choreography, animated data-viz) — NOT from particle/3D spectacle, which reads as unserious to conservative finance recruiters.

**Site role:** Hybrid — a credible, fast landing page + deep case-study pages behind it.

**Core insight:** HT's differentiator is *investor-builder* — most analysts only analyze; HT analyzes AND ships the systems behind the analysis. The site must show breadth (Analyze / Build / AI-Solutions / Teach) WITHOUT reading as "jack of all trades". Solution = **one sharp spine + 4 proof-pillars radiating from it**. "Highly adaptive" is SHOWN by the breadth, never TOLD.

---

## 2. Positioning

**Hero (bold, variant C):**
> EN: "Most analysts read the market. I built an engine that reads all of it — daily, across 130 Vietnamese stocks."
> VI: (bản dịch tương đương, giữ độ sắc)

**Kicker line (= the 4 pillars):**
> Investment analyst · Systems builder · AI-solutions consultant · Finance educator

**Bridge line:**
> "Fundamental analysis → self-built research platform → enterprise AI → graduate teaching. I move across all four — fast."

Do NOT cram "adaptive / teach / solutions" into the hero sentence — it kills the spike. Breadth lives in the kicker + pillars.

---

## 3. Information architecture

```
/[locale]                      Landing — single-scroll, 8 sections
/[locale]/research             Writing index (featured + link to StoiX Read publication)
/[locale]/research/[slug]      Case-study page (Velite MDX, reads like a research memo)
locale ∈ {en, vi}; auto-detect via next-intl middleware; sticky EN|VI toggle.
About + Contact are SECTIONS in the landing (no separate pages) to minimize friction.
```

---

## 4. Landing — 8 sections

1. **Hero** — hero C + kicker + bridge + CTAs (View research · Contact). Charcoal bg, copper glow + film grain, headline reveal (Motion). NO 3D.
2. **4 Pillars** — Analyze · Build · AI-Solutions · Teach. Each card: lucide icon + 1 line + 1 metric + anchor to its section. Hover micro-interaction.
3. **Selected Research** (Analyze) — 3-4 featured cards (Ngư Ông Đắc Lợi + 2-3 StoiX Read pieces). "See all writing →" links to `/research`; "Read my full publication →" links to `stoix-read.vercel.app`.
4. **The Engine** (Build) — HLPP + Crawler backbone + microfin. Animated number cards (130 tickers · 70+ sources · 4 languages · 1,863 trading days) + 1 Recharts mini-viz (e.g. conviction ranking or breadth). Honest status line. Architecture mini-diagram (L0→L1→L2→L3).
5. **AI Solutions** — AI news engine (multilingual sentiment/catalyst) · exam-ops RAG tutor · Opvia blueprint · anonymized enterprise AI-quoting (DN) · IHK (applied-AI). Live-demo links where available.
6. **Teach** — exam-ops platform (live link) · authored CFA L1 curriculum (376k words) · graduate finance / econometrics / CFA L1-3.
7. **About** — investor-builder story (short) + professional headshot + credentials (honesty gates).
8. **Contact** — email · LinkedIn · Download CV (PDF) · CTA.

---

## 5. Content inventory (truthful — from 7-agent survey 2026-06-28)

> Framing rule: describe by "what it does / what it produces", NO LoC/test counts, NO quant-jargon. Honesty gates are MANDATORY.

### Pillar: ANALYZE
- **Ngư Ông Đắc Lợi** — 10-page macro research report (Russia as third-party beneficiary of US-Israel-Iran war → oil → fiscal). 20+ primary sources. `SELLING MYSELF/03_Showcase/Research-NguOngDacLoi.pdf`. *The standalone written-thesis showcase.*
- **StoiX Read** — bilingual finance publication, 9 long-form articles on VN markets (valuation, macro, credit, flows, banking). LIVE at `stoix-read.vercel.app`. Reuse: feature 2-3, link the rest.
- **DEPP research arc** — 1,805-day neutralized backtest of VN microstructure factors; disciplined conclusion ("real information, |t| up to 12, but not net-positive long-only alpha at realistic cost → reframed as risk/state signal"). Proof of senior quant judgment (knowing when NOT to trust your model). Docs in `hlpp-pipelines/docs/research/2026-06-25-DEPP-*`.
- Single-stock fundamental reads on-demand via HLPP (DCF, peer multiples, health/quality scores, conviction rank). Honest: systematized in engine, not one-off written memos.

### Pillar: BUILD
- **HLPP** — automated VN-equity research platform. 130 tickers, ~85% market cap, daily cron pipeline (1,863 trading days 2019-2026), factor scores + `enriched_conviction` rank, paper portfolio (1B VND notional, paper only). Bank-specific stressed-credit analysis is the differentiator (forbearance-adjusted Group-2+NPL, pre-provision buffer, real-estate contagion, capital adequacy — no vendor packages this for VN banks). L0→L1→L2→L3 layering. Live Telegram bot `@opviatelegram_bot`. **Status: built & validating, NO live capital, paper-trade tracking; some lanes known-degraded.**
- **Super Mega Financial Crawlers** (data backbone) — 10 collector engines; news (HOSE/VNDirect/CafeF/GDELT/NewsAPI/RSS×37/scrape×22/Playwright/vnstock); 4 languages (vi/en/ru/fr); AI news engine (intake classification → relevance/sector/sentiment, morning brief 5 modes, catalyst classifier, per-ticker LLM sentiment); broker-PDF extraction (target price/rating/thesis, 11 brokers); macro series (GSO/SBV/IMF/WB/FRED + YoY/QoQ + anomaly). Cost-efficient: free/exchange-native sources replace expensive terminals. **Status: live in hlpp-pipelines mono-repo (satellite repos archived); production L2 sentiment is lexicon-based, LLM tier is enrichment; some sources culled/degraded.** Showable: 2 self-contained HTML dashboards.
- **microfin** — agent-based market-behavior simulation. Plain-language scenario → Monte-Carlo crowd (24+ agents, 18 cohorts: retail/margin/shadow-margin/KOL/foreign/đội-lái/funds) through a deterministic HoseReferee (±7% bands, T+2.5, forced kho unwind, ATC, foreign room) → distribution over 8 named outcome modes (panic_cascade, liquidity_freeze, kho_contagion, rumor_spiral, insider_defend_abandon, fomo_meltup, fragmented, orderly_digest) + contagion DAG. Web console (FastAPI+SPA, local-only). **Status: engine built & gate-calibrated (Gate-0 REGROUND, partial pass, needs human signoff); NOT yet backtested against realized returns; outputs are scenario hypotheses, NOT probabilities or trading signals.**
- **HTAP ecosystem** (depth/credibility, not headline) — multi-layer VN market data platform (7 sources → 15 transforms → FastAPI), Mission Control UI, 75-command advisory Telegram bot. Earlier iteration; frame as systems-engineering depth.

### Pillar: AI-SOLUTIONS
- AI news engine (above) — multilingual LLM enrichment.
- **exam-ops RAG tutor** — hybrid RRF retrieval (vector+FTS) over 7,726 chunks, LLM reranker, multi-role tutor (lecturer/examiner/feynman/socratic/meta_coach/navigator), measured RAGAS gates (ctx precision +35%, recall +48%), xlingual hardening (VN query→EN chunk, glossary expansion 0.483→0.621 recall). Applied-AI engineering proof.
- **Opvia blueprint** — consulting: refactored a client's LLM research system into a 15-module skill architecture + 6 workflows. Client anonymized (advisory, not employment). Showable: `Kien_Truc_Da_Truc_Opvia.html`.
- **Enterprise AI-quoting (codename DN)** — CONFIDENTIAL. POC-proven AI FF&E quoting for a hospitality enterprise; pre-revenue, awaiting proposal sign-off. Show ONLY as "anonymized enterprise AI-quoting consulting (POC stage)". NO client name, industry specifics, or amounts.
- **IHK (Interactive Harnessing Knowledge)** — local-first semantic knowledge board: paste URL → AI metadata extraction + embeddings (OpenAI/Voyage/Jina) → constellation/EgoGraph viz (UMAP) → Blend AI synthesis → multi-provider routing, all on IndexedDB. **Reframe as applied-AI product engineering; do NOT foreground "personal second brain". Replace personal data with neutral demo nodes before any public demo.** Not deployed (local Vite).

### Pillar: TEACH
- **exam-ops / StoiX Learning** — production AI exam-prep platform, LIVE `exam-ops.vercel.app`. React 18 + Vite + Supabase (Edge Functions, 40+ tables) + Vercel + OpenAI. Adaptive QBank (7,612 CFA L1 questions, SM-2 spaced repetition, XP/levels/games), multi-role RAG tutor, AI pathway advisor, PayOS+Stripe checkout. Tracks: CFA L1 (full) / L2 / FRM P1 live; CFA L3, FRM P2, CMA, CMT, CAIA, CIPM roadmap. **Status: live (Supabase free-tier may auto-pause); CFA L1 only fully built; learner traction unknown.**
- Authored CFA L1 curriculum (376k words across 10 topics) feeding the RAG — blurs expert/engineer line.
- Graduate finance teaching (independent/contract): financial econometrics (GARCH, cointegration), derivatives (SGX SIP syllabus), CFA prep L1-3. **"Passed CFA Levels I-III" — NOT charterholder.**

### Other context (do not foreground unless relevant)
- Family cross-border trading (commercial negotiation experience).
- FiinGroup partnership pitch deck (outbound proposal, not a confirmed deal).
- Identity: solo founder Hung Thinh Nguyen — NEVER invent co-founders.

---

## 6. Research / Writing strategy

- Portfolio does NOT re-author StoiX Read's 9 articles. Instead: **feature 2-3 strongest** as case-study cards on the landing + the `/research` index, each linking to the live StoiX Read article; add a prominent "Read my full publication →" CTA to `stoix-read.vercel.app`.
- **Ngư Ông Đắc Lợi** gets a proper case-study page (`/research/ngu-ong-dac-loi`) — embed/preview the PDF + a written thesis summary in both languages.
- Total featured research: 3-4 items (curated, not all). Each reads as a memo: Thesis → Evidence → Risk → Conclusion.
- Velite MDX, bilingual (`en.mdx` + `vi.mdx` per article), per-locale collection.

---

## 7. Design system — Charcoal + Copper

- **Palette:** warm charcoal base (≈ warm zinc-950), raised surface, single accent **copper #B87333**, off-white text + muted. Exactly ONE accent.
- **Type:** Geist Sans (display/UI) · Geist Mono (numbers/data) · Source Serif 4 (long-form research body). next/font self-hosted, CLS=0.
- **Motion:** Motion (`motion/react`) + Lenis smooth scroll. ease-out, NO bounce. Reveal-on-scroll + stagger, purposeful only. Respect `prefers-reduced-motion`.
- **i18n toggle:** sticky header, segmented **EN | VI**, copper active state, instant client-side swap (no full reload), persists via cookie.
- Generous whitespace; typography is the luxury signal. Charts read like fund memos (labels, units, sources, dates).

---

## 8. Tech stack (LOCKED — 4-LLM convergence 4/4 + reuse of stoix-read patterns)

```
Next.js (App Router, RSC, React 19) + TypeScript
Tailwind CSS v4 + shadcn/ui (Radix)
Motion (motion/react) + Lenis
Recharts (shadcn charts) + TanStack Table        ← research-engine viz / rankings
Velite (type-safe MDX, bilingual)                ← research case-studies
next-intl (en/vi, auto-detect, hot-swap toggle)
Geist Sans/Mono + Source Serif 4 · lucide-react · next/image + @vercel/og
Deploy: Vercel free → hgthinhng.vercel.app
```

**Reuse:** `stoix-read` already runs Next.js 16 + Velite + next-intl + Tailwind + a 3-theme design system + scroll-reveal motion. Lift its patterns (Velite config, next-intl routing, MDX components, motion utilities, OG/SEO setup) rather than building from scratch. Do NOT copy its "Ink & Paper" visual identity — portfolio uses Charcoal + Copper.

**NO-3D rule:** skip 3D in v1. Wow budget → typography + scroll choreography + animated data-viz. One subtle shader/Rive accent is a v2-only option.

---

## 9. i18n architecture

- `app/[locale]/...` routing; `next-intl` middleware with `localeDetection: true` (Accept-Language → vi for VN, en otherwise).
- UI strings: `messages/en.json` + `messages/vi.json`.
- MDX: per-article `en.mdx` + `vi.mdx`; missing translation → fallback + "EN only" badge (decision: full bilingual including research, so aim for both).
- SEO: `hreflang` alternates, per-locale OG.
- Toggle component: prominent, sticky, instant swap, cookie-persisted.

---

## 10. Honesty & privacy guardrails (CRITICAL — enforce on every section)

- Public site, real name (intended — recruiters will find it). But NEVER leak: client names, sensitive data.
- **HLPP/microfin/DEPP:** "built & validating" / "paper" — NEVER "managing live capital". microfin = "scenario hypotheses, not probabilities/signals; not yet backtested".
- **CFA:** "Passed Levels I-III" — NEVER "charterholder".
- **Teaching:** independent/contract — not tenured faculty.
- **Clients:** anonymized. Enterprise quoting (DN) = confidential, show only as "anonymized enterprise AI-quoting consulting (POC stage)".
- **IHK:** reframe as applied-AI engineering; scrub personal knowledge data before any demo.
- **Identity:** solo founder; never invent co-founders.
- **Live-demo caveat:** exam-ops Supabase free-tier may auto-pause; ensure restore before sharing the link, or note it.

---

## 11. Build phases (overview — detail in PLAN doc)

- **P0** Scaffold + deploy skeleton to Vercel (confirm hgthinhng.vercel.app live) + charcoal-copper tokens + fonts + Lenis + next-intl baseline.
- **P1** Design system + 8 landing sections (static, placeholder copy) + i18n toggle.
- **P2** Velite + bilingual content layer + `/research` index + case-study template + migrate Ngư Ông Đắc Lợi.
- **P3** The Engine viz (Recharts + animated number cards + architecture mini-diagram) + TanStack ranking table.
- **P4** Motion polish + @vercel/og cards + Lighthouse perf + WCAG a11y + reduced-motion + responsive.
- **P5** Real bilingual content fill (hero/pillars/all sections + 3-4 research) + live-demo links/embeds (exam-ops, stoix-read, Telegram) + IHK/microfin screen-captures or preview deploys + CV PDF + contact + ship.

---

## 12. Open decisions for operator (confirm during/after P0)

1. Hero copy C final wording (EN + VI) — draft from this spec, operator approves.
2. Custom domain later? (v1 = hgthinhng.vercel.app free.)
3. Which 3-4 research pieces to feature (Ngư Ông + which StoiX Read articles).
4. Professional headshot + final CV PDF to include.
5. microfin / IHK: screen-capture vs Vercel preview-deploy for the demo (P5).
