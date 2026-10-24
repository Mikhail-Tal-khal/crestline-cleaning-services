import type { SVGProps } from "react";
import type { ServiceId } from "@/lib/services";

type P = SVGProps<SVGSVGElement>;

/**
 * Inline line-icon set (1.7px stroke, currentColor) — no emoji, no icon
 * dependency. Every icon is decorative (aria-hidden) unless given a role.
 */
function Svg({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SofaIcon = (p: P) => (
  <Svg {...p}>
    <path d="M20 11V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5" />
    <path d="M4 11a2 2 0 0 0-2 2v3.5a1.5 1.5 0 0 0 1.5 1.5h17a1.5 1.5 0 0 0 1.5-1.5V13a2 2 0 0 0-4 0v.5H6V13a2 2 0 0 0-2-2Z" />
    <path d="M5.5 18v1.5M18.5 18v1.5" />
  </Svg>
);

export const RugIcon = (p: P) => (
  <Svg {...p}>
    <rect x="4" y="6.5" width="16" height="11" rx="1" />
    <rect x="7" y="9" width="10" height="6" rx="0.5" />
    <path d="M8 4.5v2M12 4.5v2M16 4.5v2M8 17.5v2M12 17.5v2M16 17.5v2" />
  </Svg>
);

export const MattressIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3 20v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
    <path d="M3 20h18" />
    <path d="M6 12V9a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
    <path d="M3 17h18" />
  </Svg>
);

export const VacuumIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3 8h9.5a2.5 2.5 0 1 0-2.4-3.2" />
    <path d="M3 12h13.5a3 3 0 1 1-2.9 3.8" />
    <path d="M3 16h5.5" />
  </Svg>
);

export const HomeIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5.5h4V20" />
  </Svg>
);

export const BrushIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5V8" />
    <path d="M7.5 8h9l1.5 5H6l1.5-5Z" />
    <path d="M6.5 16.5h11" />
    <path d="M8 13v3.5M12 13v3.5M16 13v3.5" />
  </Svg>
);

export const BoxIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" />
    <path d="M3.5 7.5 12 12l8.5-4.5" />
    <path d="M12 12v9" />
  </Svg>
);

export const KeyIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="8" cy="16" r="3.5" />
    <path d="M10.5 13.5 20 4" />
    <path d="M16.5 7.5 19 10" />
  </Svg>
);

export const HardHatIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 15.5a8 8 0 0 1 16 0" />
    <path d="M3 15.5h18" />
    <path d="M3 15.5V17a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 17v-1.5" />
    <path d="M9.5 8.5V7a2.5 2.5 0 0 1 5 0v1.5" />
  </Svg>
);

export const BuildingIcon = (p: P) => (
  <Svg {...p}>
    <path d="M5.5 21V5.5A1.5 1.5 0 0 1 7 4h7.5A1.5 1.5 0 0 1 16 5.5V21" />
    <path d="M16 10.5h2.5A1.5 1.5 0 0 1 20 12v9" />
    <path d="M3.5 21h17" />
    <path d="M8.5 8h.01M11.5 8h.01M8.5 12h.01M11.5 12h.01M8.5 16h.01M11.5 16h.01" />
  </Svg>
);

export const UsersIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <path d="M15.5 5.2a3.2 3.2 0 0 1 0 5.6" />
    <path d="M17 14.6a5.5 5.5 0 0 1 3.5 4.9" />
  </Svg>
);

export const ClockIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const CheckIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 12.5l5 5L19.5 6.5" />
  </Svg>
);

export const CheckCircleIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.7 2.7 5.3-6" />
  </Svg>
);

export const ShieldIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3l7.5 3v5.2c0 4.6-3.1 7.6-7.5 9.3-4.4-1.7-7.5-4.7-7.5-9.3V6L12 3Z" />
    <path d="M9 12l2.2 2.2 4.3-4.7" />
  </Svg>
);

export const ReceiptIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 3.5h12V21l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21V3.5Z" />
    <path d="M9.5 8h5M9.5 12h5" />
  </Svg>
);

export const LayersIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
    <path d="M4.5 12.5 12 16.5l7.5-4" />
    <path d="M4.5 16.5 12 20.5l7.5-4" />
  </Svg>
);

