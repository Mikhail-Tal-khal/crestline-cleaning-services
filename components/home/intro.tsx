import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

export default function BrandIntro() {
  return (
    <section className="bg-soft py-16 sm:py-24 dark:bg-[#0B0E14]">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Why professional care"
            title="A space can look clean and still need professional care."
            lede={
              <>
                Sofas, mattresses, carpets and floors hold on to more than everyday
                cleaning reaches. We take our time, use the right equipment, and treat
                your space like it&apos;s ours.
              </>
            }
          />
          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                term: "Assessment",
                detail: "Every fabric gets checked before any work starts.",
              },
              {
                term: "Precision",
                detail: "Controlled methods, careful passes, no shortcuts.",
              },
              {
                term: "Discipline",
                detail: "Orderly from arrival to the final walk-through.",
              },
            ].map((item) => (
              <div key={item.term} className="border-t-[0.5px] border-navy/15 pt-4 dark:border-white/15">
                <dt className="font-sans text-sm font-bold text-charcoal dark:text-white">
                  {item.term}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-5 text-slate-600 dark:text-silver/90">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[1.75rem] border border-navy/[0.08] dark:border-white/[0.08]"
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-[26px] shadow-frame">
              <Image
                src="/images/equipment-detail.jpg"
                alt="Professional cleaning equipment — an extraction machine, sprayer, brushes and folded cloths — arranged neatly"
                fill
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
