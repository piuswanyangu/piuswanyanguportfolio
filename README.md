# Afrinex Solutions

Company website for Afrinex Solutions: Digital Services, Software, AI & Automation.

## Overview

Afrinex Solutions helps individuals and businesses handle digital tasks, build digital solutions, and work smarter with technology. The current implementation establishes the company identity, approved service catalog, selected founder work, and direct contact paths.

The interface follows a Developer Editorial direction: factual project evidence, strong typography, deliberate spacing, reusable components, accessible interactions, and minimal motion. Content is kept in centralized data modules so the site can evolve without coupling company and project content to presentation code.

## Live Site

Production URL will be added once the domain and hosting product are configured.

## Features

- Responsive application shell with reusable header, navigation, and footer
- Accessible desktop and mobile navigation
- Homepage foundation for company identity, selected work, technical capability, process, about, and contact
- Centralized typed service catalog grouped into four approved categories
- Data-driven founder-project case studies with architecture and engineering decisions
- Public Services, Work, About, and Contact pages
- Email and WhatsApp contact options
- Centralized project, capability, contact, and site configuration
- Canonical URLs, Open Graph metadata, Twitter metadata, and JSON-LD
- Generated `sitemap.xml` and `robots.txt`
- Responsive layouts and visible keyboard focus states
- CSS-based motion with `prefers-reduced-motion` support

## Technology Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4

### Design and Accessibility

- Semantic HTML
- CSS design tokens
- Responsive design
- Keyboard-accessible controls
- Reduced-motion support
- Geist Sans and Geist Mono

### SEO

- Next.js Metadata API
- Canonical URLs
- Open Graph and Twitter metadata
- WebSite and Organization JSON-LD with founder attribution
- Generated sitemap and robots directives

### Tooling and Deployment

- ESLint
- TypeScript compiler
- Git and npm
- Fully prerendered output (no server-only features in use)

## Project Architecture

```text
src/
├── app/                    # Routes, metadata, sitemap, robots, and global styles
│   └── projects/[slug]/    # Data-driven project case studies
├── components/
│   ├── layout/             # Shared application shell
│   ├── projects/           # Project and case-study UI
│   ├── sections/           # Homepage sections
│   └── seo/                # Structured-data rendering
├── data/                   # Projects, capabilities, contact, navigation, articles
└── lib/                    # Central site and URL configuration
```

The App Router owns routing, page metadata, static project generation, and search-engine endpoints. Shared layout and section components keep page composition readable, while content modules separate company and project content from UI code. The application is server-component-first; client-side JavaScript is limited to the interactive desktop and mobile navigation boundaries.

## Pages and Routes

| Route | Purpose |
| --- | --- |
| `/` | Company overview and primary conversion paths |
| `/services` | Approved Afrinex service catalog |
| `/work` | Selected founder work and case-study entry point |
| `/about` | Company foundation and founder attribution |
| `/projects/[slug]` | Statically generated project case studies |
| `/contact` | Email and WhatsApp contact options |

Project case-study routes are generated from `src/data/projects.ts`.

## Homepage Structure

The homepage prioritizes inspectable work before broader positioning:

1. Hero
2. Service Categories
3. Why Afrinex
4. How It Works
5. Selected Work
6. Founder / Trust
7. Final CTA

## Design System

Light is the default theme, with Dark and Green available through the persistent theme selector. All three use semantic CSS tokens so components rely on intent-based colors instead of repeating raw values.

| Token role | Color |
| --- | --- |
| Default background | `#F7F6F1` |
| Default surface | `#FFFEFA` |
| Default primary text | `#10202E` |
| Brand green | `#16794B` |
| Dark background | `#07111F` |
| Green-theme background | `#07120D` |

Geist Sans supports interface and long-form text, while Geist Mono is used for technical accents. Surface hierarchy, consistent borders, a dedicated higher-contrast border token for interactive controls, and a high-visibility green focus outline reinforce structure without decorative clutter.

## Motion

