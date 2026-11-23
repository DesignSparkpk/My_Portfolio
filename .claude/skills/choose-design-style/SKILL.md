---
name: choose-design-style
description: Pick the right design style for a website or UI when the user has NOT named one. Use for any request to build, design, redesign, restyle or "make beautiful" a website, landing page, portfolio, app screen, dashboard or section. Maps the kind of site, audience and goal to one of the 10 style skills (skeuomorphism, neumorphism, glassmorphism, claymorphism, brutalism, minimalism, maximalism, liquid-glass, bento-grid, spatial-ui), then applies that skill.
---

# Choose a design style

The user does not know which style fits which site. You decide, explain the pick in one line, then follow that style's skill.

## Steps
1. **If the user named a style, use it.** Skip this skill.
2. **If restyling existing code,** read its current colors and components first. Keep the existing direction unless the user asks for a change.
3. **Identify the site type** from the request (and the existing content if any), then pick from the table.
4. **Pick one main style.** Optionally add `bento-grid` as a *layout* for feature/skills/stats sections, since it combines with any visual style.
5. **Tell the user in one line**, e.g. "Using Glassmorphism (fits a modern tech portfolio) with a Bento Grid for the services section." Then invoke that style's skill and build.

## Site type → style

| Site / goal | Main style | Second choice |
|---|---|---|
| Developer / IT / tech portfolio | glassmorphism | spatial-ui |
| Designer / creative / art portfolio | brutalism | maximalism |
| Corporate, consulting, law, finance, B2B | minimalism | bento-grid |
| SaaS product / startup landing page | bento-grid (layout) + minimalism | liquid-glass |
| App or product launch, "next-gen" tech, AI | liquid-glass | spatial-ui |
| Dashboard, analytics, admin, stats page | bento-grid | neumorphism |
| Smart-home, IoT, settings, controls, widgets | neumorphism | glassmorphism |
| Kids, education, games, fun consumer apps | claymorphism | maximalism |
| Music, events, fashion, youth brands, campaigns | maximalism | brutalism |
| Luxury, heritage, vintage, craft, restaurants, music players | skeuomorphism | minimalism |
| Agency, indie maker, magazine/zine, bold personal brand | brutalism | maximalism |
| Photography, architecture, writing, blog | minimalism | spatial-ui |
| Weather, travel, hotel, booking | glassmorphism | liquid-glass |
| Showcase / immersive gallery / 3D / AR-VR product | spatial-ui | liquid-glass |
| E-commerce (general) | minimalism | bento-grid |

## Tie-breakers
- **Content-heavy (long text, docs, forms)** → minimalism. Avoid glass, neumorphism and maximalism for long reading.
- **Serious audience** (finance, health, legal, government) → minimalism. Avoid claymorphism and maximalism.
- **Accessibility or low-end devices matter most** → minimalism or brutalism (both high contrast and light on effects). Avoid heavy blur (glassmorphism, liquid-glass, spatial-ui) and low-contrast neumorphism.
- **Brand already has strong colors** → keep them and choose the style whose palette rules fit them.
- **Still unsure** → minimalism is the safe default; say so and offer the second choice.

## Don't
- Mix more than one *visual* style on one page (bento-grid as layout is the only exception).
- Pick silently: always state the chosen style and the reason.
