"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared store so inner pages can hand their title to the nav bar,
 * which shows it as a compact iOS-style title once the large title
 * scrolls out of view.
 */
let compactTitle: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setCompactTitle(title: string | null) {
  if (title === compactTitle) return;
  compactTitle = title;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return compactTitle;
}

function getServerSnapshot() {
  return null;
}

export function useCompactTitle(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
