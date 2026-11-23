---
name: minimalism
description: Design web UI in the Minimalism style, focusing on simplicity, clean typography, generous whitespace, restrained color and very few elements. Use when the user asks for minimal, minimalist, clean, simple, elegant, Swiss or whitespace-heavy interfaces.
---

# Minimalism

"Simple ideas. Beautiful results." Every element earns its place. Hierarchy comes from typography, spacing and alignment, not decoration.

## Core principles
- **Remove until it breaks.** One message per section, one primary action per screen.
- **Whitespace is a component.** Large margins, generous line-height, wide section padding.
- **Type does the work.** 1 typeface (2 max), a clear scale, weight/size for hierarchy.
- **Restrained palette.** Neutrals plus one accent (or none).

## Design tokens
```css
:root {
  --bg: #fafaf8;
  --surface: #ffffff;
  --text: #111111;
  --text-muted: #6b6b6b;
  --line: #e7e7e4;
  --accent: #111111;   /* or a single brand color */
  --radius: 6px;
  --space-section: clamp(5rem, 12vw, 10rem);
  --maxw: 1100px;
  --font: "Inter", "Helvetica Neue", Arial, sans-serif;
  /* Type scale (1.25) */
  --fs-0: 1rem; --fs-1: 1.25rem; --fs-2: 1.563rem; --fs-3: 1.953rem; --fs-4: 2.441rem; --fs-5: 3.815rem;
}
```

## Key CSS patterns
```css
body { background: var(--bg); color: var(--text); font-family: var(--font);
       font-size: var(--fs-0); line-height: 1.65; -webkit-font-smoothing: antialiased; }
.container { max-width: var(--maxw); margin-inline: auto; padding-inline: 1.5rem; }
section { padding-block: var(--space-section); }
h1 { font-size: var(--fs-5); font-weight: 500; letter-spacing: -.03em; line-height: 1.05; }
p { max-width: 60ch; color: var(--text-muted); }
.btn { background: var(--accent); color: #fff; padding: .75rem 1.25rem;
       border-radius: 999px; border: none; font-weight: 500; }
.link { color: var(--text); text-decoration: underline; text-underline-offset: 4px; }
hr { border: none; border-top: 1px solid var(--line); }
```

## Do
- Align everything to a strict grid; consistent spacing scale (4/8px based).
- Use one high-quality image or object as a focal point.
- Keep motion subtle (fade/translate 8–16px, 300–500ms).

## Don't
- Hide important navigation for the sake of minimalism.
- Use light-gray text that fails contrast (muted text ≥ 4.5:1).
- Fill empty space just because it is empty.

## Good fits
Personal portfolios, product landing pages, studios, architecture, writing/blogs.
