import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, X } from "lucide-react";

const team = [
  {
    name: "Sankar", // TODO: full name
    title: "Founder & Full-Stack Developer",
    specialty: "React, Node.js, end-to-end web builds",
    experience: "TODO yrs", // TODO
    bio: "Leads projects from first wireframe to launch, and is the main point of contact for clients.", // TODO: personalise
    skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    achievements: ["30+ websites shipped"], // TODO: verify
    social: {
      github: "#",   // TODO
      linkedin: "#", // TODO
      twitter: "#",  // TODO
      email: "mailto:sankar@swiftnova.dev", // TODO: real mailbox on new domain
    },
  },
  {
    name: "Rafel", // TODO: full name
    title: "Co-Founder & Backend Developer",
    specialty: "APIs, databases, integrations",
    experience: "TODO yrs", // TODO
    bio: "Owns the server side — APIs, data, and the integrations that keep client sites running.", // TODO: personalise
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Docker"],
    achievements: ["TODO"], // TODO
    social: {
      github: "#",   // TODO
      linkedin: "#", // TODO
      twitter: "#",  // TODO
      email: "mailto:rafel@swiftnova.dev", // TODO: real mailbox
    },
  },
  // ─── Optional placeholder rows — fill in real teammates or DELETE ───
  {
    name: "TODO: Frontend dev",
    title: "Frontend Developer",
    specialty: "UI engineering, performance",
    experience: "TODO yrs",
    bio: "TODO",
    skills: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    achievements: ["TODO"],
    social: { github: "#", linkedin: "#", twitter: "#", email: "#" }, // TODO
  },
  {
    name: "TODO: Designer",
    title: "Web & UI/UX Designer",
    specialty: "Interface design, design systems",
    experience: "TODO yrs",
    bio: "TODO",
    skills: ["Figma", "UI Design", "Prototyping", "Design Systems", "Accessibility"],
    achievements: ["TODO"],
    social: { github: "#", linkedin: "#", twitter: "#", email: "#" }, // TODO
  },
  {
    name: "TODO: SEO/support",
    title: "SEO & Maintenance Specialist",
    specialty: "Technical SEO, performance, ongoing support",
    experience: "TODO yrs",
    bio: "TODO",
    skills: ["Technical SEO", "Core Web Vitals", "Analytics", "Content"],
    achievements: ["TODO"],
    social: { github: "#", linkedin: "#", twitter: "#", email: "#" }, // TODO
  },
];

const filters = [
  { id: "all",       label: "All team" },
  { id: "developer", label: "Developers" },
  { id: "design",    label: "Design" },
  { id: "seo",       label: "SEO & Support" },
];

const initials = (name) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

const socialIcon = { github: Github, linkedin: Linkedin, twitter: Twitter, email: Mail };

const TeamSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState(null);

  const filteredTeam = useMemo(() => {
    if (activeFilter === "all") return team;
    return team.filter((m) => m.title.toLowerCase().includes(activeFilter));
  }, [activeFilter]);

  const visibleTeam = filteredTeam.slice(0, visibleCount);

  return (
    <section className="font-body bg-paper border-t border-line">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] lowercase text-faint">
              <span className="inline-block h-px w-3.5 bg-accent" />
              the studio
            </span>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(1.75rem,1.2rem+2vw,2.6rem)] font-medium tracking-tight text-ink">
              The people who ship it.
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  setVisibleCount(6);
                }}
                className={`relative pb-1 font-mono text-[0.8rem] transition ${
                  activeFilter === f.id
                    ? "text-ink"
                    : "text-faint hover:text-graphite"
                }`}
              >
                {f.label}
                {activeFilter === f.id && (
                  <span className="absolute -bottom-px left-0 h-[1.5px] w-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {visibleTeam.map((member, i) => (
            <motion.button
              key={member.name}
              onClick={() => setSelected(member)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="group border-b border-r border-line bg-white p-7 text-left transition hover:bg-paper"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 flex-none place-items-center border border-line-strong bg-paper font-mono text-[0.95rem] font-semibold text-ink">
                  {initials(member.name)}
                </span>
                <span className="h-[7px] w-[7px] rounded-full bg-green-600" title="Available" />
              </div>

              <h3 className="mt-5 font-display text-[1.2rem] font-medium text-ink">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-[0.74rem] text-accent">
                {member.title}
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-graphite">
                {member.bio}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.72rem] text-faint">
                <span>{member.experience}</span>
                <span className="text-ink transition group-hover:text-accent">
                  view →
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filteredTeam.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + 3)}
              className="inline-flex items-center border border-line-strong px-5 py-3 font-mono text-[0.8rem] text-ink transition hover:border-ink"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg border border-line bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-3 font-mono text-[0.72rem] text-faint">
                <span>~/team/{selected.name.split(" ")[0].toLowerCase()}</span>
                <button onClick={() => setSelected(null)} aria-label="Close">
                  <X className="h-4 w-4 text-graphite hover:text-ink" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 flex-none place-items-center border border-line-strong bg-paper font-mono text-[1.1rem] font-semibold text-ink">
                    {initials(selected.name)}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.4rem] font-medium text-ink">
                      {selected.name}
                    </h3>
                    <p className="font-mono text-[0.76rem] text-accent">
                      {selected.title}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[0.95rem] leading-relaxed text-graphite">
                  {selected.bio}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                  <div>
                    <dt className="font-mono text-[0.68rem] text-faint">specialty</dt>
                    <dd className="mt-1 text-[0.9rem] text-ink">{selected.specialty}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.68rem] text-faint">experience</dt>
                    <dd className="mt-1 text-[0.9rem] text-ink">{selected.experience}</dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="font-mono text-[0.68rem] text-faint">skills</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.skills.map((s) => (
                      <span
                        key={s}
                        className="border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] text-graphite"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-4 border-t border-line pt-5">
                  {Object.entries(selected.social).map(([platform, url]) => {
                    const Icon = socialIcon[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-graphite transition hover:text-accent"
                        aria-label={platform}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;