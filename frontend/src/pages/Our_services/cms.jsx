import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Layers,
  Edit3,
  Globe,
  Database,
  Zap,
  CheckCircle,
  Users,
  Target,
  Rocket,
  Shield,
  Move,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

/* ---------------- data ---------------- */

const services = [
  {
    icon: FileText,
    title: "WordPress Websites",
    description: "Custom WordPress builds — themed, secure, fast, and easy for your team to update.",
    features: ["Custom Themes", "Gutenberg Blocks", "WooCommerce", "Security Hardening"],
    technologies: ["WordPress", "PHP", "MySQL", "ACF"],
  },
  {
    icon: Layers,
    title: "Headless CMS",
    description: "Sanity, Contentful, or Strapi with a lightning-fast Next.js frontend — best of both worlds.",
    features: ["Sanity", "Contentful", "Strapi", "Next.js Frontend"],
    technologies: ["Sanity", "Contentful", "Strapi", "Next.js"],
  },
  {
    icon: Globe,
    title: "Webflow & No-code",
    description: "Webflow builds when you want editorial freedom without touching code — or a stepping stone.",
    features: ["Custom Interactions", "CMS Collections", "Ecommerce", "Client Handover"],
    technologies: ["Webflow", "Framer", "CSS", "JS"],
  },
  {
    icon: Edit3,
    title: "Custom Editor UX",
    description: "Content workflows and editor interfaces designed around how your team actually publishes.",
    features: ["Structured Content", "Approval Workflows", "Preview Modes", "Editor Training"],
    technologies: ["Sanity Studio", "Custom UI", "Portable Text"],
  },
  {
    icon: Move,
    title: "Content Migrations",
    description: "Move from a legacy CMS to a modern stack — content, media, URLs, and SEO all intact.",
    features: ["Content Mapping", "301 Redirects", "Media Migration", "SEO Preservation"],
    technologies: ["Scripts", "APIs", "Custom Tools"],
  },
  {
    icon: Database,
    title: "Multi-site & Localisation",
    description: "One codebase powering multiple sites, regions, or languages — from a single content source.",
    features: ["Multi-region", "i18n", "Shared Components", "Central Publishing"],
    technologies: ["Next.js", "Sanity", "i18n"],
  },
];

const technologies = [
  "WordPress", "Sanity", "Contentful", "Strapi",
  "Webflow", "Next.js", "React", "GraphQL",
  "PHP", "Node.js", "Tailwind", "Vercel",
];

const processSteps = [
  { step: "01", title: "Discovery & CMS Selection", description: "Understand your content, editors, and workflows — then recommend the right platform.",   duration: "1–2 weeks", icon: Target },
  { step: "02", title: "Content Model & IA",         description: "Map content types, relationships, and the site structure your editors will work in.",       duration: "1–2 weeks", icon: Database },
  { step: "03", title: "Design",                     description: "Design pages, components, and the editor experience — as much for your team as for readers.", duration: "2–3 weeks", icon: Users },
  { step: "04", title: "Build",                      description: "Build the frontend, CMS, and integrations against real content — no lorem ipsum.",           duration: "3–8 weeks", icon: FileText },
  { step: "05", title: "Content Migration & Launch", description: "Move content, set up redirects, and coordinate a zero-downtime cutover.",                     duration: "1–2 weeks", icon: Rocket },
  { step: "06", title: "Training & Support",         description: "Train your editors, document workflows, and stay on for updates and iterations.",              duration: "Ongoing",   icon: Shield },
];

const benefits = [
  { icon: Edit3,      title: "Editors in Control",     description: "Your team publishes updates without opening a Slack thread with a developer.",        metric: "Zero dev bottleneck" },
  { icon: Zap,        title: "Fast Sites",             description: "Static generation and edge delivery give you sub-1s page loads out of the box.",        metric: "Sub-1s load times" },
  { icon: Globe,      title: "SEO by Default",         description: "Clean URLs, metadata, sitemaps, and structured data set up correctly from day one.",    metric: "Indexed on launch" },
  { icon: Layers,     title: "Composable Stack",       description: "Swap the frontend, CMS, or hosting later without a full rebuild.",                      metric: "Future-proof" },
  { icon: Shield,     title: "Secure by Design",       description: "Headless architectures reduce attack surface — no admin panel exposed to the internet.", metric: "Reduced attack surface" },
  { icon: CheckCircle, title: "Easy to Maintain",      description: "Fewer plugins, less bloat, and a codebase that ages well over the years.",                metric: "Low maintenance cost" },
];

