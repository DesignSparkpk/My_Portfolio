---
name: bento-grid
description: Design web UI in the Bento Grid style, with modular rounded rectangular tiles of varying sizes arranged in a tight grid to organize content in a clean, structured, glanceable way. Use when the user asks for bento, bento box, tile grid, modular card layout, dashboard-style feature sections or Apple-style feature grids.
---

# Bento Grid

Content organized into rounded tiles of different sizes, like a bento box. Each tile holds one idea (a stat, a feature, a chart, an image) and the whole grid reads at a glance.

## Core principles
- **One idea per tile.** Headline + visual or number; minimal text.
- **Size = importance.** The hero tile spans 2×2; supporting tiles 1×1 or 2×1.
- **Consistent gaps and radii.** Same gap (12–20px) and radius (16–28px) everywhere.
- **Tile variety, system unity.** Tiles can differ in color/content but share padding, type scale and radius.

## Design tokens
```css
:root {
  --bg: #f4f5f7;
  --tile: #ffffff;
  --tile-dark: #111318;
  --text: #15171c;
  --text-muted: #6b7280;
  --mint: #d8f5e6; --lavender: #e7e2ff; --butter: #fff2c6; --sky: #dcefff;
  --gap: 16px;
  --radius: 24px;
  --pad: 1.5rem;
  --font: "Inter", "Geist", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
.bento {
  display: grid; gap: var(--gap);
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
}
.tile { background: var(--tile); border-radius: var(--radius); padding: var(--pad);
        overflow: hidden; position: relative; border: 1px solid rgba(0,0,0,.05);
        transition: transform .25s, box-shadow .25s; }
.tile:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.08); }
.span-2 { grid-column: span 2; }
.row-2  { grid-row: span 2; }
.tile--dark { background: var(--tile-dark); color: #fff; }
.stat { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; letter-spacing: -.03em; }
.label { color: var(--text-muted); font-size: .875rem; }

@media (max-width: 900px) { .bento { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) {
  .bento { grid-template-columns: 1fr; }
  .span-2, .row-2 { grid-column: auto; grid-row: auto; }
}
```

## Do
- Mix tile content types: big number, mini chart, image, quote, icon list, CTA.
- Let images bleed to tile edges (`object-fit: cover`).
- Plan the mobile stacking order deliberately (most important first).

## Don't
- Cram paragraphs into tiles.
- Use different radii, gaps or paddings across tiles.
- Make every tile the same size (it becomes a plain card grid).

## Good fits
Portfolio "about me" or skills sections, feature overviews, dashboards, product spec pages.
