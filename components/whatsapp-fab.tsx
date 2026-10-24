"use client";

import { motion } from "framer-motion";
import { whatsappLink, WhatsAppGlyph } from "@/components/social-buttons";

/**
 * Floating WhatsApp button — appears with a gentle spring above the mobile
 * tab bar, and sits bottom-right on desktop. Only rendered once a real
 * number is set in siteConfig; builds a wa.me link with the prefilled
 * message automatically.
 */
export default function WhatsAppFab() {
  const href = whatsappLink();
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Crestline on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.9 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-tab-safe right-4 z-[55] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] md:bottom-6 md:right-6"
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </motion.a>
  );
}
