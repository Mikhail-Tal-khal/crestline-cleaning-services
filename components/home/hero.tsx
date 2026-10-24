"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { MapPinIcon } from "@/components/icons";

const line1 = ["Professional", "cleaning."];
const line2 = ["A", "difference", "you", "can", "feel."];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const word = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 140, damping: 20 },
  },
};

const springIn = (delay: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: "spring" as const, stiffness: 200, damping: 22, delay },
});

/**
 * Homepage hero: cinematic image reveal, headline words rising in a stagger,
 * then the actions spring in. Honours reduced motion via the global
 * MotionConfig (transforms degrade to simple fades).
 */
export default function Hero() {
  return (
    <section className="on-navy relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_78%_18%,rgba(39,169,245,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-silver/25 to-transparent"
      />

      <div className="container-site relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              {...springIn(0.05)}
              className="inline-flex items-center gap-2 rounded-full border-[0.5px] border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-white backdrop-blur"
            >
              <MapPinIcon className="h-4 w-4 text-bright" />
              Serving Mombasa, Kenya
            </motion.p>

            <motion.h1
              variants={stagger}
              initial="hidden"
              animate="show"
              aria-label="Professional cleaning. A difference you can feel."
              className="mt-6 font-sans text-[2.6rem] font-bold leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.5rem]"
            >
              <span className="block" aria-hidden="true">
                {line1.map((w) => (
                  <motion.span key={w} variants={word} className="mr-[0.26em] inline-block last:mr-0">
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block" aria-hidden="true">
                {line2.map((w) => (
                  <motion.span key={w} variants={word} className="mr-[0.26em] inline-block last:mr-0">
                    {w}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              {...springIn(0.55)}
              className="mt-6 max-w-xl text-[17px] leading-7 text-silver"
            >
              We clean homes and workplaces across Mombasa — carefully, with the right
              equipment, and with a clear price based on the work you actually need. No
              guesswork. No pressure.
            </motion.p>

            <motion.div {...springIn(0.7)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/request-a-quote" variant="bright" size="lg">
                Request a Quote
              </ButtonLink>
              <ButtonLink href="/services" variant="outlineLight" size="lg">
                View Services
              </ButtonLink>
            </motion.div>

            <motion.p
              {...springIn(0.9)}
              className="mt-4 text-[13px] leading-5 text-silver/80"
            >
              No pressure. Tell us what you need and we&apos;ll send a clear price.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.06, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.75rem] border border-silver/20"
              />
              <div className="relative aspect-[16/11] overflow-hidden rounded-[26px] shadow-frame">
                <Image
                  src="/images/hero-living.jpg"
                  alt="A bright, well-kept living room with a light fabric sofa and woven rug in a coastal Mombasa home"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
