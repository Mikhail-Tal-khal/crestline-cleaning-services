import Link from "next/link";
import { featuredServices } from "@/lib/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon, ArrowRightIcon } from "@/components/icons";
import Reveal from "@/components/reveal";

export default function FeaturedServices() {
  return (
    <section className="bg-white py-16 sm:py-24 dark:bg-charcoal">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our services"
              title="What would you like cleaned?"
              lede="Tap a service to see how we work and what it costs. Every job starts with a proper look at your space."
            />
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full font-sans text-[15px] font-semibold text-royal underline-offset-4 transition-colors duration-150 hover:text-royal-700 hover:underline dark:text-bright"
            >
              All services
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredServices.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={(index % 5) * 60} className="h-full">
                <Link
                  href={`/services#${service.id}`}
                  className="group flex h-full flex-col rounded-[22px] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover dark:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-royal/10 text-royal transition-colors duration-200 group-hover:bg-royal group-hover:text-white dark:bg-bright/15 dark:text-bright dark:group-hover:bg-bright dark:group-hover:text-navy">
                    <ServiceIcon id={service.id} className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-4 font-sans text-[15px] font-bold leading-snug text-charcoal dark:text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-5 text-slate-600 dark:text-silver/90">
                    {service.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-royal dark:text-bright">
                    Learn more
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
