import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Server-side helpers for the official brand assets in /public/brand.
 *
 * Every asset is optional: when a file is missing the site renders a clean
 * fallback instead. Adding the real file and restarting `npm run dev`
 * (or re-running `npm run build`) makes it appear everywhere automatically.
 *
 * This module must only be imported from Server Components / Server Actions.
 */
export type BrandAsset = {
  exists: boolean;
  width?: number;
  height?: number;
};

const isDev = process.env.NODE_ENV === "development";
const cache = new Map<string, BrandAsset>();

/** Read the width/height from a PNG header (IHDR chunk) without extra deps. */
function readPngSize(file: string): { width: number; height: number } | undefined {
  try {
    const buf = readFileSync(file);
    if (buf.length < 24) return undefined;
    // Bytes 12-15 must be the IHDR chunk type.
    if (buf.toString("ascii", 12, 16) !== "IHDR") return undefined;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return undefined;
  }
}

export function getBrandAsset(file: string): BrandAsset {
  if (!isDev) {
    const cached = cache.get(file);
    if (cached) return cached;
  }
  const full = path.join(process.cwd(), "public", "brand", file);
  const exists = existsSync(full);
  const asset: BrandAsset = exists
    ? { exists: true, ...(file.toLowerCase().endsWith(".png") ? readPngSize(full) : {}) }
    : { exists: false };
  if (!isDev) cache.set(file, asset);
  return asset;
}
