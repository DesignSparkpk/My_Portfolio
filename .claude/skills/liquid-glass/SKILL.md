---
name: liquid-glass
description: Design web UI in the Liquid Glass style, with glossy, translucent, fluid surfaces that show bright specular highlights, reflections, refraction and organic blob shapes, like liquid glass. Use when the user asks for liquid glass, glossy glass, refractive, fluid, iridescent or "next-gen" glass interfaces. This is distinct from flat frosted glassmorphism.
---

# Liquid Glass

An evolution of glassmorphism. Surfaces look like thick, glossy, liquid glass: brighter specular highlights, edge refraction, curved reflections, and fluid, morphing shapes.

## Core principles
- **Thickness.** Bright rim highlight on the top edge, darker refraction on the bottom edge, inner glow.
- **Specular gloss.** A curved white highlight band across the top of each surface.
- **Fluid motion.** Morphing blobs, elastic hover, content that seems to bend under the glass.
- **Vibrant, deep backgrounds** (blues, aquas, iridescent gradients) for refraction to read against.

## Design tokens
```css
:root {
  --bg-1: #0a4bff;
  --bg-2: #00c6ff;
  --bg-3: #7b5cff;
  --glass: rgba(255,255,255,.12);
  --rim: rgba(255,255,255,.7);
  --text: #ffffff;
  --radius: 28px;
  --font: "SF Pro Display", "Inter", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body { color: var(--text); font-family: var(--font);
  background: radial-gradient(60% 60% at 70% 40%, var(--bg-2), transparent 70%),
              radial-gradient(50% 50% at 20% 80%, var(--bg-3), transparent 70%), var(--bg-1); }
.liquid {
  position: relative; border-radius: var(--radius); overflow: hidden;
  background: var(--glass);
  backdrop-filter: blur(14px) saturate(180%) contrast(110%);
  -webkit-backdrop-filter: blur(14px) saturate(180%) contrast(110%);
  box-shadow:
    inset 0 1.5px 0 var(--rim),             /* top rim */
    inset 0 -8px 16px rgba(0,30,90,.25),    /* bottom refraction */
    inset 0 0 20px rgba(255,255,255,.15),   /* inner glow */
    0 20px 50px rgba(0,20,80,.35);
}
.liquid::before { /* specular gloss band */
  content: ""; position: absolute; inset: 0 0 55% 0; border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,0));
  pointer-events: none;
}
.blob { width: 320px; aspect-ratio: 1;
  background: radial-gradient(circle at 30% 30%, #fff 0 6%, #9be7ff 18%, #3a7bff 55%, #2a1fb8 100%);
  border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%;
  filter: drop-shadow(0 30px 40px rgba(0,0,60,.4));
  animation: morph 10s ease-in-out infinite; }
@keyframes morph { 50% { border-radius: 58% 42% 35% 65% / 55% 38% 62% 45%; } }
/* use with .liquid: class="liquid btn-liquid" */
.btn-liquid { border-radius: 999px; padding: .75rem 1.4rem;
  transition: transform .3s cubic-bezier(.2,1.4,.4,1); }
.btn-liquid:hover { transform: scale(1.05); }
```
For true refraction, an SVG `feDisplacementMap` filter on the backdrop is an optional enhancement (Chromium only; provide fallback).

## Do
- Use 3D glass renders (blobs, spheres) as hero art.
- Respect `prefers-reduced-motion` (stop morphing) and `prefers-reduced-transparency` (solid fallback).
- Keep text on darker, less transparent regions.

## Don't
- Over-blur everything; content readability comes first.
- Apply heavy filters to large or many elements on low-end devices.

## Good fits
Product launches, app landing pages, OS-inspired UIs, tech portfolios, hero sections.
