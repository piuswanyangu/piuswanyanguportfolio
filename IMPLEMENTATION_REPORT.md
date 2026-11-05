# Implementation Report

A running record of every change made during the performance, SEO and legal
review of the Afrinex Solutions website. Each stage is added as it is
completed. Measurements and teaching notes for performance work are in
`PERFORMANCE_AUDIT.md`.

---

## Stage 1: Technical audit (5 November 2026)

No files changed. Findings that drive the later stages:

- **Stack:** Next.js App Router, React 19, Tailwind CSS 4, TypeScript. Every
  page is prerendered static HTML. There is no database, API or third-party
  script. Production runs in Docker on a Spaceship VPS behind Cloudflare.
- **Security:** Next.js 16.3.4 had critical advisories, including remote code
  execution in the public image optimizer.
- **Speed:** HTML is not cached at Cloudflare, so every page request reaches
  the VPS. LCP and CLS are within target. Mobile blocking time is the weakest
  lab metric.
- **SEO:** solid foundations, including canonicals, sitemap, unique titles,
  one H1 per page and structured data. Gaps: Search Console not verified,
  short service descriptions, generic titles, an empty blog page open to
  Google, and no Service structured data.
- **Legal:** the Terms of Service and Privacy Policy are drafts with visible
  "TODO: review" markers.

---

## Stage 2: Performance and security (5 November 2026)

### Change 1: Next.js security upgrade

| | |
| --- | --- |
| Files | `package.json`, `package-lock.json` |
| What changed | `next` 16.3.4 to 16.4.5, `eslint-config-next` 16.3.4 to 16.4.5, sharp 0.35.4 to 0.35.5 through Next.js, and non-breaking `npm audit fix` updates to development tools |
| Why | Fixes 3 critical and several high-severity advisories. Production packages now report 0 vulnerabilities. |
| Decision | Did not run `npm audit fix --force`. It would downgrade `eslint-config-next` to version 15, which does not match Next.js 16. The 8 remaining moderate advisories are confined to ESLint tooling on the developer machine. |
| Risk | Minor version upgrade. Mitigated by typecheck, lint, all 41 Playwright tests, and a clean `npm ci` plus standalone build and smoke test matching the Docker image. |
| Performance effect | None measurable. Lighthouse medians before and after are within run-to-run noise. |

### Change 2: Scroll-reveal layout thrashing

| | |
| --- | --- |
| File | `src/components/layout/scroll-reveal.tsx` |
| What changed | `register()` now reads all element positions first, then adds classes, instead of alternating a read and a write per element. |
| Why | Each read after a write forced the browser to recalculate styles for the whole page. The home page has 26 animated elements. |
| Measured effect | Function time on the home page at 4x CPU slowdown fell from 18.2 to 53.8 ms down to 1.0 to 2.4 ms. |
| Visible behaviour | Unchanged. The same elements fade in the same way. |

