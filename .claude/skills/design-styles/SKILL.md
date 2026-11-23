---
name: design-styles
description: Apply specific visual design styles when building web UIs
---

# Design Styles

Use this skill when a request names one of the styles below, or asks for that look, for a page or component.
Pick **one primary style** and turn its rules into design tokens (CSS custom properties) so it is applied the same way everywhere.
Before finishing, run the **375px overflow check**.

Pairs that combine well: Minimalism + Bento, Brutalism + Bento, Glassmorphism or Liquid Glass + Spatial, Maximalism + Brutalism.

## Universal rules (every style)

- **Contrast:** text needs at least 4.5:1, large text and UI boundaries at least 3:1. Test over the busiest part of any background.
- **Focus and touch:** always show a visible `:focus-visible` ring, and make tap targets at least 44×44px.
- **Motion and transparency:** respect `prefers-reduced-motion`. Translucent styles must also respect `prefers-reduced-transparency`.
- **Progressive enhancement:** blur, 3D, masks and SVG filters are extras. Layout and content must still work without them (use `@supports`).
- **Performance:** animate only `transform` and `opacity`. Keep blurred layers few on mobile.

## Mobile 375px: zero horizontal overflow (required)

```css
*, *::before, *::after { box-sizing: border-box; }
img, svg, video, canvas, iframe { max-width: 100%; }
img, video { height: auto; }
```

- **Widths:** never use `100vw`, because it includes the scrollbar. Use `100%`, `max-width` or `min(100%, Npx)`. Avoid fixed pixel widths.
- **Grid and flex:**
  - Write tracks as `minmax(0, 1fr)`, or `repeat(auto-fit, minmax(min(100%, 260px), 1fr))`.
  - Give flex and grid children `min-width: 0`.
- **Text:** size it with `clamp()`. Add `overflow-wrap: anywhere` to display headings, long words and URLs.
- **Decorative layers:** blobs, glows, stickers, rotated, offset or 3D elements, and slide-in animations go inside a `position: relative; overflow: clip` wrapper.
  - `transform` and absolutely positioned boxes **do** widen the page.
  - `box-shadow` and `filter` do **not**.
- **Intentional scrollers:** tabs, carousels, tables and marquees scroll inside their own box (`overflow-x: auto` or `hidden`). The page itself must never scroll sideways.
- **Fixed and sticky bars:** position them with `left` and `right` (or `inset-inline`) plus `env(safe-area-inset-*)`, never `width: 100vw`.
- **Fix the cause.** `body { overflow-x: clip }` is a safety net only, not the fix, because it can hide clipped content.

**Verify at 375×812, at 320px, and after opening menus, modals and drawers.** `pass` must be `true`:

```js
// DevTools console, or Playwright: page.setViewportSize({ width: 375, height: 812 }); page.evaluate(...)
(() => {
  const { scrollWidth, clientWidth } = document.documentElement;
  const offenders = [...document.querySelectorAll('body *')]
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.right > clientWidth + 0.5 || r.left < -0.5); })
    .map((el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + [...el.classList].map((c) => `.${c}`).join(''));
  return { pass: scrollWidth <= clientWidth, scrollWidth, clientWidth, offenders };
})();
```

`offenders` is a list for finding the cause. Items inside an intentional scroller or a clipped wrapper can appear in it without breaking the page.

---

## Skeuomorphism

Digital objects that look like real materials and physical controls.

- Use one light source (from the top): highlights on top edges, shadows below.
- Build materials (paper, leather, metal, wood) from layered gradients plus subtle tiled texture. Avoid huge images.
- Controls look pressable: a bevel made of an inset highlight plus a drop shadow. The pressed state flips to an inset shadow.
- Labels can be embossed with a 1px `text-shadow`, but must keep 4.5:1 contrast. Put long reading text on plain surfaces.

