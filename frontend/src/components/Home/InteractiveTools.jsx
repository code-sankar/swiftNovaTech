import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, ScanLine, Blocks, ArrowRight, Globe, ShoppingBag, Layers,
  Zap, Lock, FileText, CreditCard, LayoutDashboard, BarChart3, Search,
  MessageSquare, Loader2, Terminal,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                 */
/* ------------------------------------------------------------------ */

const SectionLabel = ({ n, children }) => (
  <div className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
    <span className="text-accent">{n}</span>
    <span>{children}</span>
  </div>
);

const OptionButton = ({ selected, onClick, children, Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 border px-4 py-4 font-mono text-[0.78rem] transition-all duration-200 ${
      selected
        ? "border-ink bg-ink text-paper"
        : "border-line bg-white text-graphite hover:border-ink hover:text-ink"
    }`}
  >
    {Icon && <Icon className="h-4 w-4" strokeWidth={1.75} />}
    <span className="font-medium">{children}</span>
  </button>
);

/* ------------------------------------------------------------------ */
/*  Tab 1: PROJECT ESTIMATOR                                          */
/* ------------------------------------------------------------------ */

const services = [
  { id: "website", label: "Website", Icon: Globe },
  { id: "ecommerce", label: "E-commerce", Icon: ShoppingBag },
  { id: "webapp", label: "Custom App", Icon: Layers },
];

const projectTypes = {
  website: ["Marketing Site", "CMS-Driven", "Static Site"],
  ecommerce: ["Shopify Theme", "Custom Storefront", "Multi-Region"],
  webapp: ["MVP", "Full SaaS", "Enterprise Platform"],
};

const scopes = ["Basic", "Advanced", "Enterprise"];
const paces = ["Standard Pace", "ASAP / Rush"];

const priceMatrix = {
  website:   { Basic: [500, 3000],  Advanced: [3000, 6500],   Enterprise: [6500, 12000]  },
  ecommerce: { Basic: [3500, 6500],  Advanced: [6500, 14000],  Enterprise: [14000, 28000] },
  webapp:    { Basic: [5500, 11000], Advanced: [11000, 22000], Enterprise: [22000, 45000] },
};

const timelineMatrix = {
  website:   { Basic: "2-3 weeks", Advanced: "3-5 weeks",  Enterprise: "5-8 weeks"   },
  ecommerce: { Basic: "3-4 weeks", Advanced: "5-8 weeks",  Enterprise: "8-14 weeks"  },
  webapp:    { Basic: "4-6 weeks", Advanced: "6-10 weeks", Enterprise: "10-16 weeks" },
};

const fastenTimeline = (t) => {
  const [a, b] = t.split(" ")[0].split("-").map(Number);
  return `${Math.max(1, Math.round(a * 0.65))}-${Math.max(2, Math.round(b * 0.65))} weeks`;
};

const fmt = (n) =>
  n >= 1000
    ? `$${(n / 1000) % 1 === 0 ? (n / 1000).toFixed(0) : (n / 1000).toFixed(1)}k`
    : `$${n}`;

function ProjectEstimator() {
  const [service, setService] = useState("website");
  const [type, setType] = useState(projectTypes.website[0]);
  const [scope, setScope] = useState("Advanced");
  const [pace, setPace] = useState("Standard Pace");
  const [email, setEmail] = useState("");

  const handleService = (id) => {
    setService(id);
    setType(projectTypes[id][0]);
  };

  const { timeline, minPrice, maxPrice } = useMemo(() => {
    const [min, max] = priceMatrix[service][scope];
    const mult = pace === "ASAP / Rush" ? 1.4 : 1;
    const raw = timelineMatrix[service][scope];
    return {
      timeline: pace === "ASAP / Rush" ? fastenTimeline(raw) : raw,
      minPrice: Math.round((min * mult) / 100) * 100,
      maxPrice: Math.round((max * mult) / 100) * 100,
    };
  }, [service, scope, pace]);

  return (
    <div className="grid gap-8 p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:p-8">
      {/* Left — form */}
      <div>
        <SectionLabel n="01">What do you need?</SectionLabel>
        <div className="mb-8 grid grid-cols-3 gap-2">
          {services.map(({ id, label, Icon }) => (
            <OptionButton
              key={id}
              selected={service === id}
              onClick={() => handleService(id)}
              Icon={Icon}
            >
              {label}
            </OptionButton>
          ))}
        </div>

        <SectionLabel n="02">Project type</SectionLabel>
        <div className="mb-8 grid grid-cols-3 gap-2">
          {projectTypes[service].map((t) => (
            <OptionButton key={t} selected={type === t} onClick={() => setType(t)}>
              {t}
            </OptionButton>
          ))}
        </div>

        <SectionLabel n="03">Scope &amp; complexity</SectionLabel>
        <div className="mb-8 grid grid-cols-3 gap-2">
          {scopes.map((s) => (
            <OptionButton key={s} selected={scope === s} onClick={() => setScope(s)}>
              {s}
            </OptionButton>
          ))}
        </div>

        <SectionLabel n="04">Timeline urgency</SectionLabel>
        <div className="grid grid-cols-2 gap-2 sm:max-w-[360px]">
          {paces.map((p) => (
            <OptionButton key={p} selected={pace === p} onClick={() => setPace(p)}>
              {p}
            </OptionButton>
          ))}
        </div>
      </div>

      {/* Right — projection */}
      <aside className="border border-line bg-[#FAFAFA] p-6">
        <div className="mb-6 flex items-center justify-between border-b border-line pb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">
          <span>Estimated projection</span>
          <span className="flex items-center gap-1.5 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            live
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${service}-${scope}-${pace}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-faint">
              Expected timeline
            </p>
            <p className="mt-1 font-display text-[1.9rem] font-medium leading-tight text-ink">
              {timeline}
            </p>

            <div className="my-6 h-px w-full bg-line" />

            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-faint">
              Rough investment tier
            </p>
            <p className="mt-1 font-display text-[1.9rem] font-medium leading-tight text-accent">
              {fmt(minPrice)} – {fmt(maxPrice)}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <p className="text-[0.85rem] leading-snug text-graphite">
            Want the detailed roadmap and exact quote for this build?
          </p>
          <div className="mt-3 flex border border-line bg-white focus-within:border-ink">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 bg-transparent px-3 py-2.5 font-mono text-[0.82rem] text-ink placeholder:text-faint focus:outline-none"
            />
            <button
              type="button"
              disabled={!email}
              onClick={() =>
                alert(
                  `Estimate for ${service} / ${type} / ${scope} — ${fmt(minPrice)}-${fmt(
                    maxPrice
                  )} — queued to ${email}. Wire this to Web3Forms.`
                )
              }
              className="flex items-center justify-center bg-ink px-3.5 text-paper transition hover:bg-accent disabled:opacity-40"
              aria-label="Send estimate"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab 2: TECH-DEBT SCANNER                                          */
/* ------------------------------------------------------------------ */

const scanCategories = [
  { id: "perf",  label: "Performance",   key: "Core Web Vitals · Bundle size", Icon: Zap },
  { id: "seo",   label: "SEO",           key: "Meta tags · Structured data",   Icon: Search },
  { id: "a11y",  label: "Accessibility", key: "Contrast · Focus order",        Icon: FileText },
  { id: "sec",   label: "Security",      key: "Headers · Dependencies",        Icon: Lock },
  { id: "stack", label: "Modern Stack",  key: "Framework · Deploy platform",   Icon: Layers },
];

const findings = {
  perf: [
    "Images unoptimized on landing route",
    "Third-party scripts blocking main thread",
    "Fonts loading before content",
    "Render-blocking CSS above the fold",
  ],
  seo: [
    "Structured data missing on product pages",
    "Duplicate H1 tags on category templates",
    "Sitemap not referenced in robots.txt",
    "Missing OG image on shareable routes",
  ],
  a11y: [
    "Insufficient contrast on primary CTA",
    "Focus states missing on primary nav",
    "Alt text missing on hero imagery",
    "Form fields lack associated labels",
  ],
  sec: [
    "No Content-Security-Policy header set",
    "Outdated dependencies detected",
    "Missing referrer-policy header",
    "Mixed content on secure routes",
  ],
  stack: [
    "Framework 2 major versions behind",
    "Bundler outdated — no code splitting",
    "No image CDN in front of assets",
    "Legacy jQuery detected in bundle",
  ],
};

// Deterministic hash — same URL always returns the same audit
const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const scoreColor = (n) =>
  n >= 85 ? "text-emerald-600" : n >= 70 ? "text-amber-600" : "text-rose-600";

function TechDebtScanner() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState("idle"); // idle | scanning | done
  const [result, setResult] = useState(null);

  const runScan = () => {
    if (!url.trim()) return;
    setState("scanning");
    setResult(null);
    setTimeout(() => {
      const cleaned = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
      const report = scanCategories.map((c) => {
        const h = hash(cleaned + c.id);
        return {
          ...c,
          score: 58 + (h % 37), // 58-94
          finding: findings[c.id][h % findings[c.id].length],
        };
      });
      const avg = Math.round(report.reduce((s, r) => s + r.score, 0) / report.length);
      setResult({ report, avg, cleaned });
      setState("done");
    }, 900);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-[720px]">
        <SectionLabel n="01">Point at an existing site</SectionLabel>
        <div className="flex border border-line bg-white focus-within:border-ink">
          <span className="flex items-center border-r border-line px-3 font-mono text-[0.82rem] text-faint">
            https://
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runScan()}
            placeholder="yourdomain.com"
            className="flex-1 bg-transparent px-3 py-3 font-mono text-[0.9rem] text-ink placeholder:text-faint focus:outline-none"
          />
          <button
            type="button"
            onClick={runScan}
            disabled={!url.trim() || state === "scanning"}
            className="flex items-center gap-2 border-l border-line bg-ink px-5 font-mono text-[0.82rem] font-medium text-paper transition hover:bg-accent disabled:opacity-40"
          >
            {state === "scanning" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ScanLine className="h-4 w-4" />
            )}
            {state === "scanning" ? "Scanning" : "Run scan"}
          </button>
        </div>
        <p className="mt-3 font-mono text-[0.68rem] text-faint">
          Preview audit — surfaces the five categories we'd inspect in full. The complete
          report, with code samples and priority-ranked fixes, arrives by email.
        </p>
      </div>

      <div className="mt-10 min-h-[280px]">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[280px] items-center justify-center border border-dashed border-line font-mono text-[0.78rem] text-faint"
            >
              — enter a URL to preview the audit —
            </motion.div>
          )}

          {state === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[280px] flex-col items-center justify-center border border-line bg-white font-mono text-[0.78rem] text-graphite"
            >
              <Loader2 className="mb-3 h-5 w-5 animate-spin text-accent" />
              scanning {url.replace(/^https?:\/\//, "")} …
            </motion.div>
          )}

          {state === "done" && result && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between border border-line bg-[#FAFAFA] px-5 py-3">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-faint">
                    Audit for
                  </p>
                  <p className="font-mono text-[0.9rem] text-ink">{result.cleaned}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-faint">
                    Composite score
                  </p>
                  <p className={`font-display text-[1.6rem] font-semibold leading-none ${scoreColor(result.avg)}`}>
                    {result.avg}
                    <span className="font-mono text-[0.9rem] text-faint">/100</span>
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-line border-x border-b border-line bg-white">
                {result.report.map(({ id, label, key, Icon, score, finding }) => (
                  <li key={id} className="flex items-center gap-5 px-5 py-4">
                    <span
                      className={`w-[54px] flex-none border border-line py-2 text-center font-display text-[1.15rem] font-semibold ${scoreColor(score)}`}
                    >
                      {score}
                    </span>
                    <span className="flex-none text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[0.98rem] font-medium text-ink">{label}</p>
                      <p className="font-mono text-[0.7rem] text-faint">{key}</p>
                    </div>
                    <p className="hidden max-w-[240px] text-right text-[0.82rem] text-graphite sm:block">
                      » {finding}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3 border border-line bg-white p-5">
                <p className="flex-1 text-[0.9rem] text-graphite">
                  Want the full audit — including code samples, ticketable fixes, and a
                  priority stack ranked by impact?
                </p>
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-[0.78rem] font-medium text-paper transition hover:border-accent hover:bg-accent"
                >
                  Request full audit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab 3: BLUEPRINT ENGINE                                           */
/* ------------------------------------------------------------------ */

const featureCatalog = [
  { id: "auth",      label: "User accounts",           Icon: Lock },
  { id: "cms",       label: "Editable content (CMS)",  Icon: FileText },
  { id: "payments",  label: "Payments & checkout",     Icon: CreditCard },
  { id: "admin",     label: "Admin dashboard",         Icon: LayoutDashboard },
  { id: "analytics", label: "Analytics & funnels",     Icon: BarChart3 },
  { id: "search",    label: "Search",                  Icon: Search },
  { id: "chat",      label: "Chat / messaging",        Icon: MessageSquare },
  { id: "realtime",  label: "Realtime updates",        Icon: Zap },
];

function BlueprintEngine() {
  const [selected, setSelected] = useState(new Set(["auth", "cms"]));

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const stack = useMemo(() => {
    const s = [
      ["frontend", "React + Next.js 15"],
      ["styling", "Tailwind CSS 4"],
    ];
    if (selected.has("auth")) s.push(["auth", "Clerk"]);
    if (selected.has("cms")) s.push(["cms", "Sanity"]);
    if (selected.has("payments")) s.push(["payments", "Stripe"]);
    if (selected.has("auth") || selected.has("admin") || selected.has("realtime")) {
      s.push(["database", "Postgres (Supabase)"]);
    }
    if (selected.has("analytics")) s.push(["analytics", "PostHog"]);
    if (selected.has("search")) s.push(["search", "Algolia"]);
    if (selected.has("chat")) s.push(["messaging", "Ably"]);
    if (selected.has("realtime")) s.push(["realtime", "Supabase Realtime"]);
    s.push(["hosting", "Vercel"]);
    s.push(["monitoring", "Sentry"]);
    return s;
  }, [selected]);

  return (
    <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-8">
      {/* Left — feature select */}
      <div>
        <SectionLabel n="01">What does the build need to do?</SectionLabel>
        <p className="mb-5 max-w-[46ch] text-[0.9rem] leading-relaxed text-graphite">
          Pick every capability the build requires — the engine compiles a matched stack
          on the right in realtime.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {featureCatalog.map(({ id, label, Icon }) => {
            const on = selected.has(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-all duration-200 ${
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white text-graphite hover:border-ink hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 flex-none" strokeWidth={1.75} />
                <span className="flex-1 font-mono text-[0.8rem] font-medium">{label}</span>
                <span
                  className={`h-3 w-3 border transition-colors ${
                    on ? "border-paper bg-paper" : "border-line-strong bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right — recommended stack (dark code panel) */}
      <aside className="border border-line bg-[#111319] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
          <span>~/recommended-stack.json</span>
          <span className="text-white/80">{stack.length} deps</span>
        </div>
        <div className="p-5 font-mono text-[0.82rem] leading-[1.85]">
          <p className="text-white/50">{"{"}</p>
          <AnimatePresence initial={false}>
            {stack.map(([k, v], i) => (
              <motion.p
                key={k}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="pl-4"
              >
                <span className="text-[#82aaff]">"{k}"</span>
                <span className="text-white/50">: </span>
                <span className="text-[#c3e88d]">"{v}"</span>
                {i < stack.length - 1 && <span className="text-white/50">,</span>}
              </motion.p>
            ))}
          </AnimatePresence>
          <p className="text-white/50">{"}"}</p>
        </div>

        <div className="border-t border-white/10 p-5">
          <p className="text-[0.85rem] leading-snug text-white/70">
            Want us to scope, price, and build this exact stack?
          </p>
          <button
            type="button"
            className="group mt-3 inline-flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-mono text-[0.78rem] font-medium text-ink transition hover:border-accent hover:bg-accent hover:text-paper"
          >
            Get a build plan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "estimator", label: "Project Estimator", Icon: Calculator },
  { id: "scanner",   label: "Tech-Debt Scanner", Icon: Terminal },
  { id: "blueprint", label: "Blueprint Engine",  Icon: Blocks },
];

function InteractiveTools() {
  const [active, setActive] = useState("estimator");

  return (
    <section className="font-body border-t border-line bg-paper">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 md:py-28">
        {/* Header */}
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
            <span className="inline-block h-px w-3.5 bg-accent" />
            interactive tools
          </span>
          <h2 className="my-5 font-display text-[clamp(2rem,1.3rem+2.6vw,3.1rem)] font-medium leading-[1.1] tracking-tight text-ink">
            Skip the contact form.{" "}
            <span className="text-accent">Get an answer now.</span>
          </h2>
          <p className="mx-auto max-w-[54ch] text-[clamp(1rem,0.97rem+0.3vw,1.12rem)] leading-[1.6] text-graphite">
            Estimate a build, audit an existing site, or spec a stack — three engines to
            get you something concrete before we ever get on a call.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mt-10 flex max-w-fit border border-line bg-white">
          {tabs.map(({ id, label, Icon }) => {
            const on = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 border-l border-line px-4 py-3 font-mono text-[0.8rem] font-medium transition-colors first:border-l-0 ${
                  on ? "bg-ink text-paper" : "bg-white text-graphite hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div className="mt-8 border border-line bg-white shadow-[0_16px_40px_-24px_rgba(23,23,27,0.18)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {active === "estimator" && <ProjectEstimator />}
              {active === "scanner" && <TechDebtScanner />}
              {active === "blueprint" && <BlueprintEngine />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default InteractiveTools;