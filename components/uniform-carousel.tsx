"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { HangerIcon } from "@/components/icons";

export type UniformSlide = { side: "front" | "back"; exists: boolean };

/**
 * Swipeable iOS-style card carousel for the official uniform designs,
 * with page dots. Slides snap; the dots are real buttons for keyboard users.
 */
export default function UniformCarousel({ slides }: { slides: UniformSlide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.scrollWidth / slides.length;
    setActive(Math.min(slides.length - 1, Math.round(track.scrollLeft / slideWidth)));
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Official Crestline uniform designs"
      >
        {slides.map(({ side, exists }) => (
          <figure
            key={side}
            className="w-[72%] shrink-0 snap-center sm:w-[58%]"
            aria-label={`Official Crestline uniform design — ${side} view`}
          >
            {exists ? (
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] border-[0.5px] border-white/20 shadow-frame">
                {/* Plain <img>: official files render at their own framing. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/brand/crestline-uniform-${side}.png`}
                  alt={`Official Crestline cleaning uniform design — ${side} view`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-4 rounded-[24px] border-[0.5px] border-dashed border-silver/40 bg-white/[0.06] p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-silver">
                  <HangerIcon className="h-6 w-6" />
                </span>
                <p className="font-sans text-sm font-semibold text-white">
                  Official uniform — {side} view
                </p>
                <p className="text-[13px] leading-5 text-silver/80">
                  The official {side} uniform photograph appears here once it is added
                  to the brand assets.
                </p>
              </div>
            )}
            <figcaption className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-silver/70">
              Uniform design — {side}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.side}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show ${slide.side} uniform design`}
            aria-current={active === index}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              active === index
                ? "w-6 bg-bright"
                : "w-2 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
