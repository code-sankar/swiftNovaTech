import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const services = [
  ["Custom Web Development", "/web"],
  ["E-commerce Development", "/ecommerce"],
  ["Web Applications & SaaS", "/web-apps"],
  ["CMS & Headless", "/cms"],
  ["Website Design", "/design"],
  ["Maintenance & SEO", "/maintenance"],
  ["Mobile App Development", "/mobile"],
];

const links = [
  ["Why Us", "/whyUs"],
  ["Case Studies", "/cases"],
  ["Technologies", "/tech"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const legalLinks = [
  ["Privacy Policy",   "/privacy-policy"],
  ["Terms of Service", "/terms-of-service"],
  ["Disclaimer",       "/disclaimer"],
  ["Sitemap",          "/sitemap"],
];

// TODO: replace "#" with real profile URLs before launch — dead social links hurt trust.
const socials = [
  { Icon: Facebook, href: "#", label: "SwiftNova on Facebook" },
  { Icon: Twitter,  href: "#", label: "SwiftNova on X" },
  { Icon: Linkedin, href: "#", label: "SwiftNova on LinkedIn" },
  { Icon: Github,   href: "#", label: "SwiftNova on GitHub" },
];

const ColHead = ({ children }) => (
  <h4 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/40">
    {children}
  </h4>
);

const linkCls =
  "relative text-[0.9rem] text-paper/65 transition-colors hover:text-paper focus:outline-none focus-visible:text-paper";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const Footer = () => {
  const year = new Date().getFullYear();
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.9, 1], ["0%", "-10%"]);

  return (
    <footer className="font-body relative overflow-hidden bg-ink text-paper">
      {/* Background Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8">
        {/* ---- Nav grid ---- */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-2 gap-x-8 gap-y-12 pt-16 pb-14 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr_1.35fr]">
          {/* Brand */}
          <motion.div variants={fadeUp} custom={0} className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-[64px] w-[42px] place-items-center">
                <img
                  src="https://res.cloudinary.com/dx7b8hfwm/image/upload/v1783183469/Gemini_Generated_Image_rm3dvgrm3dvgrm3d_1_1_otjrzm.png"
                  alt="SwiftNova logo"
                  className="h-full w-full object-contain invert brightness-0"
                />
              </span>
              <span className="leading-none">
                <span className="font-display text-[1.12rem] font-semibold tracking-tight text-paper">
                  SwiftNova
                </span>
                <br />
                <span className="font-mono text-[0.62rem] text-paper/45">
                  Web Design &amp; Development Studio
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-[32ch] text-[0.9rem] leading-relaxed text-paper/60">
              Building fast, modern websites for teams worldwide — from first
              wireframe to launch and beyond.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/55 transition-colors hover:text-accent focus:outline-none focus-visible:text-accent"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.nav variants={fadeUp} custom={1}>
            <ColHead>Services</ColHead>
            <ul className="space-y-2.5">
              {services.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className={`${linkCls} group`}>
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-paper/50 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Studio */}
          <motion.nav variants={fadeUp} custom={2}>
            <ColHead>Studio</ColHead>
            <ul className="space-y-2.5">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className={`${linkCls} group`}>
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-paper/50 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div variants={fadeUp} custom={3} className="col-span-2 md:col-span-1">
            <ColHead>Get in touch</ColHead>
            <ul className="space-y-3 text-[0.88rem] text-paper/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                <a href="#" target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  Madhurawada Area, Visakhapatnam
                  <br />
                  India · remote-first
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                {/* TODO: real number — keep the +91 international format for overseas clients */}
                <a href="tel:+917842043469" className="transition-colors hover:text-paper">+91 78420 43469</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                <a href="mailto:info@swiftnovatechlabs.com" className="transition-colors hover:text-paper">info@swiftnovatechlabs.com</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                <span>Mon–Fri · 09:00–18:00 IST<br />Overlaps EU &amp; US hours</span>
              </li>
            </ul>
          </motion.div>

          {/* Colophon — the typographic signature */}
          <motion.div variants={fadeUp} custom={4} className="col-span-2 border-l border-white/15 pl-5 md:col-span-4 lg:col-span-1">
            <ColHead>Colophon</ColHead>
            <p className="font-display text-[0.94rem] italic leading-relaxed text-paper/60">
              This site is set in a{" "}
              <span className="font-semibold not-italic text-paper">humanist grotesque</span>{" "}
              with a{" "}
              <span className="font-semibold not-italic text-paper">monospace</span>{" "}
              for captions and code. Engineered in{" "}
              <span className="font-semibold not-italic text-paper">React</span>,{" "}
              <span className="font-semibold not-italic text-paper">Vite</span> &amp;{" "}
              <span className="font-semibold not-italic text-paper">Tailwind</span>, and
              shipped on the edge — designed and developed remotely from{" "}
              <span className="font-semibold not-italic text-paper">Visakhapatnam</span>{" "}
              for teams across the US, UK &amp; EU.
            </p>
          </motion.div>
        </motion.div>

        {/* ---- Legal bar ---- */}
        <div className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 font-mono text-[0.72rem] text-paper/40 sm:flex-row">
          <p>© {year} SwiftNova Software Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map(([label, href]) => (
              <Link key={label} to={href} className="transition-colors hover:text-paper">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Oversized wordmark, bleeding off the bottom edge ---- */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <motion.div style={{ x }} className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="block translate-y-[12%] whitespace-nowrap font-display text-[clamp(4.5rem,20vw,18rem)] font-semibold leading-[0.82] tracking-[-0.045em] text-paper/5">
            SwiftNova
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;