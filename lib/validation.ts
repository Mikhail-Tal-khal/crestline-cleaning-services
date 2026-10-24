/**
 * Server-side validation shared by all form actions. The server is the source
 * of truth; client-side checks are a convenience only.
 */
export const photoLimits = {
  maxCount: 6,
  maxSizeMB: 5,
  maxSizeBytes: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp"],
  accept: ".jpg,.jpeg,.png,.webp",
} as const;

export const videoLimits = {
  maxCount: 1,
  maxSizeMB: 20,
  maxSizeBytes: 20 * 1024 * 1024,
  types: ["video/mp4", "video/quicktime", "video/webm"],
  accept: ".mp4,.mov,.webm",
} as const;

/** Trim, collapse whitespace and strip control characters. */
export function sanitize(value: unknown, maxLength = 4000): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return cleaned.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

/** Multi-line sanitize for notes fields: keeps line breaks, strips controls. */
export function sanitizeMultiline(value: unknown, maxLength = 4000): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return cleaned
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

/** Optional phone: digits, spaces, dashes, parentheses, leading +. */
export function isValidPhone(value: string): boolean {
  return /^\+?[0-9()\-\s]{7,20}$/.test(value);
}

/** ISO date (yyyy-mm-dd) within a sensible range. */
export function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  const year = date.getUTCFullYear();
  return year >= 2024 && year <= 2100;
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function clampInt(value: unknown, min: number, max: number, fallback = 0): number {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(n)));
}

export function validatePhotos(photos: File[]): string[] {
  const errors: string[] = [];
  if (photos.length > photoLimits.maxCount) {
    errors.push(`Please attach no more than ${photoLimits.maxCount} photos.`);
  }
  for (const file of photos) {
    if (!photoLimits.types.includes(file.type as (typeof photoLimits.types)[number])) {
      errors.push(`"${file.name}" is not a JPG, PNG or WebP image.`);
    }
    if (file.size > photoLimits.maxSizeBytes) {
      errors.push(`"${file.name}" is larger than ${photoLimits.maxSizeMB} MB.`);
    }
  }
  return errors;
}

export function validateVideo(video: File | null): string[] {
  if (!video) return [];
  const errors: string[] = [];
  if (!videoLimits.types.includes(video.type as (typeof videoLimits.types)[number])) {
    errors.push(`"${video.name}" is not an MP4, MOV or WebM video.`);
  }
  if (video.size > videoLimits.maxSizeBytes) {
    errors.push(`"${video.name}" is larger than ${videoLimits.maxSizeMB} MB.`);
  }
  return errors;
}