Motion is implemented in CSS using centralized duration and easing tokens. It is limited to restrained navigation, disclosure, and link feedback without a JavaScript animation library. The `prefers-reduced-motion` media query removes non-essential animation, transitions, and smooth scrolling for users who request it.

## Accessibility

The implementation includes:

- Semantic page landmarks and heading structure
- A keyboard-accessible skip link and native links/buttons
- Visible `:focus-visible` treatment
- `aria-current` for active navigation
- Mobile-menu labels and expanded-state ARIA
- Deliberate foreground and surface contrast
- Reduced-motion handling

These are implementation decisions, not a claim of formal WCAG certification.

## SEO

The site configures `metadataBase`, canonical URLs, Open Graph data, Twitter metadata, WebSite JSON-LD, Person JSON-LD, `sitemap.xml`, and `robots.txt`.

`NEXT_PUBLIC_SITE_URL` supplies the canonical production origin used by those features. `npm run dev` falls back to `http://localhost:3000`. A production build **fails** if the value is missing, not `https://`, or a localhost origin, so a deployment cannot silently ship localhost metadata.

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The value is inlined at build time and every route is prerendered, so it must be set **before** `npm run build` runs; setting it afterwards has no effect without rebuilding. `NEXT_PUBLIC_SITE_URL` is public configuration, not a secret. Do not place private credentials in variables prefixed with `NEXT_PUBLIC_`.

## Getting Started

Prerequisites: a current Node.js release compatible with Next.js 16 and npm.

```bash
git clone <repository-url>
cd MyPortfolio
npm install
```

Create the local environment file:

macOS/Linux:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the repository |
| `npm run typecheck` | Run TypeScript without emitting files |

## Production Validation

Run these checks before a release:

```bash
npm run lint
npm run typecheck
npm run build
git diff --check
```

They validate lint rules, static types, the production compilation and route
generation, and whitespace integrity respectively. `npm run build` requires
`NEXT_PUBLIC_SITE_URL` to be set to a public `https://` origin.

## Deployment

The hosting product has not been selected yet, so these steps are
platform-agnostic.

Every route is prerendered and the application uses no server-only features
(no middleware, route handlers, server actions, cookies, or ISR). It can run
either as a Next.js Node server (`npm run start`, Node.js >= 20.9.0) or, with
`next.config.ts` changes that have deliberately not been made yet, as a static
export. The only static-export blocker is `next/image` with the default loader.

1. Register the domain and decide the hosting product.
2. Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin in the build
   environment.
3. Run `npm ci && npm run build`. The build fails fast if the origin is
   missing or invalid.
4. Serve the build (`npm run start` for Node hosting).
5. Attach the custom domain and confirm HTTPS.
6. Verify canonical URLs, `/robots.txt`, and `/sitemap.xml` on production.

## SEO Launch Checklist

- [ ] Configure the custom domain
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production origin
- [ ] Replace the scaffold favicon with branded icons
- [ ] Add a social Open Graph image
- [ ] Add real project source and deployment URLs
- [ ] Verify `/sitemap.xml` on production
- [ ] Verify `/robots.txt` on production
- [ ] Configure Google Search Console
- [ ] Submit the production sitemap
- [ ] Confirm intended production pages are indexed

## Content Updates

- Projects and case studies: `src/data/projects.ts`
- Blog articles: `src/data/articles.ts`. Drafts are previewable with `npm run dev` at `/blog/[slug]`; change `status` to `published` only after review. Production builds generate public routes only for published articles.
- Testimonials: `src/data/testimonials.ts`. Add a genuine customer-approved quote and set `approved: true`; unapproved entries are excluded from the homepage.
- Email and WhatsApp details: `src/data/contact.ts`
- Navigation: `src/data/navigation.ts`
- Site identity, production URL behavior, and social image: `src/lib/site-config.ts`

## Future Enhancements

- Branded favicon and application icons
- Social preview image
- Project screenshots
- Real GitHub repository and live deployment URLs
- Optional verified professional social links

## Founder

**Pius Wanyangu**

Founder & Software Engineer

## License

No license has been specified yet.
