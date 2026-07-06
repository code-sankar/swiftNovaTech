import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ExternalLink, Filter } from "lucide-react";
import { projects, projectCategories, getFeatured } from "../../data/projects";

/* ─── data ────────────────────────────────────────────────── */

const stats = [
  { value: "30+", label: "websites shipped" },
  { value: "10+", label: "industries served" },
  { value: "6",   label: "countries reached" },
  { value: "95%", label: "client satisfaction" },
];

const featured = getFeatured();

/* ─── component ──────────────────────────────────────────────── */

const ClientProjects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <div className="min-h-screen bg-paper font-body">
      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                portfolio / client projects
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Websites we've shipped for teams like{" "}
                <span className="border-b-2 border-accent pb-0.5">yours</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                A selection of sites we've designed, built, and launched —
                across marketing sites, e-commerce stores, web apps, and CMS
                builds. Open any project to read the story, or head straight to
                the live site.
              </p>
            </div>

            <aside className="border border-line bg-white">
              <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/portfolio</span>
                <span>at a glance</span>
              </div>
              <div className="grid grid-cols-2">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`p-5 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line" : ""}`}
                  >
                    <div className="font-display text-[1.7rem] font-medium tracking-tight text-ink">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.68rem] text-graphite">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              featured project
            </span>
          </div>

          <div className="border border-line bg-white">
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              {/* left */}
              <div className="border-b border-line p-8 md:p-10 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3 font-mono text-[0.72rem]">
                  <span className="text-accent">{featured.category}</span>
                  <span className="text-faint">·</span>
                  <span className="text-faint">{featured.year}</span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium leading-tight tracking-tight text-ink">
                  <Link to={`/projects/${featured.slug}`} className="transition hover:text-accent">
                    {featured.name}
                  </Link>
                </h2>
                <p className="mt-1 font-mono text-[0.74rem] text-faint">
                  {featured.nda ? "Confidential client" : featured.client}
                </p>
                <p className="mt-5 max-w-[54ch] text-[1rem] leading-relaxed text-graphite">
                  {featured.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* right — outcome */}
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  <p className="font-mono text-[0.7rem] text-faint">outcome</p>
                  <p className="mt-3 font-display text-[1.3rem] font-medium leading-snug text-ink">
                    {featured.outcome}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to={`/projects/${featured.slug}`}
                    className="group inline-flex w-fit items-center gap-2 font-mono text-[0.8rem] text-ink transition hover:text-accent"
                  >
                    Read the full story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {featured.liveUrl && !featured.nda && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex w-fit items-center gap-2 font-mono text-[0.8rem] text-faint transition hover:text-accent"
                    >
                      Visit live site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FILTER + GRID ══════════ */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                all projects
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">
                Browse the full portfolio.
              </h2>
            </div>

            {/* filter */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-faint">
                <Filter className="h-3.5 w-3.5" />
                filter
              </span>
              {projectCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`relative pb-0.5 font-mono text-[0.78rem] transition ${
                    activeFilter === c
                      ? "text-ink"
                      : "text-faint hover:text-graphite"
                  }`}
                >
                  {c}
                  {activeFilter === c && (
                    <span className="absolute -bottom-px left-0 h-[1.5px] w-full bg-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 border-l border-t border-line md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col border-b border-r border-line bg-white p-7"
                >
                  <div className="flex items-center justify-between font-mono text-[0.72rem]">
                    <span className="text-accent">{p.category}</span>
                    <span className="text-faint">{p.year}</span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.2rem] font-medium leading-snug text-ink">
                    <Link to={`/projects/${p.slug}`} className="transition hover:text-accent">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1 font-mono text-[0.72rem] text-faint">
                    {p.nda ? "Confidential client" : p.client}
                  </p>

                  <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-graphite">
                    {p.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-line-strong px-2 py-0.5 font-mono text-[0.66rem] text-graphite"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-line pt-4 font-mono text-[0.72rem] text-accent">
                    → {p.outcome}
                  </div>

                  {/* actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="group/vp inline-flex items-center gap-1.5 font-mono text-[0.76rem] text-ink transition hover:text-accent"
                    >
                      View project
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/vp:translate-x-0.5" />
                    </Link>
                    {p.liveUrl && !p.nda && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[0.76rem] text-faint transition hover:text-accent"
                      >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.6} />
                        Visit site
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="border border-line bg-white px-8 py-16 text-center font-mono text-[0.82rem] text-faint">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            your project next
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">
            Want your site on this page next year?
          </h2>
          <p className="mt-4 max-w-[48ch] text-[#9AA0AC]">
            Tell us what you're building. The first conversation is free, and
            we'll be straight with you about scope, cost, and timeline.
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
              Read case studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientProjects;