"use client";

const projects = [
  {
    name: "Tirupati Security Business Website",
    short: "Corporate website built for a security services business.",
    full: "Designed and developed a modern corporate website for Tirupati Security Services. Built with a performance-first approach, structured React components, and subtle motion to elevate brand presence.",
    tech: ["Vite", "React", "Tailwind CSS", "Framer Motion"],
    repo: "https://github.com/arath089/tirupati-security-services",
    live: "https://tirupatisecurity.com",
    color: "bg-rose-500/80 border-rose-500",
  },
  {
    name: "Lexilens",
    short: "AI-powered dictionary with contextual definitions.",
    full: "AI-powered dictionary built with Next.js and OpenAI. Real-time definitions, contextual explanations, and intelligent synonym generation.",
    tech: ["Next.js", "OpenAI"],
    repo: "https://github.com/arath089/lexilens",
    live: "https://lexilens.vercel.app/",
    color: "bg-[#4285F4]/70 border-[#4285F4]",
  },
  {
    name: "PDF Exporter App",
    short: "Dynamic PDF generation utility.",
    full: "Utility application for generating structured PDFs dynamically with configurable templates and data inputs.",
    tech: ["Node", "JavaScript"],
    repo: "https://github.com/arath089/pdf-exporter-app",
    live: "https://pdf-exporter.com/",
    color: "bg-indigo-500/70 border-indigo-500",
  },
  {
    name: "React Demo Shoe Store",
    short: "Interactive React eCommerce demo store.",
    full: "Built a fully interactive demo shoe store to explore modern React architecture. Implemented dynamic cart state management, product filtering, quantity controls, and checkout flow simulation to better understand scalable commerce UI patterns.",
    tech: ["React", "State Management", "Vercel"],
    repo: "https://github.com/arath089/react-cart",
    live: "https://react-cart-lilac.vercel.app/",
    color: "bg-[#EA4335]/80 border-[#EA4335]",
  },
  {
    name: "Harvest Tracker",
    short: "Shopify ↔ Harvest workflow sync tool.",
    full: "Internal engineering tool syncing Shopify workflows with Harvest to improve billing accuracy and reduce manual reconciliation.",
    tech: ["TypeScript", "Shopify API"],
    repo: "https://github.com/arath089/harvest-project-tracker",
    color: "bg-[#34A853]/70 border-[#34A853]",
  },
  {
    name: "Canvas Playground",
    short: "Rendering & interaction performance tests.",
    full: "Experimenting with HTML canvas rendering, animation performance techniques, and interaction systems.",
    tech: ["JavaScript", "Canvas API"],
    repo: "https://github.com/arath089/canvas-playground",
    live: "https://canvas-playground-xi.vercel.app/",
    color: "bg-[#FBBC05]/70 border-[#FBBC05]",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-6xl px-4 pt-20 pb-20 mx-auto md:pt-40"
    >
      {/* Header */}
      <div className="mb-14">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Independent Work
        </h3>

        <p className="mt-3 text-2xl font-medium text-white md:text-3xl">
          Selected engineering projects exploring tooling, experimentation, and
          product thinking.
        </p>
      </div>

      {/* Grid */}
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((p, index) => (
          <li
            key={p.name}
            className={`
              rounded-2xl
              p-8
              border
              ${p.color}
              transition-all
              duration-300
              hover:-translate-y-1
              hover:opacity-90
              md:h-[320px]
              ${index >= 4 ? "hidden md:block" : ""}
            `}
          >
            <h4 className="text-lg font-semibold text-white">{p.name}</h4>

            {/* Mobile */}
            <p className="mt-3 leading-relaxed text-white md:hidden">
              {p.short}
            </p>

            {/* Desktop */}
            <p className="hidden mt-3 leading-relaxed text-white md:block">
              {p.full}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs text-white border rounded-full bg-black/40 border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-black transition bg-white rounded-lg hover:bg-white/90"
                >
                  View Live →
                </a>
              )}

              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-white transition border rounded-lg border-white/40 hover:bg-white/10"
                >
                  View Code
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
