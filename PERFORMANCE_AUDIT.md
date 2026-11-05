# Performance Audit

Status: Stage 2 complete (5 November 2026). This file records what was
measured, what changed, and what is proposed but not yet applied.

All numbers below were measured, unless a row says otherwise. Nothing is
estimated.

---

## 1. How performance was measured

**Tool:** Lighthouse 13.6.0, run from Node.js against a local production
build (`next build` + `next start`). The build used the real
`NEXT_PUBLIC_SITE_URL`, so the HTML matches production.

**Pages:** `/`, `/services`, `/about`, `/services/kra-returns-assistance`.

**Runs:** 3 per page per device for the before and after builds, and 5 per
page for the scroll-reveal check. The tables show the **median** run. A
single Lighthouse run can swing by more than 10 points, so one run proves
nothing.

**Why local and not the live site:** the live site adds Cloudflare and VPS
network time, which changes from minute to minute. A local build isolates
the code, so "before" and "after" differ only in the change being tested.

**Important caveat about this PC:** Lighthouse reported a CPU benchmark index
of about 620 on this machine. A typical modern laptop scores 1,000 to 2,000.
Lighthouse simulates a slow phone by multiplying CPU work, so on a slow PC
the **Total Blocking Time (TBT) is exaggerated**. Use TBT here to compare
builds with each other, not as the real figure your visitors experience.

### What the metrics mean

| Metric | What it measures | Good target |
| --- | --- | --- |
| **LCP**, Largest Contentful Paint | When the biggest visible element (the hero heading or image) finishes drawing. "When does the page look loaded?" | 2.5 s or less |
| **CLS**, Cumulative Layout Shift | How much content jumps around while loading, for example text pushed down by a late image. | 0.1 or less |
| **INP**, Interaction to Next Paint | How long the page takes to respond visibly after a tap or click. Measured from real visitors only. | 200 ms or less |
| **TBT**, Total Blocking Time | Lab stand-in for INP: time the main thread was too busy to respond to input during load. | 200 ms or less |
| **FCP**, First Contentful Paint | When the first text or image appears. | 1.8 s or less |

INP cannot be measured in a lab. It needs real visitor data, which Google
collects in the Chrome User Experience Report once a site has enough traffic.
This site is too new, so **INP is not available**. TBT is the closest lab
signal.

---

## 2. Results

### Live site, single runs (Stage 1 baseline, 5 November 2026)

| Page | Device | Perf | A11y | Best Pr. | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Mobile | 58 | 100 | 100 | 100 | 2.3 s | 0 | 4,080 ms |
| Home | Desktop | 42 | 100 | 100 | 100 | 3.1 s | 0.032 | 1,980 ms |
| Services | Mobile | 55 | 100 | 100 | 92 | 2.9 s | 0 | 3,970 ms |
| About | Mobile | 44 | 100 | 100 | 100 | 4.2 s | 0 | 7,970 ms |

These were single runs on the slow PC over the internet, so treat them as
rough. The Services SEO score of 92 came from a robots.txt fetch timeout
during that run, not a real problem.

### Local build: before (Next.js 16.3.4) and after (Next.js 16.4.5)

Medians of 3 runs.

| Page | Device | Perf before | Perf after | LCP before | LCP after | TBT before | TBT after | CLS after |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 70 | 68 | 1.63 s | 1.42 s | 2,415 ms | 2,647 ms | 0 |
| `/services` | Mobile | 75 | 73 | 1.17 s | 1.13 s | 1,293 ms | 1,885 ms | 0 |
| `/about` | Mobile | 78 | 77 | 1.06 s | 1.02 s | 954 ms | 1,098 ms | 0 |
| `/services/kra-returns-assistance` | Mobile | 79 | 77 | 1.06 s | 1.05 s | 953 ms | 1,043 ms | 0 |
| `/` | Desktop | 95 | 87 | 0.82 s | 0.85 s | 157 ms | 277 ms | 0 |
| `/services` | Desktop | 90 | 90 | 0.32 s | 0.33 s | 256 ms | 257 ms | 0 |
| `/about` | Desktop | 99 | 98 | 0.27 s | 0.27 s | 115 ms | 119 ms | 0 |
| `/services/kra-returns-assistance` | Desktop | 93 | 93 | 0.27 s | 0.29 s | 215 ms | 207 ms | 0 |

