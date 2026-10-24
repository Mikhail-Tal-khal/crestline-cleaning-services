import { SectionHeading } from "@/components/ui/section-heading";
import { SocialButtons } from "@/components/social-buttons";
import BeforeAfterSlider from "@/components/before-after-slider";
import PlaceholderGallery from "@/components/placeholder-gallery";
import Reveal from "@/components/reveal";

/**
 * "Follow Crestline" — the four social platforms plus a clearly-marked place
 * for real project content. Nothing here is invented while the accounts are
 * still being set up.
 */
export default function FollowCrestline() {
  return (
    <section className="bg-white py-16 sm:py-24 dark:bg-charcoal">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Follow Crestline"
              title="See our work, meet the team."
              lede="Real projects, honest care tips and the occasional before-and-after — that's what we share. Find us on any of these."
            />
            <SocialButtons size="lg" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
            <BeforeAfterSlider />
            <div>
              <h3 className="font-sans text-lg font-bold text-charcoal dark:text-white">
                See our work
              </h3>
              <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                A place for real Crestline results — nothing staged, nothing borrowed.
              </p>
              <PlaceholderGallery />
              <p className="mt-4 text-[12.5px] leading-5 text-slate-500 dark:text-silver/70">
                Placeholder tiles — real Crestline posts will appear here once they
                exist. We don&apos;t invent posts, follower counts or reviews.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