```css
.skeuo-btn {
  background: linear-gradient(#fdfdfd, #d7dbe1);
  border: 1px solid #a4abb6; border-radius: 10px; color: #1f2329;
  box-shadow: inset 0 1px 0 #fff, 0 2px 0 #b9bfc8, 0 4px 10px rgb(0 0 0 / .25);
  text-shadow: 0 1px 0 rgb(255 255 255 / .8);
}
.skeuo-btn:active { background: linear-gradient(#d3d7dd, #eceef1); box-shadow: inset 0 2px 6px rgb(0 0 0 / .3); }
```

**375px:** object and device mock-ups (dials, phones, notebooks) use `width: min(100%, 360px)`, never fixed widths.

## Neumorphism

Soft UI: elements extruded from, or pressed into, the same background.

- The element's fill is the page's fill (a light neutral such as `#e0e5ec`). Depth comes only from two shadows: light at top-left, dark at bottom-right.
- The pressed, active or selected state uses the inset version of the same shadows.
- Use 12–24px radii, no borders, and a single accent color for primary actions and states.
- Low contrast is the main risk:
  - Make text dark (for example `#2d3748` on `#e0e5ec`) and the focus ring clear.
  - Never show a state with a shadow alone; add a color, icon or label.

```css
:root { --neu-bg: #e0e5ec; --neu-dark: rgb(163 177 198 / .6); --neu-light: rgb(255 255 255 / .8); }
.neu { background: var(--neu-bg); color: #2d3748; border-radius: 20px;
  box-shadow: 8px 8px 16px var(--neu-dark), -8px -8px 16px var(--neu-light); }
.neu-pressed { box-shadow: inset 6px 6px 12px var(--neu-dark), inset -6px -6px 12px var(--neu-light); }
```

**375px:**
- Reduce shadow offsets to about 5px.
- Leave at least 16px of space around elements so `overflow` parents don't clip the shadows. Shadows themselves never cause scroll overflow.

## Glassmorphism

Frosted, translucent panels floating over colorful backgrounds.

- It needs something vivid behind it: a gradient, blurred color blobs or a photo. Glass on a flat color looks like nothing.
- Panel recipe:
  - 8–25% fill
  - `backdrop-filter: blur(12–24px)`
  - 1px light border
  - soft shadow
  - 16–24px radius
- Always add `-webkit-backdrop-filter`, plus an opaque fallback.
- Tint the glass or add a scrim behind text until it meets contrast. Use only a few blurred layers.

```css
.glass {
  background: rgb(255 255 255 / .14); color: #fff;
  border: 1px solid rgb(255 255 255 / .28); border-radius: 20px;
  -webkit-backdrop-filter: blur(16px) saturate(160%); backdrop-filter: blur(16px) saturate(160%);
  box-shadow: 0 10px 30px rgb(0 0 0 / .2);
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgb(24 24 32 / .88); }
}
```

**375px:** background blobs are usually oversized absolute boxes. Put them in a `position: relative; overflow: clip` wrapper, and size them in `%` or `vmin`.

## Claymorphism

Soft, puffy, inflated 3D shapes. Playful and tactile.

- Use pastel or bright fills, very round corners (24–48px) and chunky padding.
- Depth comes from three shadows:
  - an outer drop shadow
  - an inner highlight at top-left
  - an inner shade at bottom-right
- Pair it with clay or 3D illustrations and rounded, bold typefaces (for example Nunito or Fredoka).
- Pastels need **dark** text. On press, scale to `.97` and shrink the outer shadow.

```css
.clay {
  background: #ffd3e0; color: #3b1d29; border-radius: 32px; padding: 24px;
  box-shadow: 0 16px 32px -12px rgb(160 60 90 / .35),
    inset -8px -8px 16px rgb(0 0 0 / .08), inset 8px 8px 16px rgb(255 255 255 / .7);
}
.clay:active { transform: scale(.97); box-shadow: 0 8px 16px -8px rgb(160 60 90 / .35),
  inset -6px -6px 12px rgb(0 0 0 / .1), inset 6px 6px 12px rgb(255 255 255 / .6); }
```

