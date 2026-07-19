import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="font-body border-t border-line bg-paper">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
        <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
          <span className="inline-block h-px w-3.5 bg-accent" />
          start a project
        </span>

        <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-ink">
          Tell us what you're building. We'll tell you how we'd ship it.
        </h2>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/contact")}
            className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
          >
            Book a free consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate("/whyUs")}
            className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink"
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;