"use client";

/** Copyright year rendered client-side so it stays current without a rebuild. */
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
