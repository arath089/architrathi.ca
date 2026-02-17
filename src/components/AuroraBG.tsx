type Preset = "arctic" | "nocturne" | "glacier";

const PALETTES: Record<Preset, { c1: string; c2: string; c3: string }> = {
  arctic: { c1: "188 92% 60%", c2: "160 84% 45%", c3: "210 90% 62%" }, // cyan / emerald / blue
  nocturne: { c1: "173 72% 45%", c2: "84 80% 56%", c3: "173 72% 45%" }, // teal / lime / teal
  glacier: { c1: "199 89% 56%", c2: "188 92% 60%", c3: "217 91% 60%" }, // sky / cyan / blue
};

export default function AuroraBG({ preset = "arctic" }: { preset?: Preset }) {
  const { c1, c2, c3 } = PALETTES[preset];

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10"
      style={
        {
          background: `
            radial-gradient(1100px 520px at 12% 10%,  hsla(${c1} / .14), transparent 60%),
            radial-gradient( 900px 520px at 88% 18%,  hsla(${c3} / .12), transparent 58%),
            radial-gradient( 800px 640px at 50% 115%, hsla(${c2} / .10), transparent 62%)
          `,
          filter: "saturate(110%) contrast(104%)",
          ["--c1" as string]: `hsla(${c1} / .14)`,
          ["--c2" as string]: `hsla(${c2} / .12)`,
        } as React.CSSProperties
      }
    >
      {/* drifting “curtains” */}
      <div
        className="absolute -inset-[10%] mix-blend-screen blur-[40px] opacity-80 animate-auroraDrift"
        style={{
          background: `
            conic-gradient(from 180deg at 30% 40%, var(--c1) 0 40%, transparent 60% 100%),
            conic-gradient(from   0deg at 70% 60%, var(--c2) 0 35%, transparent 55% 100%)
          `,
        }}
      />
      <div
        className="absolute -inset-[12%] mix-blend-screen blur-[62px] opacity-60 scale-[1.08] animate-auroraDriftSlow"
        style={{
          background: `
            conic-gradient(from 120deg at 28% 35%, var(--c1) 0 38%, transparent 58% 100%),
            conic-gradient(from -40deg at 72% 65%, var(--c2) 0 30%, transparent 55% 100%)
          `,
        }}
      />
    </div>
  );
}
