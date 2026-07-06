import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  BarChart,
  Layers,
  Zap,
  CheckCircle,
  Users,
  Target,
  Rocket,
  Shield,
  Search,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

/* ---------------- data ---------------- */

const services = [
  {
    icon: ShoppingCart,
    title: "Custom E-commerce Stores",
    description: "Bespoke storefronts built for your brand, catalogue, and buyer journey — not a template forced to fit.",
    features: ["Product Catalogues", "Cart & Checkout", "Wishlist & Reviews", "Search & Filters"],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    icon: Layers,
    title: "Shopify & BigCommerce",
    description: "Custom themes, apps, and integrations on the platforms most retailers already run.",
    features: ["Custom Themes", "App Development", "API Integrations", "Migrations"],
    technologies: ["Shopify Liquid", "Hydrogen", "BigCommerce", "Stencil"],
  },
  {
    icon: Zap,
    title: "Headless Commerce",
    description: "Decoupled architecture: fast Next.js storefront, best-in-class commerce engine, zero compromises.",
    features: ["Shopify Hydrogen", "Commerce.js", "Fast Checkout", "Composable Stack"],
    technologies: ["Next.js", "Shopify SFAPI", "Stripe", "Algolia"],
  },
  {
    icon: CreditCard,
    title: "Payments & Checkout",
    description: "Frictionless checkout with the payment methods your customers actually want to use.",
    features: ["Stripe / Razorpay", "One-click Checkout", "Multi-currency", "Fraud Protection"],
    technologies: ["Stripe", "Razorpay", "PayPal", "Apple Pay"],
  },
  {
    icon: Package,
    title: "Product & Inventory Management",
    description: "Admin dashboards and integrations that keep catalogues, stock, and orders in sync.",
    features: ["Bulk Editing", "Stock Sync", "Order Workflows", "ERP Integrations"],
    technologies: ["Custom Admin", "Zapier", "Odoo", "SAP APIs"],
  },
  {
    icon: Search,
    title: "Store Optimization",
    description: "SEO, page-speed, and conversion-rate work that turns traffic into revenue.",
    features: ["Core Web Vitals", "SEO", "A/B Testing", "Analytics"],
    technologies: ["Lighthouse", "GA4", "Hotjar", "GTM"],
  },
];

const technologies = [
  "Shopify", "Shopify Hydrogen", "BigCommerce", "Next.js",
  "React", "Node.js", "Stripe", "Razorpay",
  "Algolia", "Sanity", "Tailwind", "Vercel",
];

const processSteps = [
  { step: "01", title: "Discovery & Store Strategy", description: "Understand your catalogue, customers, and margins — before we recommend a platform.", duration: "1–2 weeks", icon: Target },
  { step: "02", title: "Design & UX",                description: "Product pages, filters, and checkout designed to convert on desktop and mobile.",     duration: "2–3 weeks", icon: Users },
  { step: "03", title: "Storefront Build",           description: "Build the storefront, admin, and integrations against real product data.",              duration: "4–10 weeks", icon: ShoppingCart },
  { step: "04", title: "Payments & Shipping",        description: "Wire up payments, taxes, shipping rules, and order-management workflows.",              duration: "1–2 weeks", icon: Truck },
  { step: "05", title: "Testing & Launch",           description: "Full end-to-end test of the buyer flow, then a zero-downtime cutover.",                 duration: "1–2 weeks", icon: Rocket },
  { step: "06", title: "Growth & Support",           description: "Ongoing CRO, feature work, and platform updates after launch.",                         duration: "Ongoing",   icon: Shield },
];

const benefits = [
  { icon: Zap,          title: "Fast Storefronts",       description: "Sub-2s load times and 90+ Lighthouse scores as a baseline, not an upsell.",              metric: "Sub-2s load times" },
  { icon: BarChart,     title: "Higher Conversion",      description: "Optimised checkouts and product pages that consistently outperform templated stores.",   metric: "+30% conversion avg" },
  { icon: ShoppingCart, title: "Mobile Commerce",        description: "Thumb-friendly design and one-tap checkouts for the 70% of shoppers on mobile.",         metric: "70% mobile-ready" },
  { icon: CreditCard,   title: "Secure Payments",        description: "PCI-DSS-compliant integrations with fraud protection built in from day one.",            metric: "PCI-DSS compliant" },
  { icon: Search,       title: "SEO-Ready",              description: "Structured data, clean URLs, and fast rendering — indexed and ranking after launch.",    metric: "Indexed in days" },
  { icon: Users,        title: "Owner-Friendly Admin",   description: "Product, order, and content management your team can actually use without a dev.",        metric: "Zero dev bottleneck" },
];

