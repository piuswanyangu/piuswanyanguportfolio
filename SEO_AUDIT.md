# SEO Audit

Status: technical SEO (Stage 3) and on-page SEO (Stage 4) implemented on
5 November 2026. Google Search Console setup needs your action. See
`GOOGLE_SEARCH_SETUP.md`.

---

## 1. Findings

### What was already good

Checked on the live site and the local build:

- All 22 sitemap URLs return 200. Unknown URLs return a real 404.
- Exactly one `<h1>` per page, and no images without `alt` text.
- Canonical link on every page, pointing to the HTTPS apex domain.
- `www` redirects to the apex domain, and HTTP redirects to HTTPS.
- XML sitemap and robots.txt in place.
- Organization, WebSite and BreadcrumbList structured data.
- Unique titles and descriptions on every page.
- Lighthouse SEO and Accessibility scored 100.
- Legal pages correctly set to `noindex` while they are drafts.

### Problems found and fixed

| # | Problem | Impact | Fixed in |
| --- | --- | --- | --- |
| 1 | **The old Vercel copy of the site is live** at `piuswanyanguportfolio.vercel.app` and declares itself canonical | Two copies compete in Google, which splits ranking signals | 3.1 |
| 2 | `npm run build` failed without an environment variable | The site could not be built or run locally | 3.1 |
| 3 | Service page descriptions were 38 to 83 characters, copied from short card text | Google shows a weak snippet or writes its own | 3.3 |
| 4 | Generic titles such as "Work" and "Services", and no mention of Kenya | Doesn't match how people search, for example "KRA PIN registration help Kenya" | 3.3 |
| 5 | No Service structured data on service pages | Search engines must guess what each page offers | 3.2 |
| 6 | Organization logo was an SVG | Google requires a PNG or JPG logo of at least 112 × 112 px | 3.2 |
| 7 | robots.txt contained `Host:` | A Yandex-only directive that Google ignores | 3.2 |
| 8 | `/blog` was indexable with no articles | Empty pages count as "thin content" | 3.2 |

### Not changed, with reasons

- **Sitemap `lastmod` dates.** Google only trusts `lastmod` when it reflects
  real content changes. Static pages have no reliable change date, and using
  the build time would be inaccurate. Published articles already include
  real dates.
- **`keywords` meta tag.** Google ignores it. It is harmless, so it was left
  in place.
- **Body content and headings.** Not rewritten, as agreed. Suggestions are in
  section 5.

---

## 2. Concepts, in brief

- **Title tag:** the blue link in search results. Google shows about 60
  characters.
- **Meta description:** the grey text under the link. It doesn't affect
  ranking directly, but a specific description earns more clicks. Aim for
  120 to 160 characters.
- **Canonical URL:** tells search engines which URL is the original when the
  same content exists at several addresses.
- **Structured data (JSON-LD):** a machine-readable description of the page,
  such as "this is a Service offered by this Organization in Kenya". It is
  invisible to visitors.
- **noindex:** asks search engines not to list a page in results, while
  still following its links.
- **Sitemap:** the list of URLs you want indexed, submitted through Search
  Console.

---

## 3. Changes

### 3.1 Canonical domain as the built-in default

**PROBLEM:** two problems had one cause. `src/lib/site-config.ts` required
`NEXT_PUBLIC_SITE_URL` for every production build, and failed with
"NEXT_PUBLIC_SITE_URL is not set" otherwise. Docker passes it, but a plain
`npm run build` on your PC did not, so the build failed and `npm start` had
nothing to serve. That is why the site "didn't work in the browser".
Separately, the config fell back to Vercel's own URL on Vercel, so the old
Vercel copy declares *itself* the canonical original.

**SOLUTION:** added `productionOrigin = "https://afrinexsolutions.co.ke"`.
Production builds use it unless `NEXT_PUBLIC_SITE_URL` overrides it. The
Vercel fallback was removed. Overrides are still validated, so an `http://`
or localhost value still fails the build.

**TECHNICAL EXPLANATION:** every page is prerendered, so the canonical URL is
baked into the HTML at build time. A fixed, correct default means every
build, wherever it runs, tells Google the same original address. If Vercel
rebuilds from GitHub, its copy will point Google to afrinexsolutions.co.ke,
and Google will consolidate on the real domain.

**FILES:** `src/lib/site-config.ts`, `playwright.config.ts`, `.env.example`,
`README.md`.

**VERIFICATION:**

```powershell
npm run build                          # succeeds with no .env file
npm start
curl.exe -s http://localhost:3000/about | Select-String canonical
# <link rel="canonical" href="https://afrinexsolutions.co.ke/about"
```

**LESSON:** a safety check that blocks the normal developer workflow will
eventually be worked around. Once a value is known and stable, make the
correct value the default and validate overrides.

**Still needed from you:** delete the Vercel project, or point it at your
domain with a redirect. Until then it serves a duplicate copy. See
`GOOGLE_SEARCH_SETUP.md`, step 6.

### 3.2 Technical SEO fixes

| Change | File | How to verify |
| --- | --- | --- |
| Service JSON-LD on every service page: name, description, category, provider link to the Organization, and Kenya as the area served | `src/app/services/[slug]/page.tsx` | View source and search `"@type":"Service"`, or use <https://validator.schema.org> |
| Organization logo changed to `/apple-icon`, a 180 × 180 PNG | `src/app/layout.tsx` | Open `/apple-icon` in a browser |
| `Host:` removed from robots.txt | `src/app/robots.ts` | Open `/robots.txt` |
| `/blog` is `noindex, follow` while no article is published. This switches off automatically once one is. | `src/app/blog/page.tsx` | View source on `/blog` and search `noindex` |

