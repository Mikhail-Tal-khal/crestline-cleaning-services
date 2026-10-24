import { InstagramIcon, TikTokIcon } from "@/components/icons";

/**
 * Instagram/TikTok-style tile grid that holds space for real Crestline content.
 * Deliberately empty: no invented posts, follower counts, likes or reviews.
 */
export default function PlaceholderGallery() {
  return (
    <ul className="mt-5 grid grid-cols-3 gap-2.5" aria-label="Placeholder social feed tiles">
      {Array.from({ length: 6 }).map((_, index) => {
        const Icon = index % 2 === 0 ? InstagramIcon : TikTokIcon;
        return (
          <li
            key={index}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-[16px] bg-soft text-slate-400 dark:bg-white/[0.06] dark:text-silver/60"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em]">
              Coming soon
            </span>
          </li>
        );
      })}
    </ul>
  );
}
