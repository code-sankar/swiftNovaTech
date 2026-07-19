import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

// Expanded capability definitions
const capabilities = [
  {
    n: "01",
    t: "Custom Websites",
    d: "React · Next.js",
    tech: "React | Next.js",
    score: "98%",
    label: "Performance Score",
    metric: "Optimized Core Web Vitals",
    color: "text-emerald-600",
    dotColor: "bg-emerald-600",
    chartColor: "#2F5FEA",
  },
  {
    n: "02",
    t: "E-commerce",
    d: "Shopify · Custom",
    tech: "Shopify | Hydrogen",
    score: "2.4s",
    label: "Avg Speed to Checkout",
    metric: "Conversion Optimized Pipeline",
    color: "text-indigo-600",
    dotColor: "bg-indigo-600",
    chartColor: "#6366F1",
  },
  {
    n: "03",
    t: "Web Apps & SaaS",
    d: "Full-stack",
    tech: "Node.js | Postgres",
    score: "99.9%",
    label: "Uptime & Reliability",
    metric: "Highly Scalable Architecture",
    color: "text-blue-600",
    dotColor: "bg-blue-600",
    chartColor: "#3B82F6",
  },
  {
    n: "04",
    t: "CMS / Headless",
    d: "WordPress · Sanity",
    tech: "Sanity.io | GraphQL",
    score: "10x",
    label: "Faster Content Updates",
    metric: "Structured Real-time Editor",
    color: "text-amber-600",
    dotColor: "bg-amber-600",
    chartColor: "#F59E0B",
  },
  {
    n: "05",
    t: "Website Design",
    d: "Figma · UI/UX",
    tech: "Figma | Design Systems",
    score: "100%",
    label: "Pixel Perfect Specs",
    metric: "Component-Driven Strategy",
    color: "text-purple-600",
    dotColor: "bg-purple-600",
    chartColor: "#A855F7",
  },
  {
    n: "06",
    t: "Mobile Apps",
    d: "Java · Kotlin",
    tech: "Android | Architecture",
    score: "4.9★",
    label: "User Play Store Rating",
    metric: "Native Code Execution",
    color: "text-rose-600",
    dotColor: "bg-rose-600",
    chartColor: "#F43F5E",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

/* Recreated dynamic blueprint preview window scales perfectly */
const DashboardShot = ({ chartColor }) => (
  <div className="overflow-hidden rounded-md border border-line bg-white relative z-0">
    <div className="flex items-center gap-1.5 border-b border-line bg-[#F3F3F1] px-2.5 py-2">
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
    </div>
    <div className="grid h-[118px] grid-cols-[26px_1fr]">
      <div className="bg-[#20222B] px-1.5 py-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="mb-2 block h-1.5 rounded-sm bg-[#3a3d49]" />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 py-2">
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded border border-line px-1.5 py-1 bg-white"
            >
              <span className="block h-1 w-3/5 rounded-sm bg-[#d9d8d2]" />
              <span className="mt-1 block h-2 w-3/4 rounded-sm bg-[#2b2d36]" />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded border border-line p-1.5 bg-white">
          <svg
            viewBox="0 0 200 44"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={chartColor} stopOpacity="0.25" />
                <stop offset="1" stopColor={chartColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,34 L26,26 L52,30 L78,16 L104,22 L130,10 L156,18 L182,8 L200,12 L200,44 L0,44 Z"
              fill="url(#spark)"
            />
            <path
              d="M0,34 L26,26 L52,30 L78,16 L104,22 L130,10 L156,18 L182,8 L200,12"
              fill="none"
              stroke={chartColor}
              strokeWidth="1.6"
            />
          </svg>
        </div>
        <div>
          {["w-11/12", "w-8/12", "w-9/12"].map((w, i) => (
            <span
              key={i}
              className={`my-1 block h-1 rounded-sm bg-line ${w}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hero_section = () => {
  const navigate = useNavigate();
  const [activeCap, setActiveCap] = useState(capabilities[0]);

  return (
    // Replaced overflow-x-clip with overflow-hidden to contain the grid wrapper
    <section className="font-body overflow-hidden bg-paper relative z-0">
      {/* 
        NEW UI ELEMENT: Background Grid Pattern
        We use an inline SVG background. Adjust 'stroke-width' or 'opacity' to fine-tune subtlety.
        This grid reinforces the "Blueprint / Engineering" aesthetic.
      */}
      <div className="absolute inset-0 z-[-1] pointer-events-none opacity-40 [mask-image:linear-gradient(to_bottom,white,transparent,transparent,white)]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="gridPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
                className="text-line"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-24 lg:py-28 relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1.05fr] lg:gap-16">
          {/* Left — Editorial Brand Messaging */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] tracking-wider uppercase text-faint"
            >
              <span className="inline-block h-px w-3.5 bg-accent" />
              web design &amp; development studio
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="my-6 max-w-[16ch] font-display text-[clamp(2.5rem,1.4rem+4.6vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-ink"
            >
              We build websites that teams actually{" "}
              <span className="relative inline-block text-accent">
                rely on.
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
                  className="absolute bottom-1 left-0 h-[3px] bg-accent"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="max-w-[48ch] text-[clamp(1.05rem,1rem+0.4vw,1.2rem)] leading-[1.6] text-graphite"
            >
              <span className="font-semibold text-ink">
                SwiftNova Tech Labs
              </span>{" "}
              is a premium digital agency. We partner with growth-minded
              founders to design, engineer, and deploy lightning-fast,
              conversion-optimized ecosystems.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition-all duration-300 hover:bg-accent hover:border-accent"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              <button
                onClick={() => navigate("/cases")}
                className="inline-flex items-center border border-line-strong bg-paper px-6 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-ink/[0.02]"
              >
                See selected work
              </button>
            </motion.div>
          </div>

          {/* Right — Interactive capability index + Proof Card */}
          <motion.aside
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="relative lg:pl-4"
          >
            {/* Capability Index List Wrapper */}
            <div className="rounded-lg border border-line bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative z-10">
              <div className="flex justify-between border-b border-line px-4 py-3.5 font-mono text-[0.72rem] bg-[#FAFAFA] text-faint">
                <span>~/capabilities</span>
                <span className="text-ink font-semibold">06</span>
              </div>
              <ul className="divide-y divide-line">
                {capabilities.map((c) => {
                  const isSelected = activeCap.n === c.n;
                  return (
                    <li
                      key={c.n}
                      onMouseEnter={() => setActiveCap(c)}
                      className={`group flex items-center gap-4 px-4 py-4 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "bg-accent/[0.04]"
                          : "hover:bg-accent/[0.02]"
                      }`}
                    >
                      <span
                        className={`w-[2ch] flex-none font-mono text-[0.72rem] transition-colors ${
                          isSelected
                            ? "text-accent font-bold"
                            : "text-faint group-hover:text-accent"
                        }`}
                      >
                        {c.n}
                      </span>
                      <span
                        className={`font-display text-[0.96rem] font-medium transition-colors ${
                          isSelected ? "text-accent" : "text-ink"
                        }`}
                      >
                        {c.t}
                      </span>
                      <span className="ml-auto font-mono text-[0.8rem] text-faint group-hover:text-graphite transition-colors">
                        {c.d}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 flex-none transition-all duration-300 ${
                          isSelected
                            ? "text-accent translate-x-0 opacity-100"
                            : "text-faint -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Floating Context Proof Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCap.n}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                /* 
      UI FIX: Changed `lg:-left-12` to `lg:-right-16` (or -right-12 depending on your spacing) 
      This pushes the card to float gracefully out to the right side instead of overlapping the left.
    */
                className="relative z-20 mt-6 border border-line bg-white p-4 shadow-[0_25px_50px_-12px_rgba(23,23,27,0.15)] rounded-lg lg:absolute lg:bottom-[-48px] lg:-right-16 lg:mt-0 lg:w-[290px]"
              >
                <DashboardShot chartColor={activeCap.chartColor} />

                <p className="my-3 px-0.5 font-mono text-[0.68rem] text-faint">
                  Powered by:{" "}
                  <span className="text-ink font-medium">{activeCap.tech}</span>
                </p>

                <div className="grid grid-cols-2 items-stretch gap-3">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div
                        className={`font-display text-[1.85rem] font-bold leading-none ${activeCap.color}`}
                      >
                        {activeCap.score}
                      </div>
                      <div className="mt-1 text-[0.7rem] font-medium leading-tight text-ink">
                        {activeCap.label}
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[0.62rem] text-graphite bg-[#FAFAFA]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${activeCap.dotColor}`}
                        />
                        Status
                      </span>
                      <div className="mt-1.5 text-[0.65rem] leading-normal text-faint">
                        {activeCap.metric}
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-md bg-[#111319] p-2.5 flex flex-col justify-center shadow-inner">
                    {[
                      "w-6/12 bg-[#c792ea]",
                      "w-9/12 bg-[#82aaff]",
                      "w-5/12 bg-[#c3e88d]",
                      "w-8/12 bg-[#5b6270]",
                      "w-9/12 bg-[#82aaff]",
                      "w-7/12 bg-[#82aaff]",
                      "w-5/12 bg-[#c3e88d]",
                    ].map((cls, i) => (
                      <span
                        key={i}
                        className={`my-1 block h-1 rounded-sm opacity-85 ${cls}`}
                      />
                    ))}
                    <svg
                      className="absolute bottom-2 right-2 text-[#8a93ff]/80 animate-pulse"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero_section;
