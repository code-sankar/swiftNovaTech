import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Search,
  Zap,
  Shield,
  Activity,
  Server,
  BarChart,
  CheckCircle,
  Users,
  Target,
  Rocket,
  RefreshCw,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

/* ---------------- data ---------------- */

const services = [
  {
    icon: Server,
    title: "Hosting & Monitoring",
    description: "Managed hosting with 24/7 uptime monitoring and instant alerts when something drifts.",
    features: ["Managed Hosting", "Uptime Monitoring", "Instant Alerts", "Regular Backups"],
    technologies: ["Vercel", "AWS", "Cloudflare", "UptimeRobot"],
  },
  {
    icon: Shield,
    title: "Security Updates",
    description: "Framework updates, security patches, and vulnerability scans to keep your site protected.",
    features: ["Patch Management", "Vulnerability Scans", "SSL Renewal", "Malware Removal"],
    technologies: ["Wordfence", "Sucuri", "Snyk", "OWASP"],
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description: "Ongoing work on Core Web Vitals — from image optimisation to code splitting to CDN tuning.",
    features: ["Core Web Vitals", "Image Optimisation", "Caching Strategy", "CDN Setup"],
    technologies: ["Lighthouse", "Cloudflare", "ImageKit", "Redis"],
  },
  {
    icon: Search,
    title: "SEO Optimisation",
    description: "Technical SEO, on-page work, structured data, and content strategy that moves rankings.",
    features: ["Technical SEO", "On-page SEO", "Schema Markup", "Content Strategy"],
    technologies: ["Ahrefs", "Semrush", "Search Console", "GSC"],
  },
  {
    icon: RefreshCw,
    title: "Content & Feature Updates",
    description: "Ongoing content updates, new landing pages, and small features shipped without a full rebuild.",
    features: ["Content Updates", "Landing Pages", "New Features", "A/B Tests"],
    technologies: ["Sanity", "Contentful", "WordPress"],
  },
  {
    icon: BarChart,
    title: "Analytics & Reporting",
    description: "Set up GA4, Search Console, and dashboards — then monthly reports that show what's actually working.",
    features: ["GA4 Setup", "Custom Dashboards", "Monthly Reports", "Conversion Tracking"],
    technologies: ["GA4", "GSC", "Looker Studio", "GTM"],
  },
];

const technologies = [
  "Vercel", "AWS", "Cloudflare", "GA4",
  "Search Console", "Lighthouse", "Ahrefs", "Semrush",
  "GTM", "Wordfence", "Sucuri", "UptimeRobot",
];

const processSteps = [
  { step: "01", title: "Audit",       description: "Baseline audit — performance, SEO, security, accessibility — to know exactly where you stand.",     duration: "1 week",    icon: Target },
  { step: "02", title: "Fix",         description: "Address the critical issues first — security patches, broken redirects, Core Web Vitals failures.",  duration: "2–4 weeks", icon: CheckCircle },
  { step: "03", title: "Optimise",    description: "Work on the compounding wins — SEO, page speed, conversion optimisation, and content quality.",     duration: "Ongoing",   icon: Zap },
  { step: "04", title: "Monitor",     description: "Uptime, security, performance, and rankings — all watched 24/7 with instant alerts.",                duration: "Ongoing",   icon: Activity },
  { step: "05", title: "Report",      description: "Monthly reports on what changed, what improved, and what we're doing next.",                        duration: "Monthly",   icon: BarChart },
  { step: "06", title: "Iterate",     description: "Small features, new landing pages, and continuous improvement — no big-bang rebuilds needed.",       duration: "Ongoing",   icon: RefreshCw },
];

const benefits = [
  { icon: Activity, title: "99.9% Uptime",           description: "Managed hosting, monitoring, and incident response keep your site up when it matters.",        metric: "99.9% uptime SLA" },
  { icon: Zap,      title: "Fast Pages",             description: "Ongoing performance tuning holds page loads under 2 seconds — even as content grows.",         metric: "Sub-2s load times" },
  { icon: Search,   title: "Rising Rankings",        description: "Technical SEO plus content strategy that consistently moves target keywords up the SERP.",     metric: "3× organic traffic avg" },
  { icon: Shield,   title: "Always Secure",          description: "Framework updates, security patches, and vulnerability scans — before breaches, not after.",   metric: "Zero breaches" },
  { icon: BarChart, title: "Clear Reporting",        description: "You always know what changed, what improved, and what we're doing next — no black box.",      metric: "Monthly reports" },
  { icon: Users,    title: "Human Support",          description: "A real developer on the other end of Slack or email — not a ticket queue.",                    metric: "24h response" },
];