Accessibility, Best Practices and SEO scored **100 on every run** before and
after.

**Reading this table honestly:** the upgrade did not change performance. The
individual runs overlap heavily. For example, desktop home scored 97, 83 and
95 before and 86, 87 and 93 after. That is expected, because the upgrade is
a security release, not a performance release.

### Local build with the scroll-reveal fix

Medians of 5 mobile runs.

| Page | Perf | Individual runs | LCP | TBT |
| --- | --- | --- | --- | --- |
| `/` | 71 | 57 / 69 / 71 / 72 / 75 | 1.61 s | 1,979 ms |
| `/services` | 74 | 75 / 73 / 72 / 74 / 74 | 1.20 s | 1,603 ms |
| `/about` | 76 | 76 / 79 / 74 / 78 / 75 | 1.03 s | 1,196 ms |
| `/services/kra-returns-assistance` | 77 | 77 / 78 / 78 / 75 / 77 | 1.03 s | 1,107 ms |

Lighthouse cannot separate a change this small from run-to-run noise, so
the function was also timed directly (see section 3.2).

### Measurements after the SEO changes: discarded

Two further rounds of mobile Lighthouse runs on the final build were
discarded. Lighthouse's CPU benchmark on this PC dropped from about 600 in
the earlier rounds to between 91 and 421, because other applications (VS
Code and a browser) were busy. Scores from different CPU conditions cannot
be compared. Page weight in those runs was identical to the earlier rounds:
23 requests, 295 KiB and 157 KiB of JavaScript on the home page. The SEO
changes added no downloaded code.

To get a trustworthy figure after deploying, run
<https://pagespeed.web.dev/> on the live site. It runs on Google's servers.

### Page weight (unchanged by Stage 2)

| Page | Requests | Total transferred | JavaScript transferred |
| --- | --- | --- | --- |
| `/` mobile | 23 | 295 KiB | 157 KiB |
| `/services` mobile | 20 | 259 KiB | 157 KiB |
| `/about` mobile | 18 | 262 KiB | 154 KiB |

---

## 3. Changes made in Stage 2

### 3.1 Next.js security upgrade

**CONCEPT:** Keeping the framework patched. Next.js is not just a build
tool. On this site it also runs as a live server on your VPS, which answers
every request, including the public image optimizer at `/_next/image`.

**PROBLEM:** Next.js 16.3.4 had 11 published security advisories. Three were
critical "remote code execution" flaws, where an attacker can run their own
code on your server. One of them is in the image optimizer, which your site
exposes on the internet. sharp, the image library Next.js uses, also had a
high-severity advisory.

**SOLUTION:** Upgraded `next` and `eslint-config-next` from 16.3.4 to 16.4.5,
the latest stable release, which pulls in sharp 0.35.5. Ran `npm audit fix`
without `--force` to update vulnerable tools such as `zod`, `brace-expansion`
and `source-map-js` within their allowed version ranges.

**TECHNICAL EXPLANATION:** 16.3.4 to 16.4.5 is a minor version change, which
under semantic versioning should not break anything. `npm audit fix` only
moves packages within the ranges in `package.json`. `--force` was not used,
because it would have "fixed" the ESLint advisories by downgrading
`eslint-config-next` to version 15, which does not match Next.js 16.

**FILES MODIFIED:** `package.json`, `package-lock.json`.

**Result:**

| Check | Before | After |
| --- | --- | --- |
| Vulnerabilities, all packages | 13 (1 critical, 4 high, 8 moderate) | 8 moderate |
| Vulnerabilities, production packages only | Critical and high present | **0** |
| Typecheck, lint | Pass | Pass |
| Playwright tests | Not run | **41 of 41 pass** |
| Docker-style build: `npm ci` + standalone build + `server.js` | Worked | Works: pages, sitemap, OG image, image optimizer and 404 all respond correctly |

The 8 remaining moderate advisories all come from `minimatch` inside the
ESLint tooling. ESLint only runs on your PC when you lint. It is not in the
Docker image and never handles visitor requests. Revisit them when a newer
`eslint-config-next` fixes the chain.

**VERIFICATION:**

```bash
npm ls next sharp          # next@16.4.5, sharp@0.35.5
npm audit --omit=dev       # found 0 vulnerabilities
npm audit                  # 8 moderate, all under eslint-config-next
npm run test:e2e           # 41 passed
```