**Note on Service structured data:** Google does not show a special result
design for the Service type. Its value is helping search engines understand
what each page offers and connecting it to your Organization. Breadcrumbs and
the Organization logo *can* appear in results.

### 3.3 On-page SEO: titles and descriptions

**Approach:** keywords come from the services you actually offer and how
people in Kenya search for them, such as "KRA PIN registration", "SHA
registration", "eTIMS" and "data entry services". Each keyword appears once,
in natural wording. Nothing is claimed that the site doesn't already say.

**KRA wording:** the new KRA descriptions say "guidance" and "help while you
complete your return", and avoid "filing". The tax-agent question in
`LEGAL_DOCUMENT_REVIEW.md` is still open. The visible service card text was
not changed.

**Service pages:** titles and descriptions moved to `src/data/service-seo.ts`
so the short card text stays short.

| Page | Old title | New title |
| --- | --- | --- |
| Home | Afrinex Solutions \| Digital Services, Software, AI & Automation | Afrinex Solutions \| Digital, Software & AI Services in Kenya |
| About | About \| Afrinex Solutions | About Afrinex Solutions \| Kenya-Based Digital Services |
| Services | Services \| Afrinex Solutions | Digital, Data & Software Services in Kenya \| Afrinex Solutions |
| Work | Work \| Afrinex Solutions | Work & Case Studies \| Afrinex Solutions |
| Contact | Contact \| Afrinex Solutions | Contact Afrinex Solutions \| WhatsApp & Email |
| SHA | SHA Registration Assistance \| … | SHA Registration Help in Kenya \| … |
| KRA PIN | KRA PIN Registration Assistance \| … | KRA PIN Registration Help in Kenya \| … |
| KRA returns | KRA Returns Assistance \| … | KRA Returns Assistance in Kenya \| … |
| eTIMS | eTIMS Assistance \| … | eTIMS Registration and Setup Help \| … |
| Data entry | Data Entry \| … | Data Entry Services in Kenya \| … |
| Data cleaning | Data Cleaning \| … | Data Cleaning and Spreadsheet Cleanup \| … |
| Data analysis | Reports and Data Analysis \| … | Business Reports and Data Analysis \| … |
| Software | Software Development \| … | Website and Software Development \| … |
| AI | AI-Powered Solutions \| … | AI-Powered Solutions for Business \| … |
| Automation | Automation Services \| … | Business Process Automation \| … |
| Maintenance | Website Maintenance \| … | Website Maintenance and Support \| … |
| Design | Graphic Design \| … | Graphic Design Services \| … |
| LinkedIn | LinkedIn Optimization \| … | LinkedIn Profile Optimization \| … |

`createPageMetadata()` gained a `fullTitle` option for titles that already
contain the brand, which avoids "About Afrinex Solutions | Afrinex Solutions".

**Measured result on the local build:** every indexable service and main page
has a title of 60 characters or fewer and a description of 125 to 157
characters. There are no duplicate titles or descriptions across the 25 pages
checked, and every page passes JSON-LD parsing.

**FILES:** `src/data/service-seo.ts` (new), `src/app/services/[slug]/page.tsx`,
`src/app/layout.tsx`, `src/app/about/page.tsx`, `src/app/services/page.tsx`,
`src/app/work/page.tsx`, `src/app/contact/page.tsx`, `src/lib/site-config.ts`.

**LESSON:** titles should match what a person types into Google. "Services"
matches nothing. "KRA PIN Registration Help in Kenya" matches a real search.
Descriptions should be written so that a person wants to click.

---

## 4. How to verify SEO yourself

1. `npm run build && npm start`, then view source (Ctrl+U) on any page.
   Check `<title>`, `<meta name="description">`, `<link rel="canonical">` and
   the `application/ld+json` scripts.
2. After deploying, run a service page through Google's Rich Results Test
   (<https://search.google.com/test/rich-results>). Expect Breadcrumb and
   Organization to be detected.
3. Paste a service page's JSON-LD into <https://validator.schema.org>. Expect
   no errors.
4. Run Lighthouse's SEO category on any page. Expect 100.

---

## 5. Recommendations not implemented

These need your content decisions:

- **Fix the KRA Returns card text** after legal advice. It currently says
  "preparing and filing your KRA returns".
- **Add `whoItsFor` lines** for each service in `src/data/services.ts`. They
  are currently unset, and they add useful, specific text to service cards.
- **Expand the StayNia and Upright Support project descriptions** to 120+
  characters, in `src/data/projects.ts`.
- **Publish one or two genuinely useful articles**, for example "How to get a
  KRA PIN: what you need before you start". Articles are how a new site earns
  search visibility beyond its brand name. Publishing the first one also
  makes `/blog` indexable automatically.
- **Add your LinkedIn URL** to `siteConfig.social`. It feeds the
  Organization `sameAs` links, which help Google connect your profiles to the
  business.
- **Google Business Profile** as a service-area business, without a public
  address, if you can verify it. It is often the strongest local signal for
  searches in Kenya.

**Realistic expectations:** a search for "Afrinex Solutions" should find the
site within days to a few weeks after Search Console verification and
sitemap submission. Ranking for competitive terms such as "software
development Kenya" takes months and depends on content and links. No setting
can guarantee it.
