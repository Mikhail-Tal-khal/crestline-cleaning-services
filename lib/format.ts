/** Format a Kenyan shilling amount, e.g. 1800 -> "KSh 1,800". */
export function ksh(amount: number): string {
  return `KSh ${Math.round(amount).toLocaleString("en-US")}`;
}

/** Round a package price to the nearest KSh 100. */
export function roundTo100(amount: number): number {
  return Math.round(amount / 100) * 100;
}
