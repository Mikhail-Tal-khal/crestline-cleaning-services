# Official brand assets — drop-in folder

This folder holds the official Crestline brand assets. The site is built so
that each file below is **optional**: when a file is missing, the site renders
a clean, honest fallback in its place. When you add the real file and rebuild,
it appears everywhere automatically — no code changes are required.

## Expected files

| File | Source | Used for |
|---|---|---|
| `crestline-logo.png` | `image(8).png` — official silver Crestline emblem | Site header, footer |
| `crestline-uniform-front.png` | `image(9).png` — official uniform, front | Professional Standards section (homepage) |
| `crestline-uniform-back.png` | `image(10).png` — official uniform, back | Professional Standards section (homepage) |

## How to add them

1. Copy the original files into this folder using the exact names above.
2. Re-run the site:

   ```bash
   npm run dev     # development — refresh the page
   npm run build   # production — rebuild to pick the files up
   ```

## Rules the site enforces

- The logo is rendered at its **original proportions** (`height` is fixed,
  `width` is automatic) — it is never stretched, redrawn, recoloured or replaced.
- Uniform photos are presented as **official uniform designs**, never as
  employee portraits.
- Until the logo file exists, the header and footer show a text wordmark
  fallback; the Professional Standards section shows clearly-labelled
  placeholder cards.
