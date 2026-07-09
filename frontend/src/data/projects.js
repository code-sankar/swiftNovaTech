/* ────────────────────────────────────────────────────────────────
   src/data/projects.js
   Single source of truth for the Client Projects portfolio.
   Both the grid (ClientProjects.jsx) and the detail pages
   (ProjectDetail.jsx) read from here.

   ── HOW TO ADD / EDIT A PROJECT ──
   • slug      → the URL. /projects/<slug>  (lowercase, dashes, unique)
   • liveUrl   → the REAL link to the shipped work. This is the whole
                 point of the page — set it to the live site. Leave as
                 null only if the work is under NDA / not public.
   • repoUrl   → optional public repo link (or null)
   • cover     → screenshot path. Drop the image in  public/projects/
                 e.g. public/projects/meridian.jpg  →  cover: "/projects/meridian.jpg"
                 If the file is missing, the UI shows a tidy placeholder,
                 so nothing breaks while you gather screenshots.
   • gallery   → optional extra screenshots (same path rule)
   • nda       → true hides the client's real name and the live link
   ──────────────────────────────────────────────────────────────── */

export const projectCategories = [
  "All",
  "Marketing Sites",
  "E-commerce",
  "Web Apps",
  "Web Design",
  "CMS / Headless",
];

export const projects = [
  {
    slug: "meridian-commerce-store",
    name: "Meridian Commerce Store",
    client: "Meridian Retail Group",
    category: "E-commerce",
    year: "2025",
    featured: true,
    nda: false,
    liveUrl: "https://example.com",       // TODO: real live URL
    repoUrl: null,
    cover: "https://res.cloudinary.com/dx7b8hfwm/image/upload/v1783525344/Screenshot_2026-07-08_210315_qjrvf5.png",       // TODO: add screenshot to public/projects/
    gallery: [],                           // TODO: optional extra screenshots
    summary:
      "A headless Shopify + Next.js storefront serving shoppers across 14 markets, rebuilt from a slow legacy site with a zero-downtime migration.",
    outcome: "3× faster checkout · 40% mobile conversion lift · 92 Lighthouse",
    tags: ["Next.js", "Shopify Hydrogen", "Tailwind", "Vercel", "Stripe"],
    overview:
      "Meridian Retail Group runs a multi-market fashion business that had outgrown its legacy platform. Pages were slow, the checkout leaked customers on mobile, and the marketing team couldn't ship changes without a developer.",
    challenge:
      "The existing store loaded in over six seconds on mobile and lost a third of shoppers before checkout. Migrating 14 storefronts without downtime or losing SEO rankings was the hard constraint.",
    approach:
      "We rebuilt the storefront as a headless Shopify Hydrogen + Next.js app, kept the catalogue in Shopify so the merchandising team stayed in familiar tooling, and ran a phased, market-by-market cutover behind feature flags.",
    results: [
      { value: "3×",  label: "faster checkout" },
      { value: "40%", label: "mobile conversion lift" },
      { value: "92",  label: "Lighthouse score" },
      { value: "0",   label: "downtime during migration" },
    ],
    testimonial: {
      quote:
        "The migration was invisible to our customers and our sales never dipped. The new store is the fastest we've ever run.",
      author: "Head of Digital",
      role: "Meridian Retail Group",
    },
  },
  {
    slug: "pulse-health-marketing-site",
    name: "Pulse Health Marketing Site",
    client: "Pulse Medical",
    category: "Marketing Sites",
    year: "2025",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/pulse.jpg",
    gallery: [],
    summary:
      "A brand-forward marketing site with a headless CMS, blog, and lead-capture flow — indexed and ranking for target keywords within weeks.",
    outcome: "2× organic traffic · 98 Lighthouse",
    tags: ["Next.js", "Sanity CMS", "Tailwind"],
    overview:
      "Pulse Medical needed a marketing site that could tell a clinical story clearly while letting their team publish without engineering help.",
    challenge:
      "Their old site was invisible in search and every content change required a ticket. They needed speed, editorial independence, and a lead flow that actually converted.",
    approach:
      "We built a Next.js front end backed by Sanity so the team could publish freely, with a structured content model, on-page SEO baked in, and a lead-capture flow wired to their CRM.",
    results: [
      { value: "2×",  label: "organic traffic" },
      { value: "98",  label: "Lighthouse score" },
      { value: "wks", label: "to first-page ranking" },
    ],
    testimonial: null,
  },
  {
    slug: "atlas-freight-portal",
    name: "Atlas Freight Portal",
    client: "Atlas Freight",
    category: "Web Apps",
    year: "2024",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/atlas.jpg",
    gallery: [],
    summary:
      "A logistics dashboard with real-time shipment tracking, role-based access, and automated alerts — replacing three legacy tools.",
    outcome: "45% fewer support tickets · daily active use across 200+ sites",
    tags: ["React", "Node.js", "PostgreSQL"],
    overview:
      "Atlas Freight coordinated shipments across hundreds of sites using a patchwork of spreadsheets and two ageing internal tools.",
    challenge:
      "Dispatchers had no single view of a shipment's status, and support was flooded with 'where is my load' calls all day.",
    approach:
      "We consolidated everything into one real-time dashboard with live tracking, role-based access for dispatchers and clients, and automated status alerts that removed the need to call in.",
    results: [
      { value: "45%",  label: "fewer support tickets" },
      { value: "200+", label: "sites in daily use" },
      { value: "3→1",  label: "tools replaced" },
    ],
    testimonial: null,
  },
  {
    slug: "northwind-design-system",
    name: "Northwind Design System",
    client: "Northwind SaaS",
    category: "Web Design",
    year: "2025",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/northwind.jpg",
    gallery: [],
    summary:
      "A full component library and web design language unifying six product surfaces under one consistent look and feel.",
    outcome: "58% faster page delivery · one shared UI kit",
    tags: ["Figma", "Storybook", "Design Tokens"],
    overview:
      "Northwind's six product areas had each drifted into their own visual language, slowing every team down and confusing customers.",
    challenge:
      "No shared components, no tokens, and every new page rebuilt from scratch. Consistency was impossible to maintain by hand.",
    approach:
      "We built a token-driven design system in Figma and Storybook, documented usage, and rolled it out surface by surface so teams could adopt without a freeze.",
    results: [
      { value: "58%", label: "faster page delivery" },
      { value: "6→1", label: "surfaces unified" },
      { value: "1",   label: "shared UI kit" },
    ],
    testimonial: null,
  },
  {
    slug: "vertex-financial-website",
    name: "Vertex Financial Website",
    client: "Vertex Financial",
    category: "CMS / Headless",
    year: "2024",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/vertex.jpg",
    gallery: [],
    summary:
      "A headless WordPress build with a Next.js frontend — editors get familiar tooling, users get a site that loads in under a second.",
    outcome: "99.99% uptime · sub-1s page loads",
    tags: ["WordPress", "Next.js", "Vercel"],
    overview:
      "Vertex Financial wanted the editorial comfort of WordPress without the performance and security baggage of a traditional theme.",
    challenge:
      "Their content team relied on WordPress, but the monolithic site was slow and a constant security concern in a regulated industry.",
    approach:
      "We kept WordPress as a headless CMS and put a Next.js front end in front of it on Vercel — familiar authoring, static-fast delivery, and a much smaller attack surface.",
    results: [
      { value: "99.99%", label: "uptime" },
      { value: "<1s",    label: "page loads" },
      { value: "↓",      label: "attack surface" },
    ],
    testimonial: null,
  },
  {
    slug: "lumen-learning-platform",
    name: "Lumen Learning Platform",
    client: "Lumen Education",
    category: "Web Apps",
    year: "2024",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/lumen.jpg",
    gallery: [],
    summary:
      "An adaptive learning web app with gamification and live collaboration, scaled to learners in 15 countries with zero downtime.",
    outcome: "3× course completion · 15-country rollout",
    tags: ["React", "Laravel", "WebRTC"],
    overview:
      "Lumen Education wanted to lift course completion by making learning interactive rather than a passive video wall.",
    challenge:
      "Completion rates were low and the platform couldn't support live sessions or scale beyond a single region.",
    approach:
      "We built an adaptive learning app with gamified progress, live collaboration over WebRTC, and an architecture that scaled cleanly across 15 countries.",
    results: [
      { value: "3×",  label: "course completion" },
      { value: "15",  label: "countries" },
      { value: "0",   label: "downtime at rollout" },
    ],
    testimonial: null,
  },
  {
    slug: "orbit-payments-landing",
    name: "Orbit Payments Landing",
    client: "Orbit Payments",
    category: "Marketing Sites",
    year: "2025",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/orbit.jpg",
    gallery: [],
    summary:
      "A high-converting landing site for a fintech launch — A/B tested hero, product tour, and integrated demo booking flow.",
    outcome: "4.2% signup rate · first-page SERP in 6 weeks",
    tags: ["Next.js", "Tailwind", "HubSpot"],
    overview:
      "Orbit Payments was launching and needed a landing site engineered to convert cold traffic into booked demos.",
    challenge:
      "A launch with no brand recognition and a short runway to prove the funnel worked.",
    approach:
      "We shipped an A/B-tested landing site with a guided product tour and a demo-booking flow wired straight into HubSpot, then iterated on the hero against live data.",
    results: [
      { value: "4.2%", label: "signup rate" },
      { value: "6 wks", label: "to first-page SERP" },
    ],
    testimonial: null,
  },
  {
    slug: "harbor-booking-store",
    name: "Harbor Booking Store",
    client: "Harbor Hospitality",
    category: "E-commerce",
    year: "2024",
    nda: false,
    liveUrl: "https://example.com",
    repoUrl: null,
    cover: "/projects/harbor.jpg",
    gallery: [],
    summary:
      "A custom-built booking store with one-tap rebooking, live availability, and integrated Stripe checkout for a hospitality chain.",
    outcome: "60% more completed bookings · 3× returning users",
    tags: ["Next.js", "Stripe", "Sanity CMS"],
    overview:
      "Harbor Hospitality wanted booking to feel as easy as buying, with returning guests able to rebook in a tap.",
    challenge:
      "Their booking flow was clunky and lost guests at payment, with no incentive for repeat visits.",
    approach:
      "We built a booking store with live availability, one-tap rebooking for returning guests, and a streamlined Stripe checkout, all editable through Sanity.",
    results: [
      { value: "60%", label: "more completed bookings" },
      { value: "3×",  label: "returning users" },
    ],
    testimonial: null,
  },
];

/* Small helpers used by the pages */
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getFeatured = () => projects.find((p) => p.featured) || projects[0];