import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  ShoppingCart,
  AppWindow,
  Layers,
  Palette,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
 
const practiceAreas = [
  {
    icon: Code2,
    title: "Custom Web Development",
    path: "/web",
    description:
      "Responsive, fast, standards-based websites built with React, Next.js, and modern tooling — from marketing sites to complex frontends.",
    features: ["React / Next.js", "Performance", "SEO-ready", "API Integration"],
    projects: 20,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    path: "/ecommerce",
    description:
      "Conversion-focused online stores on Shopify, WooCommerce, or headless commerce — with secure checkout and international payments.",
    features: ["Shopify", "Headless", "Payments", "Checkout UX"],
    projects: 12,
  },
  {
    icon: AppWindow,
    title: "Web Applications & SaaS",
    path: "/web-apps",
    description:
      "Custom web apps and dashboards with authentication, real-time data, and an architecture that scales as you grow.",
    features: ["Dashboards", "Auth", "Real-time", "Scalable"],
    projects: 10,
  },
  {
    icon: Layers,
    title: "CMS & Headless",
    path: "/cms",
    description:
      "Editor-friendly sites on WordPress, Sanity, or Strapi so your team can update content without touching code.",
    features: ["WordPress", "Sanity", "Strapi", "Headless"],
    projects: 14,
  },
  {
    icon: Palette,
    title: "Website Design",
    path: "/design",
    description:
      "Distinctive, accessible interface design — from wireframes to a polished, on-brand design system.",
    features: ["UI / UX", "Wireframes", "Design Systems", "Accessibility"],
    projects: 18,
  },
  {
    icon: LineChart,
    title: "Maintenance & SEO",
    path: "/maintenance",
    description:
      "Ongoing updates, security patches, performance tuning, and technical SEO to keep your site fast and easy to find.",
    features: ["Technical SEO", "Core Web Vitals", "Security", "Support"],
    projects: 16,
  },
];

const Practice_areas = () => {
  const navigate = useNavigate();

  return (
    <section className="font-body bg-paper border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              what we do
            </span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">
              What we build, end to end.
            </h2>
          </div>
          <p className="max-w-[34ch] text-graphite">
            One team accountable for design, engineering, and delivery — no
            hand-offs, no black boxes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.button
                key={area.title}
                onClick={() => navigate(area.path)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="group flex flex-col border-b border-r border-line bg-white p-7 text-left transition hover:bg-paper"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                </div>

                <h3 className="mt-6 font-display text-[1.35rem] font-medium text-ink transition group-hover:text-accent">
                  {area.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-graphite">
                  {area.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {area.features.map((f) => (
                    <span
                      key={f}
                      className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.72rem] text-faint">
                  {/* <span>{area.projects}+ projects</span> */}
                  <ArrowUpRight className="h-4 w-4 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Practice_areas;