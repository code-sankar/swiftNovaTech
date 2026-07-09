export const SITE = {
  name: "SwiftNova",
  url: "https://swiftnova.dev",        // TODO: confirm TLD. No trailing slash.
  ogImage: "/og.png",                  // TODO: create public/og.png at 1200×630
  twitter: null,                       // TODO: "@swiftnova" once the account exists
};
 
const DEFAULT_DESCRIPTION =
  "SwiftNova is a web design and development studio building fast, conversion-focused websites, e-commerce stores, and web apps for companies worldwide.";
 
/* Static routes. Keys must match main.jsx exactly. */
export const routeSeo = {
  "/": {
    title: "SwiftNova — Web Design & Development Studio",
    description: DEFAULT_DESCRIPTION,
  },
 
  /* Duplicate of "/". Canonical points home so Google indexes one, not two. */
  "/home": {
    title: "SwiftNova — Web Design & Development Studio",
    description: DEFAULT_DESCRIPTION,
    canonicalPath: "/",
  },
 
  /* ── Services ── */
  "/web": {
    title: "Custom Web Development — SwiftNova",
    description:
      "Fast, standards-based websites built in React and Next.js — from marketing sites to complex frontends, with the rigor to keep them running.",
    service: "Custom Web Development",
  },
  "/ecommerce": {
    title: "E-commerce Development — SwiftNova",
    description:
      "Conversion-focused online stores on Shopify, WooCommerce, or headless commerce — secure checkout, international payments, and speed that sells.",
    service: "E-commerce Development",
  },
  "/web-apps": {
    title: "Web Applications & SaaS Development — SwiftNova",
    description:
      "Custom web apps, dashboards, and SaaS products with authentication, real-time data, and an architecture that scales without a rewrite.",
    service: "Web Application Development",
  },
  "/cms": {
    title: "CMS & Headless Website Development — SwiftNova",
    description:
      "Editor-friendly websites on WordPress, Sanity, or Strapi — so your team publishes without opening a ticket, and pages still load in under a second.",
    service: "CMS Development",
  },
  "/design": {
    title: "Website Design (UI/UX) — SwiftNova",
    description:
      "Distinctive, accessible interface design — research, wireframes, and a polished on-brand design system your developers can actually build from.",
    service: "Website Design",
  },
  "/maintenance": {
    title: "Website Maintenance & Technical SEO — SwiftNova",
    description:
      "Ongoing hosting, security patching, performance tuning, and technical SEO — with a real developer on the other end, not a ticket queue.",
    service: "Website Maintenance and SEO",
  },
 
  /* ── Core ── */
  "/whyUs": {
    title: "Why SwiftNova — How We Work",
    description:
      "No subcontracting, no change-order surprises, and senior developers on every project. What working with our studio actually means.",
  },
  "/contact": {
    title: "Contact SwiftNova — Start a Project",
    description:
      "Tell us what you're building. Detailed brief or rough idea, we reply within 24 hours with a clear response — not a sales pitch.",
  },
  "/tech": {
    title: "Our Technology Stack — SwiftNova",
    description:
      "React, Next.js, Node, headless CMS, and the hosting we deploy on — the tools we work in, chosen for reliability rather than hype.",
  },
  "/blog": {
    title: "Blog — Notes From the Studio | SwiftNova",
    description:
      "Engineering write-ups, opinions, and lessons learned from building and maintaining websites for clients across six countries.",
  },
 
  /* ── Portfolio ── */
  "/cases": {
    title: "Case Studies — Selected Work | SwiftNova",
    description:
      "Deep-dives on selected engagements: the problem, the approach, and the measurable outcome. Real projects, real numbers.",
  },
  "/projects": {
    title: "Client Projects — Portfolio | SwiftNova",
    description:
      "The wider portfolio at a glance — marketing sites, e-commerce stores, web apps, and headless CMS builds, with live links where public.",
  },
 
  /* ── Legal & utility ── */
  "/privacy-policy": {
    title: "Privacy Policy — SwiftNova",
    description:
      "What we collect, why, who else sees it, and what you can do about it. Written to be read, not scanned past.",
  },
  "/terms-of-service": {
    title: "Terms of Service — SwiftNova",
    description:
      "The terms under which we work together, in plain English wherever the law allows.",
  },
  "/disclaimer": {
    title: "Disclaimer — SwiftNova",
    description:
      "What this site is, and what it isn't. Where the line sits between published content and a binding commitment.",
  },
  "/sitemap": {
    title: "Sitemap — SwiftNova",
    description:
      "A flat index of every page published on this site, grouped the way we think about it internally.",
  },
};
 
const NOT_FOUND = {
  title: "Page Not Found — SwiftNova",
  description: "The page you're looking for doesn't exist or has moved.",
  noindex: true,
};
 
/* ────────────────────────────────────────────────────────────────
   Resolve a pathname to its SEO record.
   Handles the one dynamic route (/projects/:slug) by reading the
   project from the same source of truth the pages use.
   ──────────────────────────────────────────────────────────────── */
export const getSeoForPath = (pathname, projects = []) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
 
  if (routeSeo[path]) {
    const entry = routeSeo[path];
    return { ...entry, canonicalPath: entry.canonicalPath ?? path };
  }
 
  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length);
    const project = projects.find((p) => p.slug === slug);
 
    if (!project) return { ...NOT_FOUND, canonicalPath: path };
 
    const client = project.nda ? "a confidential client" : project.client;
    return {
      title: `${project.name} — Case Study | SwiftNova`,
      description: project.summary?.slice(0, 158) ?? DEFAULT_DESCRIPTION,
      canonicalPath: path,
      project: { ...project, client },
    };
  }
 
  return { ...NOT_FOUND, canonicalPath: path };
};