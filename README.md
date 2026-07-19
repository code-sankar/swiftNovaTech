# SwiftNova — Studio Website

The marketing and portfolio website for **SwiftNova**, a remote-first web design and development studio based in Visakhapatnam, India, working with clients in the US, UK, and EU.

Single-page React application with an editorial / broadsheet design system, client-side routing, per-page SEO, and a serverless contact form.

> Legal entity: SwiftNova Tech. Live domain: `swiftnovatechlabs.com`.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Animation | Framer Motion |
| Routing | React Router 7 (`createBrowserRouter`) |
| Icons | lucide-react |
| HTTP | axios |
| Dates / timezones | moment, moment-timezone |
| State | react-redux |
| Notifications | react-toastify |
| Contact backend | [Web3Forms](https://web3forms.com) (serverless) |
| Linting | ESLint 9 |

There is no custom backend — the app is a static SPA. Form delivery is handled entirely by Web3Forms.

---

## Getting started

The app lives in the `frontend/` directory.

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (see [Environment variables](#environment-variables)):

```bash
VITE_WEB3FORMS_KEY=your_web3forms_access_key
```

Then run the dev server:

```bash
npm run dev
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_WEB3FORMS_KEY` | Yes | Web3Forms access key used by the contact form. Get one at web3forms.com. |

Because Vite inlines `VITE_`-prefixed variables at build time, this key must also be configured in your deployment platform's dashboard (Vercel / Netlify), not only in local `.env`.

---

## Project structure

```
frontend/
├─ index.html                 # Static meta, OG/Twitter tags, canonical, base JSON-LD
├─ public/                    # Static assets (favicons, og.png, /projects images)
└─ src/
   ├─ main.jsx                # Router definition (createBrowserRouter) + all route imports
   ├─ App.jsx                 # Layout shell: ScrollToTop, Seo, Navbar, <Outlet/>, Footer
   ├─ index.css               # Tailwind entry + design tokens
   ├─ components/
   │  ├─ Seo.jsx              # Per-navigation <head> injection (title, meta, canonical, JSON-LD)
   │  └─ Home/                # Navbar, Footer, scroll__top
   ├─ data/
   │  ├─ seo.js               # Per-page SEO source of truth (title/description/canonical)
   │  └─ projects.js          # Portfolio source of truth (used by pages + SEO)
   └─ pages/
      ├─ Home.jsx
      ├─ Contact.jsx
      ├─ Technologies.jsx
      ├─ Blogs.jsx
      ├─ NotFound.jsx
      ├─ Our_services/        # webdev, Ecommerce, wenApps, cms, uiux, Maintenence, WhyUs
      ├─ Portfolio/           # CaseStudies, ClientProjects, ProjectDetail
      └─ FooterPages/         # PrivacyPolicy, TermsOfService, Disclaimer, Sitemap
```

---

## Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/`, `/home` | Home | |
| `/web` | Custom Web Development | |
| `/ecommerce` | E-commerce | ⚠️ Currently renders the CMS page — see [Known issues](#known-issues--todos) |
| `/web-apps` | Web Applications & SaaS | |
| `/cms` | CMS & Headless Websites | |
| `/design` | Website Design (UI/UX) | |
| `/maintenance` | Maintenance & SEO | |
| `/whyUs` | Why SwiftNova | |
| `/tech` | Technologies | |
| `/blog` | Blog | |
| `/contact` | Contact | |
| `/cases` | Case Studies | |
| `/projects` | Client Projects | |
| `/projects/:slug` | Project Detail | Dynamic; resolves against `data/projects.js` |
| `/privacy-policy`, `/terms-of-service`, `/disclaimer`, `/sitemap` | Legal / footer | |
| `*` | NotFound | 404, marked `noindex` |

---

## Design system

An editorial / broadsheet aesthetic: zero border-radius, hairline borders, monospace captions. Colours and hover behaviours are exposed as Tailwind tokens rather than hard-coded values.

**Colour / border tokens:** `bg-paper`, `text-ink`, `text-graphite`, `text-accent`, `text-faint`, `border-line`, `border-line-strong`

**Type roles:** `font-display`, `font-body`, `font-mono`

**Hover primitives:** `hov-btn`, `hov-cell`, `hov-stat`, `hov-arrow`, `hov-icon`

Accent colour is `#2340F0` (emphasis shade `#182FC4`).

Prefer editing these tokens over introducing one-off colour or radius values, so the system stays consistent.

---

## SEO

SEO is split across static and client-side layers:

- **`index.html`** — static meta, Open Graph, Twitter Card, canonical, and the base `Organization` + `WebSite` JSON-LD graph.
- **`src/data/seo.js`** — per-page title/description/canonical, plus dynamic resolution for `/projects/:slug`.
- **`src/components/Seo.jsx`** — mounted in `App.jsx`; on each navigation it rewrites `document.title`, meta tags, canonical link, and a single managed per-page JSON-LD `<script>`.

**Limitation:** client-side `<meta>` injection does **not** fix social crawler previews (LinkedIn, WhatsApp, Slack, etc.) because those crawlers don't run JavaScript. Fixing per-page social previews requires prerendering / SSG (e.g. `vite-react-ssg`).

---

## Contact form

`Contact.jsx` posts to Web3Forms with:

- Client-side validation (name, email, message length)
- A honeypot field (`botcheck`) that silently drops bot submissions
- `AnimatePresence` success/error banners

The `access_key` is read from `VITE_WEB3FORMS_KEY`. No backend or database is involved.

---

## Deployment

Static build, deployable to Vercel or Netlify (or any static host):

1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_WEB3FORMS_KEY` in the platform's environment settings.
4. Add an SPA fallback so deep links resolve to `index.html` (Netlify `_redirects` / Vercel rewrites), since routing is client-side.

---

## Known issues & TODOs

These are flagged in the code and worth clearing before launch:

- **`/ecommerce` renders the CMS page.** `main.jsx` imports the `Ecommerce` route from `cms.jsx`. Create `pages/Our_services/ecommerce.jsx` and update the import.
- **Inconsistent file names.** `wenApps.jsx` → `webApps.jsx`, `Maintenence.jsx` → `Maintenance.jsx`.
- **Residual old-brand strings.** The Web3Forms payload in `Contact.jsx` still uses "SanRaf" in the `subject` and `from_name` fields — update to SwiftNova.
- **Placeholder content.** Case studies, team profiles, project cards, and social links contain illustrative/placeholder data that needs verified real content (see `// TODO` markers in `data/projects.js`).
- **Missing assets.** Provide a real `public/og.png` (1200×630), a proper favicon set, and the real SwiftNova logo.
- **Mailboxes.** Stand up live mailboxes on `swiftnovatechlabs.com` (e.g. `info@`).

---

## License

Proprietary — © Sankar & Rafel Software Solutions. All rights reserved.