**375px:** reduce the radius to about 24px and padding to about 16px. Floating illustrations get `max-width: 100%` and stay inside clipped wrappers.

## Brutalism (Neo-brutalism)

Raw and loud: thick borders, hard shadows, flat bold color.

- Use 2–4px solid borders (usually black), hard offset shadows with zero blur, and little or no rounding.
- Use flat saturated blocks (yellow, pink, lime, blue) with black and white. No gradients or soft shadows.
- Type is a bold grotesk or monospace: big uppercase headings, visible structure, underlined links.
- Buttons "press" into their shadow on `:active`. Keep focus outlines thick.

```css
.brut { background: #ffde59; color: #000; border: 3px solid #000; border-radius: 0; box-shadow: 6px 6px 0 #000; }
.brut:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000; }
.brut:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 #000; }
.brut-title { font-size: clamp(2rem, 10vw, 5rem); line-height: 1; text-transform: uppercase; overflow-wrap: anywhere; }
```

**375px:**
- Keep shadow and translate offsets at 4px or less.
- Translated elements widen the page, so keep them inside padded containers (offset no bigger than the gutter), never full-bleed.

## Minimalism

Only what's essential, with generous whitespace and clear hierarchy.

- Use one typeface (two at most) and one accent color on a neutral palette.
- Build hierarchy with size, weight and space, not decoration.
- Follow a strict spacing scale (4/8px base) and give one primary action per view. Remove anything that doesn't serve the task.
- Use 1px hairlines or whitespace instead of shadows. Keep motion subtle.

```css
:root { --accent: #111; --muted: #6b6b6b; --line: #e6e6e6; --space: clamp(16px, 4vw, 32px); }
body { font: 400 1rem/1.6 system-ui, sans-serif; color: #111; background: #fff; }
.section { padding-block: calc(var(--space) * 3); border-top: 1px solid var(--line); }
.prose { max-width: 65ch; }
```

**375px:** whitespace shrinks through `clamp()`, never through fixed large paddings. Body text stays at 16px or more.

## Maximalism

More is more: bold color, layered patterns, expressive type and collage.

- Use several vivid colors, patterns and textures, with overlapping layers, stickers, cut-outs and marquees.
- Mix display, serif and mono type, with oversized headings and varied weights and rotations.
- Keep the chaos controlled:
  - one shared palette
  - one clear CTA per view
  - body text on a solid, high-contrast background
- Marquees and spinning elements stop under `prefers-reduced-motion`.

```css
.max-hero { position: relative; overflow: clip; background: conic-gradient(from 45deg, #ff3d7f, #ffd23f, #3dd6d0, #7b5cff, #ff3d7f); }
.max-title { font: 900 clamp(2.5rem, 12vw, 8rem)/.9 system-ui, sans-serif; overflow-wrap: anywhere; }
.sticker { position: absolute; rotate: -8deg; }
.marquee { overflow: hidden; }
.marquee__track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }
```

**375px:** this style has the highest overflow risk. Clip every decorated section, keep stickers inside their section's box, and stack collages vertically.

## Liquid Glass

Apple-style (2025) dynamic glass: translucent, refractive, with specular highlights.

- **Material:** a very light tint, blur, a saturation and brightness boost, a bright specular rim on the top edge, and a faint inner glow.
- **Shapes:** capsules and pills, with concentric corners (inner radius = outer radius − padding).
- **Floating controls:** tab bars, toolbars and sheets float above content instead of being full-width opaque bars. Content scrolls underneath.
- **Legibility comes first:** switch text and icon color, or add tint, based on what's behind.
- **Refraction (optional):** use an SVG `feDisplacementMap` through `backdrop-filter: url(#lens)` as a Chromium-only enhancement.
- **Accessibility:** use a near-opaque fill under `prefers-reduced-transparency` and no shimmer under reduced motion.

