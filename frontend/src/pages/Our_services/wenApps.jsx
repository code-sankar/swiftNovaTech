import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Cloud,
  Users,
  Lock,
  Code,
  BarChart,
  Zap,
  CheckCircle,
  Target,
  Rocket,
  Shield,
  Database,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

/* ---------------- data ---------------- */

const services = [
  {
    icon: LayoutDashboard,
    title: "SaaS Products",
    description: "End-to-end SaaS builds — from onboarding and billing to feature flags and admin tooling.",
    features: ["Multi-tenant Auth", "Stripe Billing", "Feature Flags", "Admin Panels"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    icon: Users,
    title: "Customer Portals",
    description: "Self-serve portals where your customers manage accounts, orders, subscriptions, and support.",
    features: ["Account Management", "Role-based Access", "Notifications", "Support Ticketing"],
    technologies: ["React", "Node.js", "Auth0", "Intercom"],
  },
  {
    icon: BarChart,
    title: "Dashboards & Analytics",
    description: "Real-time dashboards that turn raw data into decisions your team can act on.",
    features: ["Real-time Data", "Custom Charts", "Exports", "Alerts"],
    technologies: ["React", "D3", "Recharts", "WebSockets"],
  },
  {
    icon: Code,
    title: "Internal Tools",
    description: "Custom internal tools that replace spreadsheet chaos and stitched-together SaaS.",
    features: ["Workflow Automation", "Data Entry", "Reporting", "Team Access"],
    technologies: ["Next.js", "Node.js", "Postgres", "Retool"],
  },
  {
    icon: Cloud,
    title: "APIs & Integrations",
    description: "RESTful and GraphQL APIs plus integrations with the tools your business already runs on.",
    features: ["REST / GraphQL", "Webhooks", "OAuth", "Third-party SDKs"],
    technologies: ["Node.js", "GraphQL", "REST", "OAuth 2.0"],
  },
  {
    icon: Lock,
    title: "Auth & Multi-tenancy",
    description: "Secure authentication, workspace isolation, and permission systems built for scale.",
    features: ["SSO / SAML", "RBAC", "Tenant Isolation", "Audit Logs"],
    technologies: ["Auth0", "Clerk", "NextAuth", "JWT"],
  },
];

const technologies = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Prisma", "Stripe", "Redis",
  "Auth0", "Vercel", "AWS", "Docker",
];

const processSteps = [
  { step: "01", title: "Discovery & Product Scope", description: "Understand users, workflows, and business logic before a line of code is written.", duration: "1–2 weeks", icon: Target },
  { step: "02", title: "Architecture & Design",     description: "Data model, auth flow, integrations, and interface designs mapped out together.",     duration: "2–3 weeks", icon: LayoutDashboard },
  { step: "03", title: "Build",                     description: "Weekly demos, working software each sprint — you see progress, not just Slack updates.", duration: "6–20 weeks", icon: Code },
  { step: "04", title: "Testing & Hardening",       description: "Unit, integration, and load tests, plus a security review before you ever go live.",   duration: "1–2 weeks", icon: CheckCircle },
  { step: "05", title: "Launch",                    description: "Zero-downtime deployment, monitoring set up, on-call for launch week.",                  duration: "1 week",    icon: Rocket },
  { step: "06", title: "Iterate & Support",         description: "Feature work, bug fixes, and infra scaling as your usage grows.",                       duration: "Ongoing",   icon: Shield },
];

const benefits = [
  { icon: Zap,             title: "Fast & Responsive",   description: "Optimised bundles and edge rendering keep dashboards fast even at scale.",             metric: "Sub-2s load times" },
  { icon: Shield,          title: "Enterprise-Ready",    description: "SSO, RBAC, audit logs, and data-isolation built in — not bolted on later.",            metric: "SOC 2-ready patterns" },
  { icon: Cloud,           title: "Scales With You",     description: "Cloud-native architecture that grows from 10 users to 10,000 without a rewrite.",     metric: "Scale-tested" },
  { icon: BarChart,        title: "Data You Can Trust",  description: "Reliable data pipelines and dashboards your team actually opens each morning.",       metric: "Real-time updates" },
  { icon: Lock,            title: "Secure by Default",   description: "Encryption at rest and in transit, secure auth, and regular vulnerability scans.",    metric: "OWASP-aligned" },
  { icon: LayoutDashboard, title: "Great DX for Ops",    description: "Admin dashboards and internal tooling for your team, not just for end-users.",         metric: "Fewer support tickets" },
];

const stats = [
  { value: "$266B", label: "global SaaS market size in 2025" },
  { value: "18%",   label: "average annual SaaS market growth" },
  { value: "70%",   label: "of business software is now SaaS" },
  { value: "3.7×",  label: "faster development with modern stacks" },
];

const caseStudies = [
  {
    title: "Multi-tenant SaaS Launch",
    industry: "SaaS",
    challenge: "Founder with a validated idea, no engineering team, six months to first paying customer.",
    solution: "End-to-end SaaS build — auth, billing, admin, and product surface — on Next.js and Stripe.",
    results: "MVP live in 14 weeks, first paying customer in month four, $10K MRR by month six.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    title: "Internal Operations Tool",
    industry: "Logistics",
    challenge: "Operations team running the business across 12 spreadsheets and a legacy Access DB.",
    solution: "Custom internal tool replacing spreadsheets with a single source of truth and workflow automation.",
    results: "40% less time on data entry, 60% faster reporting, one tool instead of twelve.",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
  },
  {
    title: "Customer Self-serve Portal",
    industry: "B2B Services",
    challenge: "Customers emailing support for every change — quotes, invoices, account updates.",
    solution: "Self-serve customer portal with account management, live quotes, and integrated billing.",
    results: "70% drop in inbound support tickets, 3× faster quote turnaround.",
    technologies: ["React", "Node.js", "Auth0"],
  },
];

const faqs = [
  { q: "What's the difference between a website and a web app?",             a: "A website is mostly informational — pages people read. A web app is interactive — users log in, do work, and change data. If your product needs accounts, dashboards, or workflows, you need a web app." },
  { q: "How long does it take to build a SaaS product?",                    a: "A focused MVP: 12–16 weeks. A production-ready v1: 4–6 months. A mature multi-tenant SaaS: 6–12 months. We ship incrementally so you have something usable early and grow from there." },
  { q: "Do you handle scaling and infrastructure?",                          a: "Yes. We deploy on Vercel, AWS, or your cloud of choice, set up monitoring and alerting, and design the architecture to handle growth without a rewrite. Ongoing scaling is part of maintenance retainers." },
  { q: "Can you build on top of an existing codebase?",                     a: "Yes. We regularly extend, refactor, or rescue existing web apps — audit first, then a plan. We're upfront if we think a rewrite is cheaper than a rescue." },
];

/* ---------------- component ---------------- */

const WebApps = () => {
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
                services / web applications & saas
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Complex web apps, engineered to&nbsp;
                <span className="border-b-2 border-accent pb-0.5">scale</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                We design and build SaaS products, customer portals, internal
                tools, and dashboards — with the auth, billing, and
                infrastructure to keep them running as you grow.
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
                <span>~/web-apps</span>
                <span>overview</span>
              </div>
              <dl className="divide-y divide-line">
                {[
                  ["Timeline",  "12 weeks – 12 months"],
                  ["Team size", "3–6 engineers"],
                  ["Stack",     "Next.js · Node · Postgres"],
                  ["Apps shipped", "18+"],
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
            <p className="max-w-[36ch] text-graphite">Full-stack web app coverage — frontend, backend, auth, infra — one team, no hand-offs.</p>
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
            <p className="max-w-[34ch] text-graphite">Agile sprints with a working build every week — no big-bang reveals at the end.</p>
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
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Apps that hold up in production.</h2>
            </div>
            <p className="max-w-[32ch] text-graphite">The things we optimise for on every build — and the numbers we hold ourselves to.</p>
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
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Where we've shipped web apps.</h2>
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
              <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium leading-tight tracking-tight text-ink">What founders usually ask.</h2>
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
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">Have a web app in mind? Let's scope it.</h2>
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

export default WebApps;