import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  BarChart,
  Zap,
  DollarSign,
  Heart,
  ArrowRight,
  Plus,
  Minus,
  Filter,
} from "lucide-react";

/* ─── data ───────────────────────────────────────────────────── */

const metrics = [
  { icon: BarChart, value: "30+", label: "websites shipped" },
  { icon: Zap,      value: "60%", label: "avg. faster load times" },
  { icon: Users,    value: "6",   label: "countries served" },
  { icon: Heart,    value: "95%", label: "client satisfaction" },
];

const industries = ["All", "Retail", "Healthcare", "Finance", "Education", "Logistics", "Technology"];

const caseStudies = [
  {
    title: "E-commerce Storefront Rebuild",
    client: "DTC Fashion Brand", // TODO: real/approved client name
    industry: "Retail",
    duration: "10 weeks",
    team: "3 members",
    challenge:
      "Low mobile conversion, a slow product catalogue, and a clunky multi-step checkout driving cart abandonment.",
    solution:
      "Headless storefront rebuilt mobile-first on Shopify, with a strict performance budget and a streamlined one-page checkout.",
    results:
      "38% higher mobile conversion, load time cut from 2.6s to 0.8s, 24% drop in cart abandonment.",
    technologies: ["Next.js", "Shopify", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Clinic Website & Patient Portal",
    client: "Multi-site Clinic", // TODO
    industry: "Healthcare",
    duration: "12 weeks",
    team: "3 members",
    challenge:
      "An outdated site with no online booking and poor accessibility, pushing every enquiry to the phone lines.",
    solution:
      "Accessible marketing site plus a secure appointment-booking portal, built to WCAG 2.1 AA from the ground up.",
    results:
      "3× online bookings, full WCAG 2.1 AA compliance, 40% fewer phone enquiries.",
    technologies: ["React", "Node.js", "PostgreSQL", "Netlify"],
  },
  {
    title: "Fintech Marketing Site & Web Dashboard",
    client: "Financial SaaS Startup", // TODO
    industry: "Finance",
    duration: "11 weeks",
    team: "4 members",
    challenge:
      "A confusing product site with weak trial sign-ups and no self-serve customer dashboard.",
    solution:
      "Conversion-focused marketing site paired with a customer web dashboard — authentication, and clear data visualisation.",
    results:
      "52% more trial sign-ups, 30% lower bounce rate, noticeably faster onboarding.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Recharts"],
  },
  {
    title: "Online Course Platform",
    client: "E-learning Startup", // TODO
    industry: "Education",
    duration: "14 weeks",
    team: "4 members",
    challenge:
      "Low course completion, high drop-off, and content that was painfully slow to update and scale.",
    solution:
      "Headless-CMS-driven course platform with multi-language support and fast, cached content delivery.",
    results:
      "2× course completion, content shipped in 4 languages, 60% higher engagement.",
    technologies: ["Vue.js", "Strapi", "MySQL", "Cloudflare"],
  },
  {
    title: "Logistics Client Portal",
    client: "Freight Company", // TODO
    industry: "Logistics",
    duration: "9 weeks",
    team: "3 members",
    challenge:
      "Customers phoning in for shipment status because there was no self-serve way to track anything.",
    solution:
      "Web customer portal with live shipment tracking, document downloads, and email notifications.",
    results:
      "45% fewer status calls, self-serve tracking available to 100% of clients.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    title: "SaaS Marketing Site & Docs",
    client: "B2B SaaS Company", // TODO
    industry: "Technology",
    duration: "8 weeks",
    team: "2 members",
    challenge:
      "A slow marketing site the team couldn't update without a developer, and documentation scattered across tools.",
    solution:
      "Fast Astro marketing site plus a headless CMS so marketing can publish without touching code, with integrated docs.",
    results:
      "70% faster pages, non-dev publishing workflow, improved organic search rankings.",
    technologies: ["Astro", "Sanity", "Tailwind CSS", "Vercel"],
  },
];
/* ─── component ──────────────────────────────────────────────── */

