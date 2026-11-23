---
name: claymorphism
description: Design web UI in the Claymorphism style, with soft, puffy, rounded 3D-looking shapes, inner highlights, gentle shadows and bright playful pastel colors. Use when the user asks for claymorphic, clay, puffy, playful 3D, friendly or toy-like interfaces.
---

# Claymorphism

Friendly, inflated shapes that look like soft clay or plastic toys: big radii, double inner shadows for puffiness, an outer drop shadow, and cheerful saturated pastels.

## Core principles
- **Puffy volume.** Inner highlight (top-left) + inner shade (bottom-right) + soft outer shadow.
- **Very round.** Radii 24–40px, pill buttons, circular avatars.
- **Playful color.** Bright pastels on a light, warm background; each card can have its own color.
- **Pair with 3D illustrations** (clay-style icons, emoji, characters).

## Design tokens
```css
:root {
  --bg: #fdf4ec;
  --peach: #ffb37b;
  --orange: #ff8a3d;
  --mint: #8ee4c4;
  --sky: #8cc8ff;
  --lilac: #c7a8ff;
  --text: #3a2a20;
  --radius: 32px;
  --font: "Nunito", "Baloo 2", "Poppins", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body { background: var(--bg); color: var(--text); font-family: var(--font); }
.clay {
  border-radius: var(--radius);
  background: var(--peach);
  box-shadow:
    inset 8px 8px 16px rgba(255,255,255,.55),
    inset -10px -10px 18px rgba(0,0,0,.12),
    0 18px 35px -10px rgba(160, 80, 30, .35);
}
.clay--mint { background: var(--mint); box-shadow:
    inset 8px 8px 16px rgba(255,255,255,.6), inset -10px -10px 18px rgba(0,80,60,.15),
    0 18px 35px -10px rgba(20,120,90,.35); }
.btn-clay {
  /* use with .clay: class="clay btn-clay" */
  background: var(--orange); color: #fff; font-weight: 800;
  padding: .9rem 1.6rem; border-radius: 999px; border: none;
  transition: transform .15s cubic-bezier(.3,1.6,.6,1);
}
.btn-clay:hover { transform: translateY(-3px) scale(1.03); }
.btn-clay:active { transform: translateY(1px) scale(.97); }
```

## Do
- Use rounded, heavy fonts (700–900 weight headings).
- Add bouncy micro-interactions (overshoot easing).
- Tint each shadow to match its element's hue.

## Don't
- Use pure black shadows or sharp corners.
- Use pale text on pastel cards; check contrast (dark text usually works best).
- Use in serious/enterprise contexts unless the brand is playful.

## Good fits
Kids/education apps, games, onboarding, creative agencies, playful portfolios.
