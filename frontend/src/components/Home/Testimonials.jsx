import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// NOTE: Placeholder content — quotes, names, companies and metrics are illustrative.
// Replace with verified client data (and matching metrics) before launch.
const testimonials = [
  {
    quote:
      "They rebuilt our e-commerce store from the ground up. Page load times dropped by 3x and sales grew 60% in the first three months. The design finally matches the brand.",
    author: "Arjun Mehta",
    role: "Founder",
    company: "Trendify Stores",
    sector: "Retail",
    metrics: [
      { value: "3×", label: "faster page loads" },
      { value: "+60%", label: "sales in 3 months" },
    ],
  },
  {
    quote:
      "Our new marketing site loads instantly, ranks on the first page for our core keywords, and lead volume has doubled. The SEO work under the hood is genuinely thorough.",
    author: "Sophia Williams",
    role: "Head of Growth",
    company: "CloudCore Solutions",
    sector: "SaaS",
    metrics: [
      { value: "2×", label: "lead volume" },
      { value: "Page 1", label: "core keyword rankings" },
    ],
  },
  {
    quote:
      "They designed and built our web app end to end — clean UI, solid backend, and rock-solid performance. Ongoing maintenance has been just as smooth as the build.",
    author: "Ravi Sharma",
    role: "CTO",
    company: "FitLife Wellness",
    sector: "Wellness",
    metrics: [
      { value: "End-to-end", label: "design + build" },
      { value: "Ongoing", label: "maintenance & support" },
    ],
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = testimonials[active];
  const total = String(testimonials.length).padStart(2, "0");

  return (
    <section className="font-body bg-paper border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              client feedback
            </span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">
              What our clients say.
            </h2>
          </div>
          <p className="max-w-[32ch] text-graphite">
            Partners across retail, SaaS, and wellness on what launching a site
            with us was actually like.
          </p>
        </div>

        {/* Lead + index */}
        <div className="grid grid-cols-1 border border-line lg:grid-cols-[1.9fr_1fr]">
          {/* Featured quote */}
          <div className="relative flex min-h-[440px] flex-col overflow-hidden border-b border-line bg-white p-8 md:p-10 lg:border-b-0 lg:border-r">
            {/* Oversized sector watermark (signature) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 top-2 select-none font-display text-[6.5rem] font-medium uppercase leading-none tracking-tight text-ink/[0.04] md:text-[9rem]"
            >
              {current.sector}
            </span>

            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[0.72rem] lowercase text-faint">
                {current.sector}
              </span>
              <span className="font-mono text-[0.72rem] text-faint">
                {String(active + 1).padStart(2, "0")} / {total}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative mt-6 flex flex-1 flex-col"
              >
                <span className="font-display text-5xl leading-none text-accent">
                  &ldquo;
                </span>

                <blockquote className="mt-3 max-w-[46ch] font-display text-[clamp(1.15rem,0.9rem+1vw,1.6rem)] font-medium leading-snug tracking-tight text-ink">
                  {current.quote}
                </blockquote>

                {/* Metrics ledger */}
                <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                  {current.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-display text-2xl font-medium tracking-tight text-accent md:text-[1.75rem]">
                        {m.value}
                      </dt>
                      <dd className="mt-1 font-mono text-[0.72rem] lowercase text-faint">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>

                <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-2 border-t border-line pt-4">
                  <span className="font-display text-[0.98rem] font-medium text-ink">
                    {current.author}
                  </span>
                  <span className="font-mono text-[0.74rem] text-faint">
                    — {current.role}, {current.company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Index / selector */}
          <ul className="flex flex-col" role="tablist" aria-label="Client testimonials">
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <li
                  key={t.author}
                  className="border-b border-line last:border-b-0 lg:flex-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`hov-cell group flex h-full w-full items-center gap-4 px-6 py-5 text-left transition-colors ${
                      isActive ? "bg-white" : "bg-paper"
                    }`}
                  >
                    {/* active tick */}
                    <span
                      aria-hidden="true"
                      className={`h-8 w-px shrink-0 transition-colors ${
                        isActive ? "bg-accent" : "bg-line"
                      }`}
                    />

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate font-display text-[0.95rem] font-medium ${
                          isActive ? "text-ink" : "text-graphite"
                        }`}
                      >
                        {t.company}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[0.7rem] lowercase text-faint">
                        {t.author} · {t.sector}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`hov-arrow font-display text-lg leading-none transition-colors ${
                        isActive ? "text-accent" : "text-faint"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;