**LESSON:** A dependency you serve to the internet is part of your attack
surface, even on a "simple static site". Check `npm audit --omit=dev` before
every release, because that shows only what reaches production. Never run
`npm audit fix --force` blindly. Read what it would change first.

### 3.2 Scroll-reveal layout thrashing fix

**CONCEPT:** Layout thrashing. To answer a question like "where is this
element?" (`getBoundingClientRect`), the browser must first finish any
pending style and layout work. Changing a class creates pending work. If
code alternates read, write, read, write, the browser recalculates the whole
page's styles once per element. Doing all the reads first and then all the
writes needs only one recalculation.

**PROBLEM:** `ScrollReveal` runs on every page load and after any change to
the page content. For each element marked `data-reveal`, it read the
element's position and then added the `reveal-pending` class. The home page
has 26 such elements, so the browser recalculated styles up to 26 times in a
row, on the main thread, while the page was starting up.

**SOLUTION:** Split the loop into two passes. The first pass reads every
element's position and keeps those below the fold. The second pass adds the
class and starts observing them.

**TECHNICAL EXPLANATION:** Reading positions while nothing has changed
reuses one layout calculation. All class changes are then batched, and the
browser applies them in a single style pass before the next frame. Which
elements animate, and how they look, is identical to before.

**FILES MODIFIED:** `src/components/layout/scroll-reveal.tsx`.

**Measured result:** the function was timed in Chromium on the home page
with a 412 x 823 phone viewport and 4x CPU slowdown. Each figure is the
median of 15 timings.

| Version | First measurement | Second measurement |
| --- | --- | --- |
| Before: read and write interleaved | 18.2 ms | 53.8 ms |
| After: reads, then writes | 1.0 ms | 2.4 ms |

That saves roughly 15 to 50 ms of main-thread work on a slow phone, each time
the function runs. It is a real but small part of the home page's total
blocking time.

**VERIFICATION:** in Chrome DevTools, open **Performance**, set CPU to
**4x slowdown**, record a reload of the home page, and look for purple
"Recalculate Style" and "Layout" blocks. Before the fix, these appear as a
long run of small repeated blocks under the `register` function. After the
fix, there is a single block.

**LESSON:** Lighthouse scores are too noisy to judge small fixes. When a
change targets one function, time that function directly. And when writing
DOM code: read everything, then write everything.

---

## 4. What still limits mobile performance

The home page still has about 2 seconds of simulated blocking time on mobile
on this PC. The measurements point to React itself, not to any single bad
component:

- **The page data that React needs to make the page interactive.** The home
  page HTML is 184 KB before compression. 104 KB of it is the React Server
  Components payload, a serialized copy of the page that React reads to
  attach event handlers. This step is called hydration. Every App Router
  page has this payload, and it grows with the size of the page.
- **No single section is to blame.** The largest home section, the services
  grid, is 16 KB of markup with 26 inline SVG icons. The rest are 2 to 12 KB
  each.
- **JavaScript is already lean** for a Next.js App Router site: 157 KiB
  compressed, most of it the React and Next.js runtime. Only seven small
  components run in the browser.

Making a real dent would mean structural changes, such as moving below-fold
sections behind lazy loading or reducing how many icons are rendered. These
carry design and stability risk for a modest gain. They are not recommended
until **real visitor data** shows a problem. Start collecting that data
through Search Console's Core Web Vitals report once the site has traffic.

LCP and CLS are already well within target on every page, mobile and
desktop.

---

## 5. Proposed: Cloudflare HTML caching (NOT applied)

This section is a proposal for your approval. No Cloudflare setting has been
changed.

### Why

Cloudflare already caches the site's JavaScript, CSS and fonts. The live
response showed `cf-cache-status: HIT` for `/_next/static/` files. But every
HTML page returns `cf-cache-status: DYNAMIC`, meaning each visit travels from
Cloudflare's Nairobi edge to your VPS and back. Time to first byte from
Nairobi was measured at **0.43 s to 2.1 s**. Pages served from the edge
usually arrive in tens of milliseconds.

### Why this site is safe to cache

- Every page is prerendered static HTML. There are no logins, no cookies, no
  personalised content and no forms that post to the server. The contact form
  opens WhatsApp or email in the browser.
