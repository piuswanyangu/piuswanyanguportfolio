# Pius Wanyangu Portfolio

A production-ready portfolio for Pius Wanyangu, a Full-Stack Software Engineer focused on backend systems, automation, and AI-powered applications.

## Overview

This portfolio presents Pius's engineering experience to software recruiters, businesses looking for dependable software solutions, and potential collaborators. It demonstrates practical full-stack work through project case studies, technical capabilities, and clear contact paths.

The interface follows a Developer Editorial direction: factual project evidence, strong typography, deliberate spacing, reusable components, accessible interactions, and minimal motion. Content is kept in centralized data modules so the site can evolve without coupling portfolio information to presentation code.

## Live Site

Production URL will be added after Vercel deployment.

## Features

- Responsive application shell with reusable header, navigation, and footer
- Accessible desktop and mobile navigation
- Homepage sections for identity, selected projects, engineering stack, working approach, about, and contact
- Data-driven project case studies with architecture and engineering decisions
- Dedicated About, Projects, Skills, CV, Writing, and Contact pages
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
- WebSite and Person JSON-LD
- Generated sitemap and robots directives

### Tooling and Deployment

- ESLint
- TypeScript compiler
- Git and npm
- Vercel-ready configuration

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

The App Router owns routing, page metadata, static project generation, and search-engine endpoints. Shared layout and section components keep page composition readable, while content modules separate portfolio facts from UI code. The application is server-component-first; client-side JavaScript is limited to the interactive desktop and mobile navigation boundaries.

## Pages and Routes

| Route | Purpose |
| --- | --- |
| `/` | Portfolio overview and primary conversion paths |
| `/about` | Professional background and engineering approach |
| `/projects` | Project portfolio |
| `/projects/[slug]` | Statically generated project case studies |
| `/skills` | Technical capabilities |
| `/cv` | CV overview and experience |
| `/writing` | Engineering notes and future articles |
| `/contact` | Email and WhatsApp contact options |

Project case-study routes are generated from `src/data/projects.ts`.

## Homepage Structure

The homepage prioritizes inspectable work before broader positioning:

1. Hero
2. Selected Projects
3. Engineering Stack
4. How I Work
5. About
6. Contact

## Design System

The dark engineering palette is expressed through semantic CSS tokens, allowing components to use intent-based colors instead of repeating raw values.

| Token role | Color |
| --- | --- |
| Background | `#07111F` |
| Primary surface | `#0D1B2A` |
| Elevated surface | `#12263A` |
| Primary text | `#F8FAFC` |
| Secondary text | `#94A3B8` |
| Primary cyan | `#38BDF8` |
| Secondary teal | `#14B8A6` |

Geist Sans supports interface and long-form text, while Geist Mono is used for technical accents. Surface hierarchy, consistent borders, and a high-visibility cyan focus outline reinforce structure without decorative clutter.

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

`NEXT_PUBLIC_SITE_URL` supplies the canonical production origin used by those features. When it is absent, Vercel's production project URL is used when available; local development otherwise falls back to `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use the local fallback during development where appropriate, and configure the final HTTPS origin in Vercel for production. `NEXT_PUBLIC_SITE_URL` is public configuration, not a secret. Do not place private credentials in variables prefixed with `NEXT_PUBLIC_`.

## Getting Started

Prerequisites: a current Node.js release compatible with Next.js 16 and npm.

```bash
git clone https://github.com/piuswanyangu/piuswanyanguportfolio.git
cd piuswanyanguportfolio
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

They validate lint rules, static types, the production compilation and route generation, and whitespace integrity respectively.

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel and confirm Next.js framework detection.
3. Set `NEXT_PUBLIC_SITE_URL` to the final public HTTPS origin.
4. Deploy the application.
5. Attach the custom domain.
6. Redeploy after domain configuration if the origin changed.
7. Verify canonical and Open Graph URLs, `/robots.txt`, and `/sitemap.xml` on production.

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
- Technical capability groups: `src/data/technical-capabilities.ts`
- Email and WhatsApp details: `src/data/contact.ts`
- Navigation: `src/data/navigation.ts`
- Engineering articles: `src/data/articles.ts`
- Site identity, production URL behavior, and social image: `src/lib/site-config.ts`

## Future Enhancements

- Branded favicon and application icons
- Social preview image
- Project screenshots
- Real GitHub repository and live deployment URLs
- Downloadable CV
- Optional verified professional social links

## Author

**Pius Wanyangu**

Full-Stack Software Engineer | AI-Powered Applications

## License

No license has been specified yet.