const stats = [
  { value: "43%",  label: "of websites worldwide run on WordPress" },
  { value: "5×",   label: "faster page loads with headless vs monolithic" },
  { value: "68%",  label: "of marketers prefer headless CMS control" },
  { value: "2.5×", label: "faster editor workflows with structured content" },
];

const caseStudies = [
  {
    title: "Publisher Migration to Headless",
    industry: "Media & Publishing",
    challenge: "Legacy WordPress site with 8,000 posts, slow pages, and an editor UX writers hated.",
    solution: "Migrated to Sanity + Next.js — structured content model, custom editor UX, and full SEO preservation.",
    results: "3× faster page loads, 60% happier editors, zero indexing loss on migration.",
    technologies: ["Sanity", "Next.js", "Vercel"],
  },
  {
    title: "Multi-region Corporate Site",
    industry: "SaaS",
    challenge: "Global brand needing localised sites for four regions from a single content source.",
    solution: "Contentful + Next.js multi-region build with shared components and per-market publishing.",
    results: "One codebase for four regions, publishing time cut in half.",
    technologies: ["Contentful", "Next.js", "i18n"],
  },
  {
    title: "Editorial WordPress Refresh",
    industry: "Retail",
    challenge: "Growing brand outgrew a page-builder theme — slow, hard to update, no consistency.",
    solution: "Custom Gutenberg blocks and a lightweight theme with proper design tokens and editor training.",
    results: "Editors ship pages in minutes, brand consistency restored, PageSpeed jumped 40 points.",
    technologies: ["WordPress", "ACF", "Gutenberg"],
  },
];

const faqs = [
  { q: "Should I choose WordPress or a headless CMS?",           a: "WordPress is a great fit for content-heavy sites where you want an all-in-one solution and a large plugin ecosystem. Headless (Sanity, Contentful) makes sense when you want a fast frontend, structured content, or need to publish to multiple channels. We recommend based on your team, content, and roadmap." },
  { q: "Can you migrate our existing site to a new CMS?",       a: "Yes. We handle content migrations regularly — pages, posts, media, users, and 301 redirects to preserve SEO. We audit your existing site first and give you a migration plan before we touch anything." },
  { q: "Will our editors need to learn something new?",         a: "A little, yes. We train your team on the new CMS with hands-on sessions, document workflows, and stay on-call for the first few weeks. Most editors are more productive within days." },
  { q: "How long does a CMS website take to build?",             a: "A themed WordPress site: 4–6 weeks. A headless CMS build: 6–10 weeks. A large multi-site or migration project: 3–4 months. Timelines depend on content volume and design complexity." },
];

/* ---------------- component ---------------- */

