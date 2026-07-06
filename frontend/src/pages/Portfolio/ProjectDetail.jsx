import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Quote,
} from "lucide-react";
import { projects, getProject } from "../../data/projects";

/* ─── image with graceful fallback ──────────────────────────────
   Screenshots live in public/projects/. Until a file is added, or
   if one fails to load, we show a tidy labelled placeholder instead
   of a broken image, so the layout always looks intentional. */
const CoverImage = ({ src, alt, className = "" }) => {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[repeating-linear-gradient(135deg,transparent,transparent_11px,rgba(0,0,0,0.035)_11px,rgba(0,0,0,0.035)_12px)] ${className}`}
      >
        <span className="font-mono text-[0.72rem] lowercase text-faint">
          screenshot coming soon
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
};

/* ─── component ─────────────────────────────────────────────── */

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);

  /* not found */
  if (!project) {
    return (
      <div className="min-h-screen bg-paper font-body">
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-5 py-24 sm:px-8 md:py-32 text-center">
            <span className="font-mono text-[0.72rem] lowercase text-faint">
              error / 404
            </span>
            <h1 className="mt-5 font-display text-[clamp(1.8rem,1.3rem+2vw,2.8rem)] font-medium tracking-tight text-ink">
              We couldn't find that project.
            </h1>
            <p className="mx-auto mt-4 max-w-[44ch] text-graphite">
              The link may be out of date, or the project has moved. Browse the
              full portfolio to find what you're after.
            </p>
            <button
              onClick={() => navigate("/projects")}
              className="group mt-8 inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* prev / next for footer nav */
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const clientLabel = project.nda ? "Confidential client" : project.client;
  const showLive = project.liveUrl && !project.nda;

  const story = [
    { label: "overview", body: project.overview },
    { label: "the challenge", body: project.challenge },
    { label: "our approach", body: project.approach },
    { label: "the solution", body: project.solution },
  ].filter((s) => s.body);

  return (
    <div className="min-h-screen bg-paper font-body">

      {/* ══════════ BREADCRUMB ══════════ */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-[1180px] items-center gap-2 px-5 py-4 font-mono text-[0.72rem] text-faint sm:px-8">
          <Link to="/projects" className="inline-flex items-center gap-1.5 transition hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" />
            all projects
          </Link>
          <span>/</span>
          <span className="text-graphite">{project.category.toLowerCase()}</span>
        </div>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 font-mono text-[0.72rem]">
              <span className="text-accent">{project.category}</span>
              <span className="text-faint">·</span>
              <span className="text-faint">{project.year}</span>
            </div>

            <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,1.3rem+3vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-ink">
              {project.name}
            </h1>
            <p className="mt-2 font-mono text-[0.78rem] text-faint">{clientLabel}</p>

            <p className="mt-6 max-w-[58ch] text-[clamp(1rem,0.98rem+0.4vw,1.15rem)] leading-[1.55] text-graphite">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {showLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
                >
                  <ExternalLink className="h-4 w-4" strokeWidth={1.6} />
                  Visit the live site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink"
                >
                  <Github className="h-4 w-4" strokeWidth={1.6} />
                  View repository
                </a>
              )}
              {project.nda && (
                <span className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.78rem] text-faint">
                  Live link withheld under NDA
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* cover image */}
        <div className="border-t border-line">
          <div className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 md:py-10">
            <div className="aspect-[16/9] w-full overflow-hidden border border-line bg-white">
              <CoverImage src={project.cover} alt={`${project.name} — screenshot`} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STORY + META ══════════ */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_0.9fr] lg:gap-16">

            {/* narrative */}
            <div className="space-y-10">
              {story.map((s) => (
                <div key={s.label}>
                  <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                    <span className="inline-block h-px w-3.5 bg-accent" />
                    {s.label}
                  </span>
                  <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-graphite">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            {/* meta sidebar */}
            <aside className="h-fit border border-line bg-white lg:sticky lg:top-24">
              <div className="border-b border-line px-6 py-4 font-mono text-[0.72rem] text-faint">
                project details
              </div>
              <dl className="divide-y divide-line">
                <div className="px-6 py-4">
                  <dt className="font-mono text-[0.68rem] text-faint">client</dt>
                  <dd className="mt-1 text-[0.92rem] text-ink">{clientLabel}</dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="font-mono text-[0.68rem] text-faint">category</dt>
                  <dd className="mt-1 text-[0.92rem] text-ink">{project.category}</dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="font-mono text-[0.68rem] text-faint">year</dt>
                  <dd className="mt-1 text-[0.92rem] text-ink">{project.year}</dd>
                </div>
                <div className="px-6 py-4">
                  <dt className="font-mono text-[0.68rem] text-faint">stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-line-strong px-2 py-0.5 font-mono text-[0.67rem] text-graphite"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                {showLive && (
                  <div className="px-6 py-4">
                    <dt className="font-mono text-[0.68rem] text-faint">live</dt>
                    <dd className="mt-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[0.9rem] text-ink underline decoration-line-strong underline-offset-4 transition hover:text-accent hover:decoration-accent"
                      >
                        {project.liveUrl.replace(/^https?:\/\//, "")}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════ RESULTS ══════════ */}
      {project.results?.length > 0 && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 md:py-16">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              outcomes
            </span>
            <div className="mt-8 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
              {project.results.map((r) => (
                <div key={r.label} className="border-b border-r border-line bg-white p-6">
                  <div className="font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] font-medium tracking-tight text-ink">
                    {r.value}
                  </div>
                  <div className="mt-2 font-mono text-[0.7rem] leading-snug text-graphite">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ GALLERY ══════════ */}
      {project.gallery?.length > 0 && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8 md:py-16">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              gallery
            </span>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <div key={i} className="aspect-[16/10] overflow-hidden border border-line bg-white">
                  <CoverImage src={src} alt={`${project.name} — view ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ TESTIMONIAL ══════════ */}
      {project.testimonial && (
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-20">
            <Quote className="h-7 w-7 text-accent" strokeWidth={1.4} />
            <blockquote className="mt-5 max-w-[46ch] font-display text-[clamp(1.4rem,1.1rem+1.4vw,2.1rem)] font-medium leading-[1.25] tracking-tight text-ink">
              "{project.testimonial.quote}"
            </blockquote>
            <figcaption className="mt-6 font-mono text-[0.76rem] text-faint">
              — {project.testimonial.author}, {project.testimonial.role}
            </figcaption>
          </div>
        </section>
      )}

      {/* ══════════ PREV / NEXT ══════════ */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group border-b border-line px-5 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:py-10"
          >
            <span className="font-mono text-[0.7rem] text-faint">← previous project</span>
            <p className="mt-2 font-display text-[1.15rem] font-medium text-ink transition group-hover:text-accent">
              {prev.name}
            </p>
          </Link>
          <Link
            to={`/projects/${next.slug}`}
            className="group px-5 py-8 text-right sm:px-8 sm:py-10"
          >
            <span className="font-mono text-[0.7rem] text-faint">next project →</span>
            <p className="mt-2 font-display text-[1.15rem] font-medium text-ink transition group-hover:text-accent">
              {next.name}
            </p>
          </Link>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            your project next
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">
            Like what you see? Let's build yours.
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
              onClick={() => navigate("/projects")}
              className="inline-flex items-center border border-[#3A3E48] px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-paper"
            >
              Back to portfolio
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectDetail;