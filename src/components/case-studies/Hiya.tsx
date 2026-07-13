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

/*
  TODO: drop real images into /public/work/hiya/ - the layout expects:
    /work/hiya/collection-1.png  (wide, collection page redesign section)
    /work/hiya/variant-a.png     (3-up grid, A/B/C test section)
    /work/hiya/variant-b.png     (3-up grid, A/B/C test section)
    /work/hiya/variant-c.png     (3-up grid, A/B/C test section)
*/

export default function Hiya({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20 shadow-gray-600">
        <Image
          src={cover}
          alt="Hiya"
          fill
          priority
          className="object-cover scale-[1.02]"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://hiyahealth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            Hiya
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Leading the redesign of the{" "}
          <b>highest-traffic collection experience</b> for a subscription-first
          children’s vitamin brand, with <b>conversion</b>,{" "}
          <b>experimentation</b>, and <b>accessibility</b> built in from the
          start.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-32">
        {/* Business Context */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Business Context</h2>

          <p className="leading-relaxed">
            Hiya is a <b>subscription-first DTC brand</b> where the main
            collection page is the front door for nearly every purchase
            journey. The business needed that page to <b>convert better</b>,
            support <b>rapid experimentation</b>, and stay accessible, without
            slowing down feature delivery. I led the frontend redesign{" "}
            <b>end to end</b>.
          </p>
        </section>

        {/* Collection Page Redesign */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">
            Redesigning the Main Collection Page
          </h2>

          <p className="leading-relaxed">
            Rebuilt the collection experience around{" "}
            <b>reusable collection card components</b>, so new products and
            layout variations could ship through configuration instead of
            one-off builds.
          </p>

          <p className="leading-relaxed">
            The centerpiece was <b>inline subscription add-to-cart</b> directly
            on the collection page, letting customers choose subscription
            options and add to cart without detouring through a product page,
            removing <b>a full step</b> from the primary purchase journey.
          </p>

          <p className="leading-relaxed">
            Rather than shipping one opinionated design, I built the page as{" "}
            <b>configurable test infrastructure</b> supporting simultaneous{" "}
            <b>A/B/C variants</b> through Intelligems, so the team could
            iterate on purchase flows with <b>data instead of debate</b>.
          </p>

          <p className="leading-relaxed">
            This was part of a broader experimentation practice: I have run{" "}
            <b>100+ Intelligems A/B experiments</b> across brands, covering PDP
            variants, purchase flows, and pricing displays.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Scope" value="Highest-traffic page" />
            <Metric label="Key Feature" value="Inline subscription ATC" />
            <Metric label="Variants" value="A/B/C simultaneous" />
            <Metric label="Tooling" value="Intelligems" />
            <Metric label="Experiments Run" value="100+ across brands" />
            <Metric label="Architecture" value="Reusable card components" />
          </div>

          {/* Single wide image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/work/hiya/collection-1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ImageBlock src="/work/hiya/variant-a.png" />
            <ImageBlock src="/work/hiya/variant-b.png" />
            <ImageBlock src="/work/hiya/variant-c.png" />
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Accessibility as a Feature</h2>

          <p className="leading-relaxed">
            Delivered <b>WCAG and ADA remediation</b> across the storefront,
            covering modal focus-trap behavior, screen-reader labeling, and{" "}
            <b>full keyboard accessibility</b>, so the redesigned experience
            worked for <b>every customer</b>, not just most of them.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Standard" value="WCAG / ADA" />
            <Metric label="Focus Areas" value="Modals, SR labels, keyboard" />
            <Metric label="Approach" value="Built in, not bolted on" />
          </div>
        </section>
      </div>
    </article>
  );
}

/* ---------- Small Reusable Blocks ---------- */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 border rounded-2xl bg-white/5 border-white/10 backdrop-blur-sm">
      <p className="text-sm text-white">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function ImageBlock({ src }: { src: string }) {
  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  );
}
