import { ButtonLink } from "@/components/ui/button";
import Reveal from "@/components/reveal";

export default function CtaSection() {
  return (
    <section className="bg-soft py-16 sm:py-24 dark:bg-[#0B0E14]">
      <div className="container-site">
        <Reveal>
          <div className="on-navy relative overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(39,169,245,0.16),transparent_70%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-sans text-[1.9rem] font-bold leading-tight tracking-[-0.02em] text-white text-balance sm:text-4xl">
                Let your space feel cared for again.
              </h2>
              <p className="mt-5 text-[16.5px] leading-7 text-silver">
                Tell us what you need cleaned. We&apos;ll send a quotation built around
                your actual home, furniture or space — and you decide after that.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <ButtonLink href="/request-a-quote" variant="bright" size="lg">
                  Request Your Quote
                </ButtonLink>
                <p className="text-[13px] text-silver/80">
                  No pressure — we&apos;ll quote your actual space and you decide after that.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
