---
name: brutalism
description: Design web UI in the (Neo-)Brutalism style, with raw, high-contrast layouts, bold oversized typography, thick black borders, hard offset shadows, minimal styling and stark blocks of color. Use when the user asks for brutalist, neo-brutalist, raw, bold, anti-design or "bigger bolder braver" interfaces.
---

# Brutalism / Neo-Brutalism

Honest, loud, unpolished. Thick borders, hard shadows with no blur, giant type, flat blocks of color, visible grid structure.

## Core principles
- **Hard edges.** 2–4px solid black borders, 0–6px radius, offset shadows with zero blur.
- **Huge type.** Headlines can be 8–15vw, tight leading, uppercase welcome.
- **High contrast.** Black/white base plus 1–3 flat, saturated accents.
- **Visible structure.** Exposed grid lines, dividers, labels, monospace metadata.

## Design tokens
```css
:root {
  --bg: #ffffff;
  --ink: #000000;
  --accent-1: #ffe14d;   /* yellow */
  --accent-2: #ff5c8a;   /* pink */
  --accent-3: #4d7cff;   /* blue */
  --border: 3px solid var(--ink);
  --shadow: 6px 6px 0 var(--ink);
  --radius: 0;
  --font-display: "Archivo Black", "Anton", Impact, sans-serif;
  --font-body: "Space Grotesk", "IBM Plex Mono", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body { background: var(--bg); color: var(--ink); font-family: var(--font-body); }
h1 { font-family: var(--font-display); font-size: clamp(3rem, 12vw, 10rem);
     line-height: .85; letter-spacing: -.03em; text-transform: uppercase; }
.card { background: var(--accent-1); border: var(--border); box-shadow: var(--shadow); padding: 1.5rem; }
.btn {
  background: var(--ink); color: var(--bg); border: var(--border);
  padding: .8rem 1.4rem; font-weight: 800; text-transform: uppercase;
  box-shadow: var(--shadow); transition: transform .08s, box-shadow .08s;
}
.btn:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 var(--ink); }
.btn:active { transform: translate(6px,6px); box-shadow: 0 0 0 var(--ink); }
.grid-lines > * { border-right: var(--border); border-bottom: var(--border); }
.marquee { white-space: nowrap; animation: scroll 15s linear infinite; }
@keyframes scroll { to { transform: translateX(-50%); } }
```

## Do
- Break the grid deliberately: overlapping, rotated stickers, marquee bands.
- Use raw black-and-white or high-contrast photography.
- Keep interactions snappy (no easing-heavy animations).

## Don't
- Add soft shadows, gradients or blur.
- Confuse "raw" with "broken": navigation must still be clear and accessible.
- Use more than ~3 accent colors.

## Good fits
Creative/dev portfolios, agencies, indie products, zines, music and fashion brands.