const CaseStudies = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedStudy, setExpandedStudy] = useState(null);

  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((s) => s.industry === activeFilter);

  return (
    <div className="min-h-screen bg-paper font-body">

      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                portfolio / case studies
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Real projects. Measurable{" "}
                <span className="border-b-2 border-accent pb-0.5">results</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                Six industries, six different problems — one consistent
                outcome. Browse how we've helped companies from retail to
                logistics ship software that moved the needle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
                >
                  Start your project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate("/web")}
                  className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink"
                >
                  View all services
                </button>
              </div>
            </div>

            {/* summary panel */}
            <aside className="border border-line bg-white">
              <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/impact</span>
                <span>aggregate</span>
              </div>
              <dl className="divide-y divide-line">
                {metrics.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-graphite" strokeWidth={1.6} />
                      <dt className="font-mono text-[0.74rem] text-graphite">{label}</dt>
                    </div>
                    <dd className="font-display text-[1.1rem] font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ FILTER + GRID ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-12 md:py-16">

          {/* filter row */}
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-faint">
              <Filter className="h-3.5 w-3.5" />
              filter
            </span>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => {
                    setActiveFilter(ind);
                    setExpandedStudy(null);
                  }}
                  className={`relative pb-0.5 font-mono text-[0.78rem] transition ${
                    activeFilter === ind
                      ? "text-ink"
                      : "text-faint hover:text-graphite"
                  }`}
                >
                  {ind}
                  {activeFilter === ind && (
                    <span className="absolute -bottom-px left-0 h-[1.5px] w-full bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-line bg-white px-8 py-16 text-center"
              >
                <p className="font-mono text-[0.82rem] text-faint">
                  No case studies found for this filter.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 border-l border-t border-line md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((study, i) => {
                  const expanded = expandedStudy === i;
                  return (
                    <article
                      key={study.title}
                      className="flex flex-col border-b border-r border-line bg-white"
                    >
                      {/* card header */}
                      <div className="p-7 pb-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[0.72rem] text-accent">
                            {study.industry}
                          </span>
                          <span className="font-mono text-[0.68rem] text-faint">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-[1.2rem] font-medium leading-snug text-ink">
                          {study.title}
                        </h2>
                        <p className="mt-1 font-mono text-[0.72rem] text-faint">
                          {study.client}
                        </p>

                        <div className="mt-4 flex gap-5 font-mono text-[0.72rem] text-graphite">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" strokeWidth={1.6} />
                            {study.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" strokeWidth={1.6} />
                            {study.team}
                          </span>
                        </div>

                        {/* challenge (always visible) */}
                        <div className="mt-5 border-t border-line pt-5">
                          <p className="font-mono text-[0.68rem] text-faint">challenge</p>
                          <p className="mt-1.5 text-[0.88rem] leading-relaxed text-graphite">
                            {study.challenge}
                          </p>
                        </div>
                      </div>

                      {/* expandable detail */}
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 px-7 pt-4">
                              <div>
                                <p className="font-mono text-[0.68rem] text-faint">solution</p>
                                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-graphite">
                                  {study.solution}
                                </p>
                              </div>
                              <div>
                                <p className="font-mono text-[0.68rem] text-faint">results</p>
                                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink">
                                  {study.results}
                                </p>
                              </div>
                              <div className="pb-2">
                                <p className="font-mono text-[0.68rem] text-faint">stack</p>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {study.technologies.map((t) => (
                                    <span
                                      key={t}
                                      className="border border-line-strong px-2 py-0.5 font-mono text-[0.67rem] text-graphite"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* toggle */}
                      <button
                        onClick={() => setExpandedStudy(expanded ? null : i)}
                        className="mt-auto flex items-center gap-2 border-t border-line px-7 py-4 font-mono text-[0.74rem] text-graphite transition hover:text-accent"
                        aria-expanded={expanded}
                      >
                        {expanded
                          ? <><Minus className="h-3.5 w-3.5" /> Show less</>
                          : <><Plus  className="h-3.5 w-3.5" /> Read full case study</>
                        }
                      </button>
                    </article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            write your own
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">
            Ready to create your own success story?
          </h2>
          <p className="mt-4 max-w-[48ch] text-[#9AA0AC]">
            Let's talk about what you're building and how we can help you reach
            results worth writing a case study about.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 border border-paper bg-paper px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-white"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/web")}
              className="inline-flex items-center border border-[#3A3E48] px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-paper"
            >
              View all services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudies;