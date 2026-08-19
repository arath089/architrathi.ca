import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

type Props = {
  cover: string;
};

// Scaffold for the Warner Music Group commerce case study.
// Not reachable yet — its slide in Work.tsx is commented out until
// there is shipped work to show. Needs a cover image at /work/wmg.jpg.
export default function WarnerMusic({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20 shadow-gray-600">
        <Image
          src={cover}
          alt="Warner Music Group"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://www.wmg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            Warner Music Group
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Building and owning the <b>in-house Shopify commerce platform</b>{" "}
          powering WMG&apos;s artist stores.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-32">
        {/* TODO: replace with real sections once there is shipped work to show */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Business Context</h2>

          <p className="leading-relaxed">
            Case study in progress — joined Warner Music Canada in August 2026
            as <b>Software Developer III</b> to build and own the in-house
            commerce platform behind artist storefronts.
          </p>
        </section>
      </div>
    </article>
  );
}