```css
.liquid {
  position: relative; isolation: isolate; border-radius: 999px; color: #fff;
  background: rgb(255 255 255 / .08);
  -webkit-backdrop-filter: blur(14px) saturate(180%) brightness(1.1);
  backdrop-filter: blur(14px) saturate(180%) brightness(1.1);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / .55), inset 0 -1px 0 rgb(255 255 255 / .12), 0 8px 24px rgb(0 0 0 / .25);
}
.liquid::before { /* specular rim */
  content: ""; position: absolute; inset: 0; z-index: -1; padding: 1px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(135deg, rgb(255 255 255 / .7), transparent 40% 60%, rgb(255 255 255 / .35));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
@media (prefers-reduced-transparency: reduce) {
  .liquid { background: rgb(28 28 30 / .92); -webkit-backdrop-filter: none; backdrop-filter: none; }
}
```

**375px:**
- Position floating bars with `position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom));`, never with `width: 100vw`.
- Below 360px, show icons only.
- Pad the page bottom by the bar's height.

## Bento Grid

Modular tiles of different sizes, each telling one idea, like a bento box.

- Use rounded tiles with one consistent gap (12–24px), one radius and one inner padding. Each tile holds one idea: a stat, feature, image, quote or CTA.
- Show hierarchy with size: one hero tile (2×2), a few wide or tall tiles, and the rest 1×1. Use 6–10 tiles per grid.
- `grid-auto-flow: dense` fills holes but changes the visual order, so keep DOM order meaningful for keyboard and screen readers.
- **A span must never exceed the column count at any breakpoint.**

```css
.bento { display: grid; gap: 16px; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: minmax(160px, auto); grid-auto-flow: dense; }
.bento > * { min-width: 0; padding: 24px; border-radius: 24px; }
.bento .w2 { grid-column: span 2; }
.bento .h2 { grid-row: span 2; }
@media (max-width: 899px) { .bento { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 599px) {
  .bento { grid-template-columns: minmax(0, 1fr); grid-auto-rows: auto; }
  /* Same specificity as the span rules, so this reset wins. Without it, a span 2 in a
     1-column grid adds an implicit column: tiles get squeezed (to ~60px wide at 375px),
     and with fixed-width tracks the page overflows. */
  .bento .w2, .bento .h2 { grid-column: auto; grid-row: auto; }
}
```

**375px:** use a single column with spans reset (as above). `minmax(0, 1fr)` tracks stop long words or images from widening tiles.

## Spatial UI

Depth-first interfaces inspired by visionOS and AR: layered, floating, 3D-aware panels.

- Use three depth layers:
  - the environment (a blurred background)
  - content windows (glass panels)
  - floating controls and ornaments
- **Elevation:** nearer means a bigger, softer shadow and a slight `translateZ` or scale. Farther layers are blurrier and dimmer.
- Panels use large radii (24–32px), glass material and generous padding, so they feel like objects, not boxes.
- **3D tilt and parallax:** only on fine pointers, and never under reduced motion. Text keeps facing the viewer (about 5° rotation at most).

```css
.scene { perspective: 1200px; }
.panel {
  border-radius: 28px; color: #fff; background: rgb(255 255 255 / .1);
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
  box-shadow: 0 30px 60px -20px rgb(0 0 0 / .5);
  transition: transform .3s ease;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .panel:hover { transform: translateZ(24px) rotateX(2deg) rotateY(-3deg); }
}
```

**375px:**
- Flatten the layout: no tilt on touch, and panels stacked vertically.
- Keep perspective scenes, parallax and slide-in animations inside an `overflow: clip` wrapper.

---

## Before finishing

1. The style's tokens are defined and used consistently, and there is one primary style.
2. Contrast, focus rings, tap targets, and reduced motion and transparency are all handled.
3. The overflow check passes at **375px** and 320px, including open menus, modals and drawers.
4. The layout still holds at 768px and at 1280px or wider.
