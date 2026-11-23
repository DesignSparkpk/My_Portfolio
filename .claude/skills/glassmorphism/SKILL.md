---
name: glassmorphism
description: Design web UI in the Glassmorphism style, with translucent frosted-glass panels, background blur, subtle borders and soft gradients layered over colorful backgrounds. Use when the user asks for glassmorphic, frosted glass, translucent, blurred-panel or modern layered interfaces.
---

# Glassmorphism

Frosted, semi-transparent panels floating over a vivid background (gradient, photo, or blurred color blobs). Depth comes from blur, transparency and thin light borders.

## Core principles
- **Vivid backdrop is required.** Glass only reads over color: gradients, blobs, or photography.
- **Blur + low opacity fill + 1px light border.**
- **Layering.** 2–3 stacked depths max (background, panels, floating chips).
- **Light text contrast check.** Content on glass must still meet 4.5:1.

## Design tokens
```css
:root {
  --glass-bg: rgba(255,255,255,.14);
  --glass-bg-strong: rgba(255,255,255,.24);
  --glass-border: rgba(255,255,255,.35);
  --glass-blur: 18px;
  --text: #ffffff;
  --text-muted: rgba(255,255,255,.75);
  --accent: #7dd3fc;
  --radius: 22px;
  --font: "Inter", "SF Pro Display", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body {
  min-height: 100vh; color: var(--text); font-family: var(--font);
  background:
    radial-gradient(40% 50% at 20% 20%, #ff7ab6 0%, transparent 60%),
    radial-gradient(45% 55% at 80% 30%, #6a5cff 0%, transparent 60%),
    radial-gradient(50% 60% at 50% 90%, #00c2ff 0%, transparent 60%),
    #1b1440;
}
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(10, 0, 40, .25), inset 0 1px 0 rgba(255,255,255,.4);
}
/* use with .glass: class="glass btn-glass" */
.btn-glass { padding: .7rem 1.3rem; border-radius: 999px; }
.btn-glass:hover { background: var(--glass-bg-strong); }
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(30, 20, 70, .85); } /* fallback */
}
```

## Do
- Put a soft gradient sheen on panels (`linear-gradient(135deg, rgba(255,255,255,.25), rgba(255,255,255,.05))`).
- Use thin line icons and clean sans-serif type.
- Provide a solid fallback for browsers without `backdrop-filter` and for `prefers-reduced-transparency`.

## Don't
- Stack many blurred layers (performance on mobile).
- Put long paragraphs on highly transparent glass.
- Use glass over plain white or flat backgrounds.

## Good fits
Hero sections, weather/finance cards, login modals, travel sites, portfolio project cards.
