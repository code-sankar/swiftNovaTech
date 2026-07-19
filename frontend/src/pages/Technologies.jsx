import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Server,
  ShoppingCart,
  Database,
  Gauge,
  ArrowRight,
  CheckCircle,
  Smartphone,
} from "lucide-react";

/* ─── data ───────────────────────────────────────────────────── */

const techStack = [
  {
    category: "Frontend",
    icon: Code2,
    description:
      "Fast, responsive, accessible interfaces — the layer your visitors actually see and feel.",
    features: ["SSR / SSG", "PWA", "SEO-ready", "Performance Tuning"],
    technologies: [
      { name: "React",        level: "Expert",       projects: 30 },
      { name: "Next.js",      level: "Expert",       projects: 22 },
      { name: "Vue.js",       level: "Advanced",     projects: 12 },
      { name: "Angular",      level: "Advanced",     projects: 12 },
      { name: "TypeScript",   level: "Expert",       projects: 26 },
      { name: "Tailwind CSS", level: "Expert",       projects: 28 },
      { name: "Astro",        level: "Advanced",     projects: 9  },
    ],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    description:
      "Reliable server-side logic and clean APIs that power the sites and apps we build.",
    features: ["REST APIs", "GraphQL", "Auth", "Integrations"],
    technologies: [
      { name: "Node.js",     level: "Expert",       projects: 27 },
      { name: "Express",     level: "Expert",       projects: 24 },
      { name: "Python",      level: "Advanced",     projects: 14 },
      { name: "Django",      level: "Advanced",     projects: 14 },
      { name: "Java",        level: "Expert",       projects: 14 },
      { name: "Spring Boot", level: "Expert",       projects: 14 },
      { name: "FastAPI",     level: "Advanced",     projects: 9  },
      { name: "GraphQL",     level: "Advanced",     projects: 11 },
      { name: "REST",        level: "Expert",       projects: 30 },
    ],
  },
  {
    category: "CMS & E-commerce",
    icon: ShoppingCart,
    description:
      "Editor-friendly content and storefronts your team can run without touching code.",
    features: ["Headless CMS", "Online Stores", "Payments", "Content Modelling"],
    technologies: [
      { name: "WordPress",   level: "Expert",       projects: 18 },
      { name: "Shopify",     level: "Advanced",     projects: 12 },
      { name: "WooCommerce", level: "Advanced",     projects: 10 },
      { name: "Sanity",      level: "Advanced",     projects: 8  },
      { name: "Strapi",      level: "Advanced",     projects: 7  },
      { name: "Contentful",  level: "Intermediate", projects: 5  },
    ],
  },
  {
    category: "Databases & Hosting",
    icon: Database,
    description:
      "Where your data lives and how your site ships — chosen for reliability, not hype.",
    features: ["SQL & NoSQL", "Managed Hosting", "CI/CD", "Backups"],
    technologies: [
      { name: "PostgreSQL", level: "Advanced", projects: 16 },
      { name: "MongoDB",    level: "Advanced", projects: 14 },
      { name: "Supabase",   level: "Advanced", projects: 9  },
      { name: "Vercel",     level: "Expert",   projects: 24 },
      { name: "Netlify",    level: "Advanced", projects: 12 },
      { name: "Render",     level: "Advanced", projects: 12 },
      { name: "Cloudflare", level: "Advanced", projects: 15 },
    ],
  },
  {
    category: "Performance & SEO",
    icon: Gauge,
    description:
      "The work that makes a site fast, discoverable, and easy to maintain after launch.",
    features: ["Core Web Vitals", "Technical SEO", "Analytics", "Accessibility"],
    technologies: [
      { name: "Lighthouse",       level: "Expert",       projects: 30 },
      { name: "Core Web Vitals",  level: "Expert",       projects: 28 },
      { name: "Google Analytics", level: "Advanced",     projects: 22 },
      { name: "Search Console",   level: "Advanced",     projects: 20 },
      { name: "Schema / SEO",     level: "Advanced",     projects: 18 },
      { name: "GTM",              level: "Intermediate", projects: 10 },
    ],
  },
  {
    category: "Android & Mobile Apps",
    icon: Smartphone,
    description:
      "Native and cross-platform mobile applications that deliver a seamless user experience on both Android and iOS.",
    features: ["Native Android/iOS", "Cross-Platform", "Push Notifications", "Offline Support"],
    technologies: [
      { name: "Android Studio", level: "Expert",       projects: 10 },
      { name: "Java",           level: "Expert",       projects: 8 },
      { name: "Kotlin",         level: "Advanced",     projects: 6 },
      { name: "Flutter",        level: "Advanced",     projects: 5 },
      { name: "React Native",   level: "Intermediate", projects: 3 },
    ],
  },
];

// Curated architectural anchor core stack for the Hero preview panel
const featuredCoreStack = [
  { name: "React", category: "Frontend", count: "30+ Apps" },
  { name: "Next.js", category: "Frontend", count: "22+ SSR" },
  { name: "Node.js", category: "Backend", count: "27+ APIs" },
  { name: "MongoDB", category: "Database", count: "14+ DBs" },
  { name: "Shopify", category: "E-Commerce", count: "12+ Stores" },
  { name: "Vercel", category: "DevOps", count: "24+ Ships" },
];

const levelOrder = { Expert: 0, Advanced: 1, Intermediate: 2 };

/* ─── component ──────────────────────────────────────────────── */

