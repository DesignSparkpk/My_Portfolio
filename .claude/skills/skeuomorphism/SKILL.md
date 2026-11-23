---
name: skeuomorphism
description: Design web UI in the Skeuomorphism style, with realistic textures, materials (wood, leather, brushed metal, paper) and physical details like stitching, bevels and dials that mimic real-world objects. Use when the user asks for skeuomorphic, realistic, retro-physical, tactile or "real object" interfaces.
---

# Skeuomorphism

Interfaces that look like physical objects: a wooden cabinet, a leather notebook, a brass knob. Every surface has material, depth and light.

## Core principles
- **Material first.** Choose 1–2 materials (e.g., walnut wood + brushed brass) and apply them consistently.
- **One light source.** Light from the top-left; highlights on top edges, shadows bottom-right.
- **Physical affordances.** Buttons look pressable (bevel + drop shadow), toggles look like real switches, knobs look turnable.
- **Detail at the edges.** Stitching, screws, embossed labels, inner shadows on recessed areas.

## Design tokens
```css
:root {
  --wood-dark: #3b2314;
  --wood: #6b3f22;
  --wood-light: #8a5a35;
  --brass: #c9a24a;
  --brass-light: #f1d98a;
  --cream: #f3e6c8;
  --ink: #2a1a0f;
  --radius: 10px;
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Lora", Georgia, serif;
}
```

## Key CSS patterns
```css
/* Wood panel with grain */
.panel {
  background:
    repeating-linear-gradient(92deg, rgba(0,0,0,.06) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, var(--wood-light), var(--wood) 40%, var(--wood-dark));
  border-radius: var(--radius);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -2px 6px rgba(0,0,0,.4),
              0 10px 25px rgba(0,0,0,.5);
}
/* Stitched leather edge */
.stitched { outline: 2px dashed rgba(243,230,200,.45); outline-offset: -8px; }
/* Brass button */
.btn-brass {
  background: linear-gradient(180deg, var(--brass-light), var(--brass) 55%, #8f6c22);
  color: var(--ink); border: 1px solid #6e5216; border-radius: 8px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 3px 0 #5a4210, 0 6px 10px rgba(0,0,0,.4);
  text-shadow: 0 1px 0 rgba(255,255,255,.5);
}
.btn-brass:active { transform: translateY(2px); box-shadow: inset 0 2px 4px rgba(0,0,0,.35), 0 1px 0 #5a4210; }
/* Recessed input */
.input-inset { background: var(--cream); border-radius: 6px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.15); border: none; }
```

## Do
- Use serif or engraved-style type for headings; embossed text via `text-shadow`.
- Add real textures (CSS gradients or small tiling images) at low opacity.
- Animate physically: press-down, knob rotation, switch flip.

## Don't
- Mix too many materials or light directions.
- Let texture reduce text contrast; keep body text on flat, light areas (≥ 4.5:1).
- Use flat icons; prefer detailed or engraved icons.

## Good fits
Music players, audio/synth tools, premium/heritage brands, note-taking apps, portfolio "desk" themes.
