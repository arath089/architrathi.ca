export default function Footer() {
  return (
    <footer className="max-w-6xl px-4 pt-20 mx-auto text-sm text-zinc-500">
      <div className="py-6 border-t border-white/10">
        <p>
          © {new Date().getFullYear()} Archit Rathi. Built with Next.js,
          Tailwind, and Motion.
        </p>
      </div>
    </footer>
  );
}
