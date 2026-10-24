import { SectionHeading } from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

const steps = [
  {
    title: "Tell us what needs cleaning",
    copy: "Send the location, sizes, and a few clear photos or a short video. That's all we need to start.",
  },
  {
    title: "Get a clear quotation",
    copy: "We work out the real scope and explain the price before you book. If something's unclear, we ask.",
  },
  {
    title: "We arrive ready",
    copy: "Our team comes prepared, checks the surfaces, and gets to work — carefully, and in order.",
  },
  {
    title: "Final check, together",
    copy: "We walk through the work with you, and share simple drying and ventilation tips where they help.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-soft py-16 sm:py-24 dark:bg-[#0B0E14]">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="How Crestline works"
            title="From your first message to the final walk-through."
          />
        </Reveal>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 80} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] bg-white p-6 shadow-card dark:bg-white/[0.06]">
                  <span className="font-sans text-[2rem] font-extrabold leading-none tracking-tight text-bright">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-sans text-[16px] font-bold leading-snug text-charcoal dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-slate-600 dark:text-silver/90">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