export const SearchIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M15.8 15.8 20.5 20.5" />
  </Svg>
);

export const RulerIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.8 14.2 14.2 3.8l6 6L9.8 20.2l-6-6Z" />
    <path d="M7 11l1.5 1.5M10 8l1.5 1.5M13 5l1.5 1.5" />
  </Svg>
);

export const DropletIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5s6 6.3 6 10.5a6 6 0 0 1-12 0c0-4.2 6-10.5 6-10.5Z" />
  </Svg>
);

export const MapPinIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 21.5s-7-5.8-7-11.5a7 7 0 0 1 14 0c0 5.7-7 11.5-7 11.5Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const MailIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M4.5 7l7.5 5.5L19.5 7" />
  </Svg>
);

export const PhoneIcon = (p: P) => (
  <Svg {...p}>
    <path d="M7 3.5h2.2l1.6 4-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 4 1.6V17a2.5 2.5 0 0 1-2.7 2.5C10.2 19 5 13.8 4.5 6.2A2.5 2.5 0 0 1 7 3.5Z" />
  </Svg>
);

export const ArrowRightIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
);

export const ChevronDownIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const ChevronRightIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9.5 6l6 6-6 6" />
  </Svg>
);

export const MenuIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const UploadIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 15.5V4" />
    <path d="M7.5 8.5 12 4l4.5 4.5" />
    <path d="M4.5 15.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-3.5" />
  </Svg>
);

export const InfoIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <path d="M12 7.5h.01" />
  </Svg>
);

export const AlertIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13" />
    <path d="M12 16.5h.01" />
  </Svg>
);

export const CalendarIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3v4M16 3v4" />
  </Svg>
);

export const VideoIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="6.5" width="12.5" height="11" rx="2" />
    <path d="M15.5 10.5 21 8v8l-5.5-2.5" />
  </Svg>
);

export const PlusIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
);

export const MinusIcon = (p: P) => (
  <Svg {...p}>
    <path d="M5.5 12h13" />
  </Svg>
);

export const HangerIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 7.5a2.2 2.2 0 1 1 2.2-2.2" />
    <path d="M12 7.5l8 6.2a1.4 1.4 0 0 1-.9 2.5H4.9a1.4 1.4 0 0 1-.9-2.5l8-6.2Z" />
  </Svg>
);

export const SendIcon = (p: P) => (
  <Svg {...p}>
    <path d="M21 3.5 10.5 14" />
    <path d="M21 3.5l-6.5 17-4-7.5L3 9l18-5.5Z" />
  </Svg>
);

export const SprayIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9.5 10.5h5V19a1.5 1.5 0 0 1-1.5 1.5h-2A1.5 1.5 0 0 1 9.5 19v-8.5Z" />
    <path d="M10.5 10.5v-3h3v3" />
    <path d="M13.5 7.5h1.8l1.2-2.5" />
    <path d="M19.5 4h.01M21.5 6.5h.01M19.5 9h.01" />
  </Svg>
);

export const ClipboardIcon = (p: P) => (
  <Svg {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 3.5h6v2H9z" />
    <path d="M9 13l2 2 4-4.5" />
  </Svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z" />
  </svg>
);

export function WhatsAppGlyph({ className }: { className?: string }) {
  return <WhatsAppIcon className={className} />;
}

export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-1.27.06-2.14.26-2.9.56-.79.3-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.77.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z" />
  </svg>
);

export const TikTokIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

const serviceIcons: Record<ServiceId, (p: P) => React.ReactElement> = {
  sofa: SofaIcon,
  carpet: RugIcon,
  mattress: MattressIcon,
  vacuum: VacuumIcon,
  "standard-house": HomeIcon,
  "deep-house": BrushIcon,
  "move-in-out": BoxIcon,
  airbnb: KeyIcon,
  "post-construction": HardHatIcon,
  "office-commercial": BuildingIcon,
  "general-cleaners": UsersIcon,
  "on-demand": ClockIcon,
};

export function ServiceIcon({ id, ...props }: P & { id: ServiceId }) {
  const Component = serviceIcons[id];
  return <Component {...props} />;
}
