import { SectionHeading } from "@/components/ui/section-heading";
import {
  BuildingIcon,
  ClipboardIcon,
  LayersIcon,
  ReceiptIcon,
  SearchIcon,
  SprayIcon,
} from "@/components/icons";
import Reveal from "@/components/reveal";

const benefits = [
  {
    icon: ReceiptIcon,
    title: "Transparent quotations",
    copy: "You see the price and what it covers before anything starts.",
  },
  {
    icon: LayersIcon,
    title: "Flexible packages",
    copy: "Book one sofa or the whole house. Packages are there when they help — never pushed.",
  },
  {
    icon: SprayIcon,
    title: "Professional equipment",
    copy: "Proper extraction machines and tools, chosen for your fabric — not a one-size job.",
  },
  {
    icon: SearchIcon,
    title: "Careful surface assessment",
    copy: "We check every fabric before any water touches it.",
  },
  {
    icon: ClipboardIcon,
    title: "Methodical workmanship",
    copy: "An orderly process, repeat passes, and a final check before we call it done.",
  },
  {
    icon: BuildingIcon,
    title: "Homes and businesses",
    copy: "From a bedsitter to a hotel floor — same care, same standard.",
  },
];

export default function WhyChooseCrestline() {
  const half = Math.ceil(benefits.length / 2);
  const columns = [benefits.slice(0, half), benefits.slice(half)];

  return (
    <section className="bg-white py-16 sm:py-24 dark:bg-charcoal">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Why choose Crestline"
            title="Why neighbours choose Crestline."
            lede="The things people tell us they value most."
            align="center"
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 lg:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-3">
              {column.map((benefit, index) => (
                <Reveal key={benefit.title} delay={index * 60}>
                  <div className="flex items-start gap-4 rounded-[22px] bg-soft p-5 dark:bg-white/[0.06]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-royal/10 text-royal dark:bg-bright/15 dark:text-bright">
                      <benefit.icon className="h-[22px] w-[22px]" />
                    </span>
                    <div>
                      <h3 className="font-sans text-[15px] font-bold text-charcoal dark:text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-[13.5px] leading-5 text-slate-600 dark:text-silver/90">
                        {benefit.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
