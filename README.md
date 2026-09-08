# thenextio.ai — website

React + TypeScript + Vite. Built section-by-section per the project brief.

## Status

Done so far:
- **Design system** — `src/styles/tokens.css` (color, type scale, spacing, motion easing) and `src/styles/global.css` (resets, base type).
- **Navbar** — `src/components/Navbar` — transparent at top, blurred surface after scroll, magnetic CTA, mobile menu.
- **Hero** — `src/components/Hero` — split-reveal headline, capability line, magnetic buttons, and a realistic "System preview" product mockup (AI Workspace: assistant conversation, activity chart, activity feed) with a subtle cursor-driven tilt.

Not built yet (per the brief's section-by-section method): Intro/Manifesto, What We Build, AI Solutions, Digital Products, Automation, Selected Projects, Technology, Process, About, Final CTA, Footer.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Notes

- Typeface is **General Sans**, loaded from Fontshare in `index.html`. Swap the `<link>` there and the `--font-sans` token in `src/styles/tokens.css` to change it.
- All color, spacing and motion values are centralized in `src/styles/tokens.css` as CSS variables — the rest of the app should read from those tokens rather than hardcoding values, going forward.
- Animation uses `framer-motion` for entrance sequencing and cursor-driven micro-interactions (magnetic buttons, tilt on the preview card). No decorative particle systems or heavy effects, per the brief's performance and restraint guidance.
- Copy is placeholder/demo content — no invented clients, statistics, or claims, per the brief.
