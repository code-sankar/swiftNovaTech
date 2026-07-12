import { MapPin, Phone, Mail, Clock, Github, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

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

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="font-body border-t border-line bg-paper">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-[80px] w-[50px] place-items-center ">
                {/* TODO: swap placeholder for the real SwiftNova logo mark */}
                <img
                  src="https://res.cloudinary.com/dx7b8hfwm/image/upload/v1783183469/Gemini_Generated_Image_rm3dvgrm3dvgrm3d_1_1_otjrzm.png"
                  alt="SwiftNova logo"
                />
              </span>
              <span className="leading-none">
                <span className="font-display text-[1.12rem] font-semibold tracking-tight">
                  SwiftNova
                </span>
                <br />
                <span className="font-mono text-[0.62rem] text-faint">
                  Web Design &amp; Development Studio
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-[32ch] text-[0.9rem] leading-relaxed text-graphite">
              Building fast, modern websites for teams worldwide — from first
              wireframe to launch and beyond.
            </p>
            <div className="mt-5 flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-graphite transition hover:text-accent"
                  aria-label={label}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-mono text-[0.72rem] lowercase text-faint">services</h4>
            <ul className="space-y-2.5">
              {services.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-[0.9rem] text-graphite transition hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4 className="mb-4 font-mono text-[0.72rem] lowercase text-faint">studio</h4>
            <ul className="space-y-2.5">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-[0.9rem] text-graphite transition hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-mono text-[0.72rem] lowercase text-faint">get in touch</h4>
            <ul className="space-y-3 text-[0.88rem] text-graphite">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                {/* TODO: add real street address if you want one shown; fine as-is for a remote-first studio */}
                <span>Madhurawada Area, Visakhapatnam<br />India · remote-first</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                {/* TODO: real number — keep the +91 international format for overseas clients */}
                <a href="tel:+917842043469" className="transition hover:text-ink">+91 78420 43469</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                {/* TODO: stand up this mailbox on the new domain before launch */}
                <a href="mailto:info@swiftnovatechlabs.com" className="transition hover:text-ink">info@swiftnovatechlabs.com</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.6} />
                <span>Mon–Fri · 09:00–18:00 IST<br />Overlaps EU &amp; US hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col justify-between gap-3 border-t border-line py-6 font-mono text-[0.72rem] text-faint sm:flex-row">
          <p>© {year} SwiftNova — Sankar &amp; Rafel Software Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map(([label, href]) => (
              <Link key={label} to={href} className="transition hover:text-ink">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;