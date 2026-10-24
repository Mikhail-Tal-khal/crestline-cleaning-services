"use client";

import { useState } from "react";

/**
 * iOS-style before/after comparison slider. Until real project photos exist it
 * shows a clearly-labelled placeholder state — never a fabricated result.
 * The control is a native range input, so it works with keyboard, touch and
 * screen readers as well as drag.
 */
export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] shadow-card">
        {/* After (bottom layer) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,rgba(39,169,245,0.22),rgba(7,95,203,0.32))]"
        >
          <span className="rounded-full bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-royal">
            After
          </span>
          <span className="text-[13px] font-medium text-navy/70">
            A cared-for space
          </span>
        </div>

        {/* Before (top layer, clipped) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#D9DEE4,#B4BDC8)]"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <span className="rounded-full bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
            Before
          </span>
          <span className="text-[13px] font-medium text-slate-600">
            Everyday wear
          </span>
        </div>

        {/* Divider + handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%` }}
        >
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white/90 shadow-[0_0_8px_rgba(16,24,40,0.25)]" />
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-charcoal shadow-card">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
            </svg>
          </div>
        </div>

        {/* Drag / keyboard control */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare before and after — placeholder preview"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-[13px] leading-5 text-slate-500 dark:text-silver/80">
        Placeholder preview — real before-and-after photos of Crestline projects will
        appear here once they exist.
      </figcaption>
    </figure>
  );
}
