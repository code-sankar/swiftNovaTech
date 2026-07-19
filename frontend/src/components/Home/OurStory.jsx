import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Handshake, TrendingUp, ShieldCheck } from "lucide-react";

const principles = [
  {
    icon: Handshake,
    t: "Direct Partnership",
    d: "No bloated contracts, no middle-men. You work directly with the developers building your product, ensuring complete transparency.",
  },
  {
    icon: TrendingUp,
    t: "Results Over Code",
    d: "We don't just write code; we solve business problems. Every line we write is designed to increase your leads, traffic, or efficiency.",
  },
  {
    icon: ShieldCheck,
    t: "Absolute Reliability",
    d: "We ship on time, without excuses. When you trust us with your project, we take that responsibility incredibly seriously.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

function OurStory() {
  const navigate = useNavigate();

  return (
    <section className="font-body border-t border-line bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left — narrative */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint"
            >
              <span className="inline-block h-px w-3.5 bg-accent" />
              our story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="my-6 max-w-[18ch] font-display text-[clamp(2rem,1.3rem+2.6vw,3.1rem)] font-medium leading-[1.1] tracking-tight text-ink"
            >
              We build <span className="text-accent">trust</span> before we build code.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="max-w-[52ch] space-y-5 text-[clamp(1rem,0.97rem+0.3vw,1.12rem)] leading-[1.65] text-graphite"
            >
              <p>
                Most agencies focus heavily on the technology stack they use. While we
                are experts in modern development, we know that to our clients,{" "}
                <span className="font-semibold text-ink">
                  the technology doesn't matter if the agency isn't reliable.
                </span>
              </p>
              <p>
                We founded <span className="font-semibold text-ink">SwiftNova Tech Labs</span>{" "}
                to be the development partner we wished we had. We communicate clearly,
                we never hide behind jargon, and we treat your business goals as our own.
              </p>
              <p>
                When you work with us, you aren't just getting a website or an app — you
                are getting a dedicated growth partner.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="mt-9">
              <button
                onClick={() => navigate("/contact")}
                className="group inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition-all duration-300 hover:border-accent hover:bg-accent"
              >
                Let's build together
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right — principles index (echoes the hero's ~/capabilities panel) */}
          <motion.aside
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="border border-line bg-white"
          >
            <div className="flex justify-between border-b border-line bg-[#FAFAFA] px-5 py-3.5 font-mono text-[0.72rem] text-faint">
              <span>~/principles</span>
              <span className="font-semibold text-ink">03</span>
            </div>

            <ul className="divide-y divide-line">
              {principles.map(({ icon: Icon, t, d }) => (
                <li
                  key={t}
                  className="flex gap-4 px-5 py-6 transition-colors duration-200 hover:bg-accent/[0.03] sm:px-6"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center border border-line text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-ink">
                      {t}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] text-[0.92rem] leading-[1.6] text-graphite">
                      {d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default OurStory;