const stats = [
  { value: "70%",   label: "of e-commerce traffic is mobile" },
  { value: "53%",   label: "of shoppers abandon slow sites in 3s" },
  { value: "$5.7T", label: "global e-commerce sales in 2025" },
  { value: "2.9%",  label: "average e-commerce conversion rate" },
];

const caseStudies = [
  {
    title: "D2C Fashion Store Rebuild",
    industry: "Retail",
    challenge: "A Shopify store on a bloated theme with poor page-speed and abandoned checkout.",
    solution: "Rebuilt on Shopify Hydrogen with a custom Next.js storefront, streamlined checkout, and Algolia search.",
    results: "3× faster load times, 40% lift in mobile conversion, 92 Lighthouse score.",
    technologies: ["Next.js", "Shopify Hydrogen", "Algolia", "Vercel"],
  },
  {
    title: "B2B Wholesale Portal",
    industry: "Wholesale",
    challenge: "Manual order-taking over email — no self-serve catalogue or pricing.",
    solution: "Custom B2B storefront with tiered pricing, quote requests, and ERP-synced inventory.",
    results: "60% of orders now self-serve, 5-hour saving per day on the sales team.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Odoo API"],
  },
  {
    title: "Multi-brand E-commerce Launch",
    industry: "Consumer",
    challenge: "New brand, no store, six weeks to first sale.",
    solution: "Shopify build with custom theme, Razorpay integration, and full launch checklist.",
    results: "Live in five weeks, first sale on day one, break-even in month three.",
    technologies: ["Shopify", "Razorpay", "Klaviyo"],
  },
];

const faqs = [
  { q: "Should I use Shopify or build a custom store?", a: "Shopify is the right call for most brands — faster to launch, cheaper to run, and battle-tested checkout. Custom builds make sense when you have complex catalogues, unusual pricing rules, or need to integrate deeply with ERP/CRM systems. We'll recommend the honest answer at discovery." },
  { q: "How long does an e-commerce build take?",       a: "A themed Shopify store: 4–6 weeks. A custom Shopify Hydrogen storefront: 8–12 weeks. A fully custom store with complex integrations: 12–20+ weeks. We share a detailed timeline after scoping." },
  { q: "Do you handle migrations from existing platforms?", a: "Yes. We migrate stores from WooCommerce, Magento, older Shopify themes, and custom platforms — including products, customers, orders, and 301 redirects to preserve SEO." },
  { q: "What about ongoing support after launch?",      a: "We offer maintenance retainers covering hosting monitoring, security updates, conversion-rate optimisation, and feature work. Most e-commerce clients stay on for growth work post-launch." },
];

/* ---------------- component ---------------- */

