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

export default function OurPlace({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20 shadow-gray-600">
        <Image
          src={cover}
          alt="Our Place"
          fill
          priority
          className="object-cover scale-[1.02]"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://fromourplace.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
          >
            Our Place
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Scaling a <b>high-growth DTC brand</b> through{" "}
          <b>revenue-driven engineering</b>, <b>celebrity launch execution</b>,
          international expansion, and <b>headless commerce migration</b>.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-32">
        {/* Business Context */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Business Context</h2>

          <p className="leading-relaxed">
            Joined during a <b>critical hypergrowth phase</b> as the brand
            scaled toward <b>multi-million dollar global revenue</b>. The
            business required <b>frequent launches</b>, improved AOV,
            international expansion, and stronger technical scalability.
          </p>

          <p className="leading-relaxed">
            Evolved from <b>apprentice developer</b> to{" "}
            <b>primary client technical owner</b>, managing execution across
            launches and <b>revenue-impacting features</b>.
          </p>
        </section>

        {/* Selena Launch */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">
            Selena Gomez Collaboration Launch
          </h2>

          <p className="leading-relaxed">
            Served as <b>technical point person</b> for one of the agency’s{" "}
            <b>largest celebrity launches</b>. Owned deployment readiness,
            bundle logic, traffic surge preparation, and QA.
          </p>

          <p className="leading-relaxed">
            Generated <b>$1M+ in revenue within 24 hours</b> while maintaining{" "}
            <b>zero downtime under high traffic volume</b>.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Revenue (24h)" value="$1M+" />
            <Metric label="Traffic Surge" value="High Volume" />
            <Metric label="Stability" value="Zero Downtime" />
          </div>

          {/* Custom 3-image grid */}
          {/* Custom editorial layout */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Row 1 — large featured image */}
            <div className="relative w-full h-[520px] rounded-2xl overflow-hidden md:col-span-2">
              <Image
                src="/work/ourplace/selena-2.png"
                alt=""
                fill
                className="object-contain md:object-cover"
              />
            </div>

            {/* Row 2 — two side-by-side images */}
            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="/work/ourplace/selena-1.png"
                alt=""
                fill
                className="object-contain md:object-cover"
              />
            </div>

            <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
              <Image
                src="/work/ourplace/selena-3.png"
                alt=""
                fill
                className="object-contain md:object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7079226963411791874"
              height="713"
              width="504"
              title="Embedded post"
            ></iframe>
          </div>
        </section>

        {/* Revenue Optimization */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">
            Revenue Optimization: Dynamic Cart Upsells
          </h2>

          <p className="leading-relaxed">
            Designed and implemented <b>contextual cart upsells</b> based on
            product mappings — directly increasing <b>average order value</b>{" "}
            and <b>items per cart</b>.
          </p>

          <ul className="pl-6 space-y-2 list-disc">
            <li>
              <b>Product-to-product mapping logic</b>
            </li>
            <li>
              <b>Dynamic checkout integration</b>
            </li>
            <li>Reusable framework</li>
            <li>
              <b>Direct AOV growth impact</b>
            </li>
          </ul>

          <div className="grid gap-6 md:grid-cols-3">
            <Metric label="Primary Goal" value="Increase AOV" />
            <Metric label="Strategy" value="Contextual Upsells" />
            <Metric label="Outcome" value="Higher Cart Value" />
          </div>

          {/* Two-column layout instead of 3 */}
          <div className="grid gap-6 md:grid-cols-3">
            <ImageBlock src="/work/ourplace/upsell-1.png" />
            <ImageBlock src="/work/ourplace/upsell-2.png" />
            <ImageBlock src="/work/ourplace/upsell-3.png" />
          </div>
        </section>

        {/* Headless Migration */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold">Shopify → Headless (React)</h2>

          <p className="leading-relaxed">
            Contributed to migration from traditional Shopify architecture to a{" "}
            <b>React-based headless storefront</b> — improving{" "}
            <b>performance</b>, flexibility, and campaign scalability.
          </p>

          <ul className="pl-6 space-y-2 list-disc">
            <li>
              <b>React section migration</b>
            </li>
            <li>Metafield alignment</li>
            <li>
              <b>Improved frontend control</b>
            </li>
          </ul>

          {/* Single wide image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/work/ourplace/headless-1.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* International Expansion */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">Australian Store Expansion</h2>

          <p className="leading-relaxed">
            Supported regional storefront launch with <b>localized pricing</b>,
            shipping logic, tax configuration, and <b>full pre-launch QA</b> —
            enabling international revenue growth.
          </p>

          {/* Tall centered image */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
            <Image
              src="/work/ourplace/au-2.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
            <Image
              src="/work/ourplace/au-1.png"
              alt=""
              fill
              className="object-contain object-top"
            />
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
