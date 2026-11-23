---
name: spatial-ui
description: Design web UI in the Spatial UI style (visionOS-inspired), with floating panels, layered depth, perspective, parallax and soft lighting to create a sense of space and immersion. Use when the user asks for spatial, 3D layered, depth, floating-window, immersive, visionOS-like or AR/VR-inspired interfaces.
---

# Spatial UI

Interfaces that live in 3D space: floating translucent windows at different depths, perspective tilt, parallax, and lighting that responds to the pointer.

## Core principles
- **Z-depth hierarchy.** Background scene → main window → floating ornaments/toolbars. Closer = more important.
- **Perspective and parallax.** Subtle 3D tilt, layers moving at different speeds.
- **Soft materials.** Dark translucent glass panels, gentle glows, large radii.
- **Calm, immersive backdrop.** Dark scenes, nebula/landscape imagery, deep gradients.

## Design tokens
```css
:root {
  --scene: #0b0a1f;
  --panel: rgba(40, 38, 70, .55);
  --panel-border: rgba(255,255,255,.12);
  --text: #f4f3ff;
  --text-muted: rgba(244,243,255,.65);
  --accent: #8b7bff;
  --glow: 0 0 40px rgba(139,123,255,.35);
  --radius: 32px;
  --font: "SF Pro Display", "Inter", system-ui, sans-serif;
}
```

## Key CSS patterns
```css
body { background: radial-gradient(80% 60% at 60% 30%, #2b1f6b, var(--scene)); color: var(--text);
       font-family: var(--font); }
.stage { perspective: 1400px; }
.window {
  background: var(--panel);
  backdrop-filter: blur(30px) saturate(140%); -webkit-backdrop-filter: blur(30px) saturate(140%);
  border: 1px solid var(--panel-border); border-radius: var(--radius);
  box-shadow: 0 40px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12);
  transform-style: preserve-3d;
  transform: rotateY(var(--ry, -8deg)) rotateX(var(--rx, 4deg)) translateZ(0);
  transition: transform .4s cubic-bezier(.2,.8,.2,1);
}
.window--back  { transform: translateZ(-120px) scale(.92); filter: brightness(.8); }
.window--front { transform: translateZ(80px); }
.ornament { /* floating toolbar below a window */
  position: absolute; bottom: -28px; left: 50%; translate: -50% 0;
  border-radius: 999px; padding: .5rem 1rem; background: var(--panel);
  backdrop-filter: blur(20px); border: 1px solid var(--panel-border); }
.btn-spatial { border-radius: 999px; background: rgba(255,255,255,.1); color: var(--text);
  border: 1px solid var(--panel-border); padding: .7rem 1.3rem; transition: box-shadow .3s, background .3s; }
.btn-spatial:hover { background: rgba(255,255,255,.18); box-shadow: var(--glow); }
```

Pointer-driven tilt:
```js
const w = document.querySelector('.window');
addEventListener('pointermove', e => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  w.style.setProperty('--ry', `${x * 12}deg`);
  w.style.setProperty('--rx', `${-y * 8}deg`);
});
```

## Do
- Use a sidebar/tab bar floating beside the main window, visionOS-style.
- Add depth-of-field: back layers slightly blurred and dimmed.
- Keep tilt angles small (≤ 12°) and disable them under reduced motion.

## Don't
- Tilt text-heavy panels so far that reading becomes hard.
- Use many heavy blurred layers on mobile; simplify to flat stacked cards there.

## Good fits
Product showcases, app/OS concept portfolios, immersive hero sections, media galleries.
