---
name: neumorphism
description: Design web UI in the Neumorphism (soft UI) style, with elements extruded from or pressed into a single monochrome surface using paired light and dark soft shadows. Use when the user asks for neumorphic, soft UI, "extruded", or soft-shadow monochrome interfaces.
---

# Neumorphism (Soft UI)

Elements appear molded from the same material as the background, raised or inset using two soft shadows (one light, one dark) on a single-color surface.

## Core principles
- **Same color everywhere.** Background and components share one base color; depth comes only from shadows.
- **Dual shadows.** Light shadow top-left, dark shadow bottom-right.
- **Raised = default, inset = active/pressed/input.**
- **Accent sparingly.** One accent color for state (active toggles, primary CTA, charts).

## Design tokens
```css
:root {
  --bg: #e4e9f2;
  --shadow-dark: #b8bfcc;
  --shadow-light: #ffffff;
  --text: #3d4a5c;
  --text-muted: #7a8699;
  --accent: #3b6ef5;
  --radius: 20px;
  --font: "Inter", "Nunito", system-ui, sans-serif;
}
/* Dark variant */
.dark { --bg:#2a2d34; --shadow-dark:#1d1f24; --shadow-light:#373b44; --text:#e3e7ee; --text-muted:#9aa3b2; }
```

## Key CSS patterns
```css
body { background: var(--bg); color: var(--text); font-family: var(--font); }
.raised {
  background: var(--bg); border-radius: var(--radius);
  box-shadow: 8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light);
}
.inset {
  background: var(--bg); border-radius: var(--radius);
  box-shadow: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light);
}
/* use with .raised: class="raised btn" */
.btn { padding: .8rem 1.4rem; border: none; transition: box-shadow .2s; }
.btn:active, .btn[aria-pressed="true"] {
  box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light);
}
/* Convex circle (knob/icon button) */
.convex { border-radius: 50%;
  background: linear-gradient(145deg, #f4f9ff, #cdd2da);
  box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light); }
```

## Do
- Keep shadows soft (blur ≈ 2× offset) and the palette very narrow.
- Use generous spacing and large radii (16–30px).
- Add visible focus rings (`outline: 2px solid var(--accent)`) since shadows alone are a weak affordance.

## Don't
- Rely on shadows alone for meaning; low contrast hurts accessibility. Pair state with color, icon or text.
- Use on busy, colorful or image-heavy backgrounds.
- Build dense data tables in pure neumorphism.

## Good fits
Smart-home dashboards, music/calculator widgets, settings panels, small portfolio sections.