- Next.js marks every page `Cache-Control: s-maxage=31536000`, which tells
  shared caches that the page is static.
- Next.js navigation requests use a special `_rsc=` query parameter, so they
  get a different cache entry from the normal HTML. Cloudflare's default
  cache key includes the full query string, which keeps the two apart. Next.js
  documents this requirement in its CDN caching guide.

### Exact configuration

Cloudflare dashboard > `afrinexsolutions.co.ke` > **Caching** > **Cache
Rules** > **Create rule**.

1. **Rule name:** `Cache static HTML`
2. **If incoming requests match:** choose **Custom filter expression** >
   **Edit expression**, and paste:

   ```
   (http.host eq "afrinexsolutions.co.ke" and http.request.method eq "GET" and not starts_with(http.request.uri.path, "/_next/"))
   ```

   This covers only page requests on the main domain. `/_next/` files are
   excluded because Cloudflare already caches static assets correctly, and
   the image optimizer sets its own headers.
3. **Then:**
   - **Cache eligibility:** Eligible for cache
   - **Edge TTL:** Ignore cache-control header and use this TTL > **2 hours**.
     2 hours is the shortest value Cloudflare's free plan allows. Paid plans
     allow 1 hour or less.
   - **Edge TTL > Status code TTL:** add a range **400 to 599** with
     **No cache**, so error pages and 404s are never stored.
   - **Browser TTL:** Respect origin. Next.js sends no browser max-age for
     HTML, so browsers always check for a fresh copy.
   - **Cache key:** leave the default. Do **not** enable "Ignore query
     string". That would break site navigation.
4. **Deploy.**

Why 2 hours instead of Next.js's one year: with a long TTL, an update would
stay invisible until you purge the cache. With 2 hours, the worst case is
that visitors see the old version for up to two hours after an update, even
if you forget to purge.

### Cache invalidation after an update

After `bash scripts/update.sh` finishes on the VPS, either wait up to two
hours, or clear the cache immediately:

Cloudflare dashboard > **Caching** > **Configuration** > **Purge Cache** >
**Purge Everything**.

Purging everything is safe for this site. It only means the next few
visitors fetch from the VPS again while the cache refills.

### How to verify it works

```bash
curl -sI https://afrinexsolutions.co.ke/about | grep -i "cf-cache-status\|age"
curl -sI https://afrinexsolutions.co.ke/about | grep -i "cf-cache-status\|age"
```

The first request shows `MISS`, and the second shows `HIT` with an `age`
header. Then click around the site in a browser. Navigation must still be
instant, and every page must show its own content.

### Rollback

Cloudflare dashboard > **Caching** > **Cache Rules** > toggle
`Cache static HTML` **off**, or delete it. Then **Purge Everything**. The site
immediately returns to its current behaviour.

### Deployment implications

- Each update needs a purge if you want it visible right away.
- The proxy toggle during certificate renewal (see `DEPLOYMENT.md`) bypasses
  Cloudflare entirely, so it is unaffected.
- If the site ever adds logins, user-specific pages or server-side forms,
  this rule must be narrowed before those features go live.

---

## 6. PageSpeed Insights API key (optional, later)

PageSpeed Insights runs Lighthouse on Google's servers, which have
consistent, fast CPUs and test from a stable network. That removes the
"slow PC" caveat above. It also shows real-visitor Core Web Vitals, including
INP, once Google has collected enough traffic data for the site. Without a
key, Google's shared free quota is often exhausted, which is what happened
during the Stage 1 audit.

Simplest option, no key needed: open <https://pagespeed.web.dev/>, paste
`https://afrinexsolutions.co.ke`, and run it in the browser.

For scripted runs:

1. Open <https://console.cloud.google.com/> with your Google account.
2. Create a project, for example `afrinex-website`.
3. **APIs & Services > Library**, search for **PageSpeed Insights API**, and
   click **Enable**. It is free.
4. **APIs & Services > Credentials > Create credentials > API key**.
5. Click the new key > **API restrictions** > **Restrict key** > select only
   **PageSpeed Insights API**. Save.
6. Keep the key out of the repository. Use it from your terminal:

   ```powershell
   $env:PSI_KEY = "paste-key-here"
   curl.exe "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://afrinexsolutions.co.ke/&strategy=mobile&key=$env:PSI_KEY"
   ```