const CMS = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="min-h-screen bg-paper font-body">
      {/* ================= HERO ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                services / cms & headless websites
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Websites your team can update — without&nbsp;
                <span className="border-b-2 border-accent pb-0.5">breaking things</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                We build sites on WordPress, Sanity, Contentful, Strapi, or
                Webflow — with editor experiences your team actually enjoys
                using and frontends that load in under a second.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent">
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate("/cases")} className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink">
                  See case studies
                </button>
              </div>
            </div>

            <aside className="border border-line bg-white">
              <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/cms</span>
                <span>overview</span>
              </div>
              <dl className="divide-y divide-line">
                {[
                  ["Timeline",  "4 – 16 weeks"],
                  ["Platforms", "WordPress · Sanity · Contentful"],
                  ["Migrations", "Yes"],
                  ["Sites shipped", "20+"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex justify-between px-4 py-3">
                    <dt className="font-mono text-[0.74rem] text-graphite">{dt}</dt>
                    <dd className="font-display text-[0.95rem] text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-6 md:p-8 ${i !== 0 ? "md:border-l md:border-line" : ""} ${i === 1 ? "border-l border-line md:border-l" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}>
                <div className="font-display text-[clamp(1.75rem,1.2rem+1.5vw,2.4rem)] font-medium tracking-tight text-ink">{s.value}</div>
                <div className="mt-1 max-w-[24ch] font-mono text-[0.72rem] leading-relaxed text-graphite">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                capabilities
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">What we build.</h2>
            </div>
            <p className="max-w-[36ch] text-graphite">CMS strategy, design, build, migration, and editor training — one team from selection to launch.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  className="flex flex-col border-b border-r border-line bg-white p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.72rem] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-display text-[1.25rem] font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-graphite">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-baseline gap-2 text-[0.86rem] text-ink">
                        <span className="font-mono text-[0.7rem] text-accent">·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {s.technologies.map((t) => (
                      <span key={t} className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite">{t}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TECH ROW ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14 md:py-16">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
            <span className="inline-block h-px w-3.5 bg-accent" />
            stack we work in
          </span>
          <div className="mt-8 flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span key={t} className="border border-line-strong bg-white px-3 py-1.5 font-mono text-[0.78rem] text-ink">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                how we work
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Six stages, one continuous line.</h2>
            </div>
            <p className="max-w-[34ch] text-graphite">Structured process that puts editor UX at the centre — not as an afterthought.</p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="border-t-2 border-ink py-6 pr-6">
                  <div className="flex items-center justify-between font-mono text-[0.72rem]">
                    <span className="text-accent">{step.step}</span>
                    <span className="text-faint">{step.duration}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Icon className="h-4 w-4 text-ink" strokeWidth={1.6} />
                    <h3 className="font-display text-[1.1rem] font-medium text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                what you get
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Sites your team owns.</h2>
            </div>
            <p className="max-w-[32ch] text-graphite">The measurable outcomes clients see when the CMS is picked carefully and built properly.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="border-b border-r border-line bg-white p-7">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-[1.15rem] font-medium text-ink">{b.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite">{b.description}</p>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-[0.72rem] text-accent">→ {b.metric}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              selected work
            </span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Where we've shipped CMS sites.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_1fr]">
            <ul className="border border-line bg-white">
              {caseStudies.map((c, i) => (
                <li key={c.title}>
                  <button
                    onClick={() => setActiveCase(i)}
                    className={`flex w-full items-baseline gap-3 border-b border-line px-4 py-4 text-left transition last:border-b-0 ${activeCase === i ? "bg-accent/5" : "hover:bg-paper"}`}
                  >
                    <span className={`font-mono text-[0.72rem] ${activeCase === i ? "text-accent" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[0.95rem] font-medium text-ink">{c.industry}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeCase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border border-line bg-white p-8"
              >
                <span className="font-mono text-[0.72rem] text-accent">{caseStudies[activeCase].industry}</span>
                <h3 className="mt-3 font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-medium tracking-tight text-ink">{caseStudies[activeCase].title}</h3>

                <dl className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
                  {[
                    ["challenge", caseStudies[activeCase].challenge],
                    ["solution",  caseStudies[activeCase].solution],
                    ["results",   caseStudies[activeCase].results],
                  ].map(([label, text]) => (
                    <div key={label}>
                      <dt className="font-mono text-[0.7rem] text-faint">{label}</dt>
                      <dd className={`mt-2 text-[0.9rem] leading-relaxed ${label === "results" ? "text-ink" : "text-graphite"}`}>{text}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {caseStudies[activeCase].technologies.map((t) => (
                    <span key={t} className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite">{t}</span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                questions
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium leading-tight tracking-tight text-ink">What editors and marketers ask.</h2>
              <p className="mt-4 max-w-[34ch] text-graphite">
                Missing something? <button onClick={() => navigate("/contact")} className="border-b border-accent text-ink transition hover:text-accent">Send us a note.</button>
              </p>
            </div>

            <div className="border-t border-line">
              {faqs.map((f, i) => {
                const open = openFAQ === i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <button onClick={() => setOpenFAQ(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left transition hover:text-accent" aria-expanded={open}>
                      <span className="flex items-baseline gap-4">
                        <span className={`font-mono text-[0.72rem] ${open ? "text-accent" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-display text-[1.02rem] font-medium text-ink">{f.q}</span>
                      </span>
                      {open ? <Minus className="h-4 w-4 flex-none text-accent" /> : <Plus className="h-4 w-4 flex-none text-graphite" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <p className="max-w-[62ch] pb-6 pl-10 pr-6 text-[0.95rem] leading-relaxed text-graphite">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            start a project
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">Ready to pick the right CMS? Let's scope it.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 border border-paper bg-paper px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-white">
              Book a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate("/cases")} className="inline-flex items-center border border-[#3A3E48] px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-paper">
              See our work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CMS;