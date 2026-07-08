import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const capabilities = [
  { n: "01", t: "Custom Websites", d: "React · Next.js" },
  { n: "02", t: "E-commerce", d: "Shopify · Custom" },
  { n: "03", t: "Web Apps & SaaS", d: "Full-stack" },
  { n: "04", t: "CMS / Headless", d: "WordPress · Sanity" },
  { n: "05", t: "Website Design", d: "Figma · UI/UX" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Hero_section = () => {
  const navigate = useNavigate();

  return (
    <section className="font-body bg-paper">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.95fr] lg:gap-16">
          {/* Left — editorial */}
          <div>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint"
            >
              <span className="inline-block h-px w-3.5 bg-accent" />
              web design &amp; development studio
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="my-6 max-w-[15ch] font-display text-[clamp(2.5rem,1.4rem+4.6vw,4.7rem)] font-medium leading-[1.04] tracking-tight text-ink"
            >
              We build websites teams actually{" "}
              <span className="border-b-2 border-accent pb-0.5">rely on.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="max-w-[52ch] text-[clamp(1.05rem,1rem+0.4vw,1.28rem)] leading-[1.55] text-graphite"
            >
              SwiftNova Tech Labs. is a web design and development studio. We partner with
              founders and companies to design, build, and maintain fast,
              conversion-focused websites — from marketing sites and e-commerce
              stores to full web applications.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap gap-3"
            >
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
                See selected work
              </button>
            </motion.div>
          </div>

          {/* Right — capability index */}
          <motion.aside
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="border border-line bg-white"
          >
            <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
              <span>~/capabilities</span>
              <span>05</span>
            </div>
            <ul>
              {capabilities.map((c) => (
                <li
                  key={c.n}
                  className="flex items-baseline gap-4 border-b border-line px-4 py-4 transition last:border-b-0 hover:bg-accent/5"
                >
                  <span className="w-[2ch] flex-none font-mono text-[0.72rem] text-accent">
                    {c.n}
                  </span>
                  <span className="font-display text-[1rem] font-medium text-ink">
                    {c.t}
                  </span>
                  <span className="ml-auto font-mono text-[0.82rem] text-faint">
                    {c.d}
                  </span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero_section;