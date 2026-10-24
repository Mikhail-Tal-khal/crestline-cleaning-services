"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Service, ServiceId } from "@/lib/services";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  InfoIcon,
  ServiceIcon,
} from "@/components/icons";

/**
 * iOS-style disclosure list: every service expands in place with a smooth
 * height animation. Anchors from the homepage open the matching service and
 * scroll to it.
 */
export default function ServiceAccordion({ services }: { services: Service[] }) {
  const [openId, setOpenId] = useState<ServiceId | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as ServiceId;
    if (hash && services.some((s) => s.id === hash)) {
      setOpenId(hash);
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [services]);

  const jumpTo = (id: ServiceId) => {
    setOpenId(id);
    window.history.replaceState(null, "", `#${id}`);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
  };

  return (
    <div>
      <nav aria-label="Jump to a service" className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => jumpTo(service.id)}
            aria-current={openId === service.id ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border-[0.5px] px-4 text-[13px] font-semibold transition-colors duration-150",
              openId === service.id
                ? "border-transparent bg-royal text-white dark:bg-bright dark:text-navy"
                : "border-navy/15 bg-white text-charcoal hover:border-royal/40 hover:text-royal dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:border-bright/50"
            )}
          >
            <ServiceIcon id={service.id} className="h-4 w-4" />
            {service.name}
          </button>
        ))}
      </nav>

      <div className="mt-8 space-y-4">
        {services.map((service) => {
          const open = openId === service.id;
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className="scroll-mt-24"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-[22px] bg-white shadow-card transition-shadow duration-300 dark:bg-white/[0.06]",
                  open && "ring-2 ring-royal/30 dark:ring-bright/35"
                )}
              >
                <h2 className="m-0" id={`${service.id}-title`}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : service.id)}
                    aria-expanded={open}
                    aria-controls={`${service.id}-panel`}
                    className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-200",
                        open
                          ? "bg-royal text-white dark:bg-bright dark:text-navy"
                          : "bg-royal/10 text-royal dark:bg-bright/15 dark:text-bright"
                      )}
                    >
                      <ServiceIcon id={service.id} className="h-[22px] w-[22px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-[16px] font-bold text-charcoal dark:text-white sm:text-[17px]">
                        {service.name}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[13px] leading-5 text-slate-500 dark:text-silver/80">
                        {service.short}
                      </span>
                    </span>
                    {service.pricingNote && (
                      <span className="hidden shrink-0 rounded-full bg-royal/10 px-3.5 py-1.5 text-[12px] font-semibold text-royal dark:bg-bright/15 dark:text-bright lg:inline">
                        {service.pricingNote}
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      aria-hidden="true"
                    >
                      <ChevronDownIcon className="h-5 w-5 shrink-0 text-slate-400 dark:text-silver/70" />
                    </motion.span>
                  </button>
                </h2>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`${service.id}-panel`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t-[0.5px] border-navy/[0.06] p-5 dark:border-white/[0.08] sm:p-6">
                        <div
                          className={cn(
                            "grid gap-6",
                            service.image && "md:grid-cols-[1.15fr_1fr]"
                          )}
                        >
                          <div>
                            <p className="max-w-2xl text-[15px] leading-7 text-slate-600 dark:text-silver/95">
                              {service.intro}
                            </p>

                            <h3 className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.14em] text-royal dark:text-bright">
                              What&apos;s included
                            </h3>
                            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                              {service.includes.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2.5 text-[14px] leading-6 text-charcoal dark:text-silver"
                                >
                                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-royal dark:text-bright" />
                                  {item}
                                </li>
                              ))}
                            </ul>

                            {service.notes.length > 0 && (
                              <aside
                                aria-label={`Good to know — ${service.name}`}
                                className="mt-5 rounded-[16px] bg-soft p-4 dark:bg-white/[0.05]"
                              >
                                <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-charcoal dark:text-white">
                                  <InfoIcon className="h-4 w-4 text-royal dark:text-bright" />
                                  Good to know
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                  {service.notes.map((note) => (
                                    <li
                                      key={note}
                                      className="text-[13px] leading-6 text-slate-600 dark:text-silver/90"
                                    >
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </aside>
                            )}

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                              {service.pricingNote && (
                                <span className="inline-flex items-center rounded-full bg-royal/10 px-4 py-2 text-[13px] font-semibold text-royal dark:bg-bright/15 dark:text-bright">
                                  {service.pricingNote}
                                </span>
                              )}
                              <Link
                                href="/packages"
                                className="inline-flex min-h-11 items-center gap-1.5 rounded-full font-sans text-[14px] font-semibold text-royal underline-offset-4 hover:underline dark:text-bright"
                              >
                                See pricing
                                <ArrowRightIcon className="h-4 w-4" />
                              </Link>
                              <ButtonLink
                                href={`/request-a-quote?service=${service.id}`}
                                variant="primary"
                                size="sm"
                              >
                                Request a quote
                              </ButtonLink>
                            </div>
                          </div>

                          {service.image && service.imageAlt && (
                            <div className="self-start">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-frame">
                                <Image
                                  src={service.image}
                                  alt={service.imageAlt}
                                  fill
                                  sizes="(min-width: 768px) 40vw, 100vw"
                                  className="object-cover"
                                />
                              </div>
                              <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-silver/60">
                                Illustrative service imagery
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
