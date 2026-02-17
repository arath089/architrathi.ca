import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

type Props = {
  cover: string;
};

export default function HuKitchen({ cover }: Props) {
  return (
    <article className="relative text-white">
      {/* Hero */}
      <div className="relative w-full h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-20">
        <Image
          src={cover}
          alt="Hu Kitchen"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-24 text-center">
        <h1 className={`${cursive.className} text-6xl md:text-9xl font-bold`}>
          <Link
            href="https://hukitchen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            Hu Kitchen
          </Link>
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg font-semibold leading-relaxed">
          Engineering scalable Shopify architecture across <b>PDP refactors</b>,{" "}
          <b>accessibility compliance</b>, dynamic product modeling, and{" "}
          <b>enterprise privacy implementation</b>.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-32">
        {/* PDP Refactor */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">PDP Architecture Refactor</h2>

          <p className="leading-relaxed text-white/85">
            Led a full product detail page refactor transitioning from a legacy
            structure to a modular, maintainable architecture. Rebuilt layout
            logic using scalable section patterns, improved media rendering
            hierarchy, and modernized variant interaction patterns. The update
            reduced layout shift, improved performance stability, and created a
            flexible foundation for future product launches.
          </p>

          <p className="leading-relaxed text-white/85">
            Introduced <b>Barba.js-powered swatch transitions</b>, eliminating
            full page reloads when switching flavors. Preserved UI state,
            improved perceived speed, and created an app-like browsing
            experience within Shopify’s Liquid constraints.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <BeforeAfter
              label="Before"
              color="text-red-400"
              src="/work/hukitchen/pdp-before.png"
            />
            <BeforeAfter
              label="After"
              color="text-green-400"
              src="/work/hukitchen/pdp-after.png"
            />
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">Accessibility Overhaul</h2>

          <p className="leading-relaxed text-white/85">
            Executed a comprehensive accessibility initiative in collaboration
            with <b>AudioEye</b> and <b>Allyant A360 audit frameworks</b>. This
            was a deep semantic refactor — not surface-level fixes.
          </p>

          <p className="leading-relaxed text-white/85">
            Corrected heading hierarchy inconsistencies, improved landmark
            regions, implemented proper ARIA roles, refined keyboard navigation,
            and resolved focus management issues across modals and dynamic
            components. Refactored form labels and contrast ratios to ensure
            WCAG alignment and screen reader compatibility.
          </p>

          <p className="leading-relaxed text-white/85">
            Resulted in strong Lighthouse accessibility scores and significantly
            reduced automated audit flags across multiple testing tools.
          </p>

          <ImageBlock src="/work/hukitchen/accessibility.png" />
        </section>

        {/* Bites Launch */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">
            Bites Product Launch & Dynamic Content Modeling
          </h2>

          <p className="leading-relaxed text-white/85">
            Launched Hu Kitchen’s Dark Chocolate Bites line, including PDP
            enhancements and a complex demo scheduling system. Shopify does not
            natively support relational data structures, so we architected a
            scalable solution using <b>metaobjects and metafields</b>.
          </p>

          <p className="leading-relaxed text-white/85">
            Built dynamic relationships between locations, recurring schedules,
            date ranges, and product associations. Designed a structured data
            model allowing non-technical stakeholders to manage event logic
            without theme rewrites.
          </p>

          <p className="leading-relaxed text-white/85">
            This implementation simulated CMS-level structured content within
            Shopify — enabling scalable expansion without increasing technical
            debt.
          </p>

          <div className="flex justify-center">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7323724668178169857"
              height="817"
              width="504"
              title="Embedded post"
            ></iframe>
          </div>

          <div className="w-full overflow-hidden rounded-2xl">
            <video
              src="/work/hukitchen/bites-demo.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-2xl max-h-[700px]"
              style={{
                filter: "brightness(1.1) contrast(1.05)",
              }}
            />
          </div>
        </section>

        {/* Privacy Implementation */}
        <section className="space-y-12">
          <h2 className="text-4xl font-semibold">
            Enterprise Privacy Implementation: OneTrust
          </h2>

          <p className="leading-relaxed text-white/85">
            Led full implementation of <b>OneTrust</b> for GDPR/CCPA compliance
            within Shopify’s constrained theme architecture. Performed detailed
            cookie inventory analysis, categorized scripts, and structured
            consent-based execution logic.
          </p>

          <p className="leading-relaxed text-white/85">
            Refactored marketing pixel loading to conditionally execute based on
            user consent state. Managed script sequencing to prevent analytics
            breakage while maintaining compliance across global regions.
          </p>

          <p className="leading-relaxed text-white/85">
            Required coordination across engineering, marketing, and analytics
            stakeholders. Delivered a stable, compliant privacy framework with
            no performance regression.
          </p>

          <ImageBlock src="/work/hukitchen/privacy.png" />
        </section>
      </div>
    </article>
  );
}

/* ---------------- Components ---------------- */

function BeforeAfter({
  label,
  color,
  src,
}: {
  label: string;
  color: string;
  src: string;
}) {
  return (
    <div className="space-y-4">
      <p className={`text-sm font-semibold tracking-wider uppercase ${color}`}>
        {label}
      </p>

      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={src}
          alt=""
          width={1600}
          height={1200}
          quality={100}
          className="object-contain w-full h-auto"
        />
      </div>
    </div>
  );
}

function ImageBlock({ src }: { src: string }) {
  return (
    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden">
      <Image src={src} alt="" fill className="object-contain md:object-cover" />
    </div>
  );
}