const stats = [
  { value: "53%",   label: "of visitors leave sites that take 3s+ to load" },
  { value: "68%",   label: "of online experiences begin with a search engine" },
  { value: "$4.5M", label: "average cost of a website security breach" },
  { value: "3×",    label: "more organic traffic on well-maintained sites" },
];

const caseStudies = [
  {
    title: "SEO Rank Recovery",
    industry: "B2B SaaS",
    challenge: "Traffic dropped 40% after a Google core update — no clear diagnosis, no plan.",
    solution: "Technical SEO audit, content quality work, structured data, and ongoing on-page optimisation.",
    results: "Traffic recovered in 90 days, then grew 60% above pre-drop levels within six months.",
    technologies: ["Ahrefs", "GSC", "Schema.org"],
  },
  {
    title: "Core Web Vitals Rescue",
    industry: "Publisher",
    challenge: "Poor Core Web Vitals scores hurting rankings — LCP 6.2s, CLS 0.35, INP 400ms.",
    solution: "Image optimisation, code splitting, third-party audit, and edge caching setup.",
    results: "LCP 1.8s, CLS 0.02, INP 120ms — all green in 4 weeks, rankings recovered in 8.",
    technologies: ["Cloudflare", "Lighthouse", "ImageKit"],
  },
  {
    title: "Security & Hosting Overhaul",
    industry: "E-commerce",
    challenge: "Legacy WordPress on shared hosting — outdated plugins, no backups, security warnings.",
    solution: "Migrated to managed hosting, patched everything, set up backups, monitoring, and a WAF.",
    results: "Zero downtime since migration, 5× faster admin, security warnings cleared.",
    technologies: ["Vercel", "Cloudflare WAF", "Sucuri"],
  },
];

const faqs = [
  { q: "What does a maintenance retainer typically include?", a: "Managed hosting, uptime monitoring, security patches, framework updates, backups, small content and feature updates, monthly performance and SEO reports, and a direct line to a developer. Larger retainers include ongoing SEO work and new landing pages." },
  { q: "How fast do you respond to urgent issues?",           a: "Critical issues (site down, security incident) are handled within one hour, 24/7. Non-critical issues and updates typically within one business day. This is baked into every retainer, not an upsell." },
  { q: "Do you work on websites you didn't build?",           a: "Yes. We take over maintenance for sites built by other agencies or in-house teams. We start with a full audit and fix critical issues first, then move to ongoing optimisation. No judgement on how it was built — we just make it better." },
  { q: "How much does website maintenance cost?",             a: "Monthly retainers start at a fixed base rate for hosting, monitoring, and updates. Ongoing SEO work and feature builds are added on based on scope. We'll quote precisely after an audit — no surprise bills." },
];

/* ---------------- component ---------------- */

const Maintenance = () => {
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
                services / maintenance & seo
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Keep your website fast, secure, and&nbsp;
                <span className="border-b-2 border-accent pb-0.5">ranking</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                Ongoing hosting, security, performance, and SEO — with a real
                developer on the other end of Slack. We look after sites we
                built and sites we didn't.
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
                <span>~/maintenance</span>
                <span>overview</span>
              </div>
              <dl className="divide-y divide-line">
                {[
                  ["Response",   "Within 24h · 1h critical"],
                  ["Uptime SLA", "99.9%"],
                  ["Reports",    "Monthly"],
                  ["Sites managed", "35+"],
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
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">What we look after.</h2>
            </div>
            <p className="max-w-[36ch] text-graphite">Everything a live website needs to stay fast, safe, and found — bundled into one predictable retainer.</p>
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
            tools we work in
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
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Six-step ongoing loop.</h2>
            </div>
            <p className="max-w-[34ch] text-graphite">Not a one-off project — a continuous cycle of audit, fix, improve, and report.</p>
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
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">A website that just works.</h2>
            </div>
            <p className="max-w-[32ch] text-graphite">The compounding wins from treating a site like a living product, not a one-off delivery.</p>
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
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Where ongoing work moved the needle.</h2>
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
              <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium leading-tight tracking-tight text-ink">What owners usually ask.</h2>
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
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">Want your site properly looked after? Let's talk.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 border border-paper bg-paper px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-white">
              Book a free audit
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

export default Maintenance;