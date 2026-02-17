"use client";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl px-4 mx-auto pt-28">
      <div className="mb-8">
        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Contact
        </h3>
        <p className="mt-2 text-2xl font-medium md:text-3xl">
          Have a project? Let’s talk.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6"
      >
        <p className="text-zinc-300">
          I take on a small number of projects focused on impactful UX and
          measurable outcomes.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a
            href="mailto:architrathi808@gmail.com"
            className="rounded-xl bg-white px-5 py-3 text-black font-medium hover:scale-[1.02] active:scale-[0.99] transition"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/archit-rathi/"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 transition border rounded-xl border-white/20 text-white/90 hover:bg-white/10"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
}