const Technologies = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const active = techStack[selected];
  const Icon = active.icon;

  return (
    <div className="min-h-screen bg-paper font-body">

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1.05fr] lg:items-center">
            
            {/* Left Content Column */}
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                our technology stack
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                The tools we use to ship{" "}
                <span className="border-b-2 border-accent pb-0.5">production software</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                We choose technologies based on what the project actually
                needs — not trends. Six disciplines, 50+ tools, all applied
                with the same standard of engineering rigour.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/contact")}
                  className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate("/cases")}
                  className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink"
                >
                  See case studies
                </button>
              </div>
            </div>

            {/* Right Column: Redesigned Dynamic Tech Matrix Panel */}
            <aside className="border border-line bg-white shadow-sm">
              <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/production-stack</span>
                <span>matrix_grid</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-line border-b border-line">
                {featuredCoreStack.map((tech, idx) => (
                  <div 
                    key={tech.name} 
                    className={`group flex flex-col justify-between p-4 bg-white hover:bg-accent/[0.02] transition-colors duration-200
                      ${idx < 3 ? 'pt-4' : 'border-t border-line'} 
                      ${idx % 3 === 0 ? '' : 'border-l border-line'}
                    `}
                  >
                    <div>
                      <span className="block font-mono text-[0.62rem] text-faint uppercase tracking-wider mb-1">
                        {tech.category}
                      </span>
                      <span className="font-display text-[1.1rem] font-medium text-ink group-hover:text-accent transition-colors">
                        {tech.name}
                      </span>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-mono text-[0.68rem] px-2 py-0.5 bg-paper rounded border border-line text-graphite group-hover:border-accent/30 group-hover:text-accent transition-all">
                        {tech.count}
                      </span>
                      <ArrowRight className="h-3 w-3 text-faint opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Aggregated Footer Stack Status Bar */}
              <div className="p-4 bg-paper/60 flex items-center justify-between font-mono text-[0.7rem] text-graphite">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Production Ready Engine
                </span>
                <span>50+ Core Dependencies Total</span>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ══════════ CATEGORY NAV + DETAIL ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">

          <div className="mb-10">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              by discipline
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr]">

            {/* Category Index Sidebar */}
            <ul className="border border-line bg-white divide-y divide-line h-fit">
              {techStack.map((stack, i) => {
                const CatIcon = stack.icon;
                return (
                  <li key={stack.category}>
                    <button
                      onClick={() => setSelected(i)}
                      className={`flex w-full items-center gap-3 px-4 py-4 text-left transition ${
                        selected === i ? "bg-accent/5" : "hover:bg-paper"
                      }`}
                    >
                      <CatIcon
                        className={`h-4 w-4 flex-none ${selected === i ? "text-accent" : "text-faint"}`}
                        strokeWidth={1.6}
                      />
                      <span className="font-display text-[0.95rem] font-medium text-ink">
                        {stack.category}
                      </span>
                      <span className="ml-auto font-mono text-[0.68rem] text-faint">
                        {stack.technologies.length}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="border border-line bg-white"
              >
                {/* Panel Header */}
                <div className="flex items-center gap-4 border-b border-line px-6 py-5">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  <div>
                    <h2 className="font-display text-[1.25rem] font-medium text-ink">
                      {active.category}
                    </h2>
                    <p className="mt-0.5 max-w-[52ch] text-[0.88rem] text-graphite">
                      {active.description}
                    </p>
                  </div>
                </div>

                {/* Features Row */}
                <div className="flex flex-wrap gap-1.5 border-b border-line px-6 py-4">
                  {active.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 border border-accent/40 bg-accent/5 px-2.5 py-0.5 font-mono text-[0.68rem] text-accent"
                    >
                      <CheckCircle className="h-3 w-3" strokeWidth={2} />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Tech Inner Matrix Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-line border-t-0">
                  {[...active.technologies]
                    .sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
                    .map((tech, i) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="flex flex-col border-line p-5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-[0.97rem] font-medium text-ink">
                            {tech.name}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span
                            className={`font-mono text-[0.68rem] ${
                              tech.level === "Expert"
                                ? "text-accent"
                                : tech.level === "Advanced"
                                ? "text-graphite"
                                : "text-faint"
                            }`}
                          >
                            {tech.level.toLowerCase()}
                          </span>
                        </div>

                        {/* Proficiency Metric Bar */}
                        <div className="mt-3 h-[2px] w-full bg-line">
                          <div
                            className="h-full bg-accent"
                            style={{
                              width:
                                tech.level === "Expert"
                                  ? "100%"
                                  : tech.level === "Advanced"
                                  ? "72%"
                                  : "44%",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════ FLAT MATRIX FOOTER ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14 md:py-16">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
            <span className="inline-block h-px w-3.5 bg-accent" />
            full stack at a glance
          </span>
          <div className="mt-8 flex flex-wrap gap-2">
            {techStack.flatMap((s) => s.technologies).map((t) => (
              <span
                key={`${t.name}-flat`}
                className="border border-line-strong bg-white px-3 py-1.5 font-mono text-[0.75rem] text-ink hover:border-accent transition-colors duration-150 cursor-default"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CALL TO ACTION ══════════ */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            start a project
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">
            Ready to build something with the right tools?
          </h2>
          <p className="mt-4 max-w-[48ch] text-[#9AA0AC]">
            Tell us what you're building and we'll recommend the stack — not
            the one we prefer, the one your project actually needs.
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
              onClick={() => navigate("/cases")}
              className="inline-flex items-center border border-[#3A3E48] px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-paper"
            >
              View case studies
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Technologies;