const Ecommerce = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="min-h-screen bg-paper font-body">
      {/* ================= HERO ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                services / e-commerce development
              </span>
              <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Online stores that turn browsers into&nbsp;
                <span className="border-b-2 border-accent pb-0.5">buyers</span>.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.02rem,1rem+0.4vw,1.2rem)] leading-[1.55] text-graphite">
                We design and build online stores that load fast, look right on
                every device, and convert traffic into revenue — on Shopify,
                custom, or headless commerce.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-accent hover:bg-accent">
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate("/cases")} className="inline-flex items-center border border-line-strong px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-ink">
                  See case studies
                </button>
              </div>
            </div>

            <aside className="border border-line bg-white">
              <div className="flex justify-between border-b border-line px-4 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/e-commerce</span>
                <span>overview</span>
              </div>
              <dl className="divide-y divide-line">
                {[
                  ["Timeline", "4 – 20 weeks"],
                  ["Platforms", "Shopify · Custom · Hydrogen"],
                  ["Payments", "Stripe · Razorpay"],
                  ["Stores shipped", "12+"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex justify-between px-4 py-3">
                    <dt className="font-mono text-[0.74rem] text-graphite">{dt}</dt>
                    <dd className="font-display text-[0.95rem] text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= STATS BAND ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-6 md:p-8 ${i !== 0 ? "md:border-l md:border-line" : ""} ${i === 1 ? "border-l border-line md:border-l" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}>
                <div className="font-display text-[clamp(1.75rem,1.2rem+1.5vw,2.4rem)] font-medium tracking-tight text-ink">{s.value}</div>
                <div className="mt-1 max-w-[24ch] font-mono text-[0.72rem] leading-relaxed text-graphite">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                capabilities
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">What we build.</h2>
            </div>
            <p className="max-w-[36ch] text-graphite">The full commerce workflow — storefront, checkout, admin, and integrations — under one roof.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  className="flex flex-col border-b border-r border-line bg-white p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.72rem] text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-6 font-display text-[1.25rem] font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-graphite">{s.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-baseline gap-2 text-[0.86rem] text-ink">
                        <span className="font-mono text-[0.7rem] text-accent">·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {s.technologies.map((t) => (
                      <span key={t} className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite">{t}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TECH ROW ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-14 md:py-16">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
            <span className="inline-block h-px w-3.5 bg-accent" />
            stack we work in
          </span>
          <div className="mt-8 flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span key={t} className="border border-line-strong bg-white px-3 py-1.5 font-mono text-[0.78rem] text-ink">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                how we work
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Six stages, one continuous line.</h2>
            </div>
            <p className="max-w-[34ch] text-graphite">From first customer interview to launch and growth — one team, no hand-offs.</p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="border-t-2 border-ink py-6 pr-6">
                  <div className="flex items-center justify-between font-mono text-[0.72rem]">
                    <span className="text-accent">{step.step}</span>
                    <span className="text-faint">{step.duration}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Icon className="h-4 w-4 text-ink" strokeWidth={1.6} />
                    <h3 className="font-display text-[1.1rem] font-medium text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                what you get
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Stores that hold up in the real world.</h2>
            </div>
            <p className="max-w-[32ch] text-graphite">The things we optimise for on every store — and the numbers we hold ourselves to.</p>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="border-b border-r border-line bg-white p-7">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-[1.15rem] font-medium text-ink">{b.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-graphite">{b.description}</p>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-[0.72rem] text-accent">→ {b.metric}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              selected work
            </span>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">Where we've launched stores.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_1fr]">
            <ul className="border border-line bg-white">
              {caseStudies.map((c, i) => (
                <li key={c.title}>
                  <button
                    onClick={() => setActiveCase(i)}
                    className={`flex w-full items-baseline gap-3 border-b border-line px-4 py-4 text-left transition last:border-b-0 ${activeCase === i ? "bg-accent/5" : "hover:bg-paper"}`}
                  >
                    <span className={`font-mono text-[0.72rem] ${activeCase === i ? "text-accent" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[0.95rem] font-medium text-ink">{c.industry}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeCase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border border-line bg-white p-8"
              >
                <span className="font-mono text-[0.72rem] text-accent">{caseStudies[activeCase].industry}</span>
                <h3 className="mt-3 font-display text-[clamp(1.35rem,1.1rem+0.8vw,1.75rem)] font-medium tracking-tight text-ink">{caseStudies[activeCase].title}</h3>

                <dl className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
                  {[
                    ["challenge", caseStudies[activeCase].challenge],
                    ["solution",  caseStudies[activeCase].solution],
                    ["results",   caseStudies[activeCase].results],
                  ].map(([label, text]) => (
                    <div key={label}>
                      <dt className="font-mono text-[0.7rem] text-faint">{label}</dt>
                      <dd className={`mt-2 text-[0.9rem] leading-relaxed ${label === "results" ? "text-ink" : "text-graphite"}`}>{text}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {caseStudies[activeCase].technologies.map((t) => (
                    <span key={t} className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite">{t}</span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
                <span className="inline-block h-px w-3.5 bg-accent" />
                questions
              </span>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium leading-tight tracking-tight text-ink">What store owners usually ask.</h2>
              <p className="mt-4 max-w-[34ch] text-graphite">
                Missing something? <button onClick={() => navigate("/contact")} className="border-b border-accent text-ink transition hover:text-accent">Send us a note.</button>
              </p>
            </div>

            <div className="border-t border-line">
              {faqs.map((f, i) => {
                const open = openFAQ === i;
                return (
                  <div key={f.q} className="border-b border-line">
                    <button onClick={() => setOpenFAQ(open ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left transition hover:text-accent" aria-expanded={open}>
                      <span className="flex items-baseline gap-4">
                        <span className={`font-mono text-[0.72rem] ${open ? "text-accent" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-display text-[1.02rem] font-medium text-ink">{f.q}</span>
                      </span>
                      {open ? <Minus className="h-4 w-4 flex-none text-accent" /> : <Plus className="h-4 w-4 flex-none text-graphite" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <p className="max-w-[62ch] pb-6 pl-10 pr-6 text-[0.95rem] leading-relaxed text-graphite">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-[#9AA0AC]">
            <span className="inline-block h-px w-3.5 bg-white" />
            start a project
          </span>
          <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.9rem,1.3rem+2.2vw,2.9rem)] font-medium leading-[1.08] tracking-tight text-paper">Ready to launch a store that sells? Let's scope it.</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => navigate("/contact")} className="group inline-flex items-center gap-2 border border-paper bg-paper px-5 py-3.5 font-mono text-[0.82rem] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-white">
              Book a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate("/cases")} className="inline-flex items-center border border-[#3A3E48] px-5 py-3.5 font-mono text-[0.82rem] font-medium text-paper transition hover:border-paper">
              See our work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecommerce;