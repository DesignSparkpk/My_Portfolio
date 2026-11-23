---
name: maximalism
description: Design web UI in the Maximalism style, with bold clashing colors, patterns, collage imagery, stickers, layered elements and abundant visuals for a rich, expressive experience. Use when the user asks for maximalist, loud, colorful, collage, Y2K, "more is more", or highly expressive interfaces.
---

# Maximalism

"Bigger dreams, bolder ideas." More color, more texture, more layers, but curated. Chaos with a system underneath.

## Core principles
- **Saturated, clashing palette** (4–6 colors) used confidently.
- **Layering.** Collage cutouts, stickers, patterns, overlapping text and images.
- **Expressive type.** Mix display fonts, outlines, gradients, rotated words, giant numerals.
- **Hidden order.** A real grid and clear reading path underneath the noise.

## Design tokens
```css
:root {
  --purple: #6b2bff;
  --pink: #ff3ea5;
  --yellow: #ffe500;
  --orange: #ff7a00;
  --cyan: #00e0ff;
  --ink: #120024;
  --paper: #fff7e8;
  --font-display: "Bungee", "Rubik Mono One", "Anton", sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body { background: var(--purple); color: var(--paper); font-family: var(--font-body); }
.hero h1 {
  font-family: var(--font-display); font-size: clamp(3rem, 10vw, 9rem); line-height: .9;
  color: var(--yellow); -webkit-text-stroke: 3px var(--ink);
  text-shadow: 6px 6px 0 var(--pink), 12px 12px 0 var(--cyan);
}
.pattern-checker {
  background: conic-gradient(var(--ink) 25%, var(--paper) 0 50%, var(--ink) 0 75%, var(--paper) 0)
              0 0 / 40px 40px;
}
.pattern-dots { background: radial-gradient(var(--pink) 3px, transparent 3.5px) 0 0 / 18px 18px; }
.sticker {
  display: inline-block; background: var(--yellow); color: var(--ink);
  padding: .4rem .9rem; border: 3px solid var(--ink); border-radius: 999px;
  transform: rotate(-6deg); font-weight: 800; box-shadow: 4px 4px 0 var(--ink);
}
.collage { position: relative; }
.collage > * { position: absolute; } /* place cutouts with top/left + rotate */
```

## Do
- Use cutout images (PNG/WebP with transparency), gradients, patterns, emoji, 3D objects.
- Animate generously: floating stickers, marquees, hover wiggles (respect `prefers-reduced-motion`).
- Give body text calm zones (solid backgrounds) so it stays readable.

## Don't
- Let decoration bury the CTA or navigation.
- Sacrifice contrast; test text over every background it touches.
- Ship huge unoptimized images (performance).

## Good fits
Creative portfolios, music/events, fashion, youth brands, campaign landing pages.