### Verification performed

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test:e2e`, Playwright | 41 of 41 pass |
| Production build, Next.js 16.4.5 | 50 of 50 pages generated |
| Clean `npm ci` + standalone build + `server.js` | Home, services, contact, sitemap, OG image and image optimizer return 200. Unknown URLs return 404. |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Lighthouse, 3 to 5 runs per page and device | See `PERFORMANCE_AUDIT.md` |

### Deliberately not changed

- **React hydration cost on large pages.** Reducing it would need structural
  changes to the home page. The gain is not proven to be worth the design and
  stability risk. Revisit if real visitor data shows slow interactions.
- **Cloudflare HTML caching.** Prepared as a proposal in
  `PERFORMANCE_AUDIT.md` section 5. Not applied, pending your approval.

### To deploy Stage 2

Commit and push from your PC, then run on the VPS:

```bash
cd ~/afrinex && bash scripts/update.sh
```

The script will report that `package.json` and `package-lock.json` changed,
and Docker will reinstall dependencies during the build.

---

## Build fix, browser QA, and Stages 3 and 4: SEO (5 November 2026)

### Change 3: `npm run build` failed without an environment variable

| | |
| --- | --- |
| Symptom | `npm run build` stopped with "NEXT_PUBLIC_SITE_URL is not set", so `npm start` had no build to serve and the site did not open in the browser. |
| Root cause | `src/lib/site-config.ts` required the variable for every production build. Docker passes it. A plain build on a PC did not. |
| Fix | Production builds now default to `productionOrigin = "https://afrinexsolutions.co.ke"`. `NEXT_PUBLIC_SITE_URL` remains an optional, validated override. The Vercel fallback was removed so every copy of the site names the real domain as canonical. |
| Files | `src/lib/site-config.ts`, `playwright.config.ts`, `.env.example`, `README.md` |
| Verified | `npm run build` with no `.env` file. Canonical, sitemap and robots output use the real domain. |

### Change 4: content could stay invisible after a fast scroll

| | |
| --- | --- |
| Symptom | Found by an automated browser check: jumping straight to the bottom of the home page (End key or a fast fling) left 14 sections invisible until the visitor scrolled back up. |
| Root cause | `IntersectionObserver` only reports elements that are inside the watched area when it checks. An element carried from below the viewport to above it between two checks never "intersects", so it never fades in. |
| Fix | `rootMargin` top changed from `0px` to `100000px`. Everything above the viewport now counts as seen and is revealed. Elements below the fold still start hidden and fade in as before. |
| File | `src/components/layout/scroll-reveal.tsx` |
| Verified | Jump-to-bottom test: 0 hidden elements on `/`, `/services`, `/work` and `/about`. All 26 below-fold home sections still start hidden and fade in. |

### Stages 3 and 4: technical and on-page SEO

Full explanations are in `SEO_AUDIT.md`. Summary:

| Change | Files |
| --- | --- |
| Search titles and 125 to 157 character descriptions for all 13 service pages | `src/data/service-seo.ts` (new), `src/app/services/[slug]/page.tsx` |
| Service JSON-LD on service pages | `src/app/services/[slug]/page.tsx` |
| Keyword-relevant titles and descriptions for home, About, Services, Work and Contact | `src/app/layout.tsx`, page files |
| `fullTitle` option in `createPageMetadata()` | `src/lib/site-config.ts` |
| PNG Organization logo (`/apple-icon`, 180 x 180) | `src/app/layout.tsx` |
| `Host:` removed from robots.txt | `src/app/robots.ts` |
| Empty `/blog` set to `noindex, follow` until an article is published | `src/app/blog/page.tsx` |

### Verification for this round

| Check | Result |
| --- | --- |
| `npm run build` with no environment variables | Pass, 50 of 50 pages |
| Typecheck, lint | Pass |
| Playwright suite | 41 of 41 pass |
| Browser crawl of all 22 sitemap pages plus legal pages and blog, on mobile (390 px) and desktop (1440 px) | All 200, one H1 each, no horizontal overflow, no console errors, no hidden content. The 404 test page correctly returns 404. |
| Interaction check | Mobile menu navigation, desktop header navigation, theme switch and persistence across reload, contact-form `?service=` prefill, and WhatsApp handoff with the prepared message: all work. 0 runtime errors. |
| SEO output check | No duplicate titles or descriptions. All JSON-LD parses. Canonicals use the real domain. |
| Clean `npm ci` + standalone build + `server.js`, with no environment variables | Pages, sitemap, robots, logo, OG image and image optimizer return 200. Unknown URL returns 404. |

### Needs your action

- Search Console verification and sitemap submission: `GOOGLE_SEARCH_SETUP.md`.
- Delete or redeploy the old Vercel copy at `piuswanyanguportfolio.vercel.app`.

## Pending stages

- **Legal review, in progress:** structure approved. Proposed content is
  prepared in `docs/legal/TERMS_OF_SERVICE_DRAFT.md` and
  `docs/legal/PRIVACY_POLICY_DRAFT.md`. Decisions, verified data flows and
  the advocate checklist are in `LEGAL_DOCUMENT_REVIEW.md`. The live legal
  pages are unchanged, with the draft banner and `noindex` kept.
- **Cloudflare HTML caching:** prepared in `PERFORMANCE_AUDIT.md` section 5.
  Awaiting your separate approval.
- **Stage 6:** `MAINTENANCE_GUIDE.md`, including the SEO and legal
  maintenance checklists.
