import { getBrandAsset } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";
import UniformCarousel from "@/components/uniform-carousel";

export default function ProfessionalStandards() {
  const slides = [
    { side: "front" as const, exists: getBrandAsset("crestline-uniform-front.png").exists },
    { side: "back" as const, exists: getBrandAsset("crestline-uniform-back.png").exists },
  ];

  return (
    <section className="on-navy bg-navy py-16 sm:py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Professional standards"
              title="Professional from arrival to final inspection"
              tone="dark"
              lede={
                <>
                  Our technicians wear the Crestline uniform and follow an orderly
                  process — respectful in your home, careful with your things, and
                  clear with you at every step.
                </>
              }
            />
            <p className="mt-8 max-w-lg text-[13px] leading-5 text-silver/70">
              Shown here as the official Crestline uniform designs — the photographs
              present the uniform itself, not individual employees.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <UniformCarousel slides={slides} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
