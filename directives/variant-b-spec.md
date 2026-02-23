# Variant B: "The Builder" — Full Design Specification

> Bold & Conceptual. The site IS the demo.
> Glitch effects, node-graph decorations, agentic motifs. The portfolio of someone who builds the future.

---

## 1. Color System

### Primary Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#000000` | Main page background (true black) |
| `--bg-secondary` | `#0a0a0a` | Cards, nav bar, alternate sections |
| `--bg-tertiary` | `#141414` | Inputs, skill nodes, nested elements |
| `--bg-hover` | `#1f1f1f` | Hover states on tertiary elements |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#f5f5f5` | Headings, names, primary content |
| `--text-secondary` | `#a3a3a3` | Body text, descriptions (neutral-400) |
| `--text-muted` | `#737373` | Dates, periods, subtle labels (neutral-500) |
| `--text-link` | `#3b82f6` | Links, interactive text (blue-500) |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-blue` | `#3b82f6` | Primary accent, links, active nav tab |
| `--accent-red` | `#ef4444` | Secondary accent, glitch shadow, error states |
| `--accent-purple` | `#a855f7` | Tertiary accent, gradients, decorative elements |
| `--accent-blue-glow` | `rgba(59, 130, 246, 0.3)` | Neon glow on blue elements |
| `--accent-red-glow` | `rgba(239, 68, 68, 0.3)` | Neon glow on red elements |
| `--accent-purple-glow` | `rgba(168, 85, 247, 0.3)` | Neon glow on purple elements |
| `--gradient-neon` | `linear-gradient(135deg, #3b82f6, #a855f7, #ef4444)` | Hero name, primary CTAs |
| `--gradient-blue-purple` | `linear-gradient(135deg, #3b82f6, #a855f7)` | Section titles, secondary buttons |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-default` | `#1f1f1f` | Card borders, dividers |
| `--border-hover` | `#3b82f6` | Hover state on cards |
| `--border-glow` | `0 0 15px rgba(59, 130, 246, 0.2)` | Neon border glow (box-shadow) |

### Mouse Glow
| Property | Value |
|----------|-------|
| Color RGB | `99, 102, 241` (mix of blue-purple) |
| Radius | `800px` |
| Opacity | `0.12` |
| Blend | Additive — visible glow on pure black background |

---

## 2. Typography

### Font Stack
| Role | Font | Fallback | Weight(s) |
|------|------|----------|-----------|
| Display / Headings | Space Grotesk | Inter, sans-serif | 500, 600, 700 |
| Body | Inter | -apple-system, sans-serif | 400, 500 |
| Monospace accents | JetBrains Mono | Fira Code, Consolas, monospace | 400, 500 |

### Scale
| Element | Size | Weight | Line-height | Font |
|---------|------|--------|-------------|------|
| Hero name | `4.5rem` | 700 | 1.05 | Space Grotesk |
| Hero subtitle | `1.5rem` | 400 | 1.4 | JetBrains Mono |
| Hero description | `1.125rem` | 400 | 1.7 | Inter |
| Section title | `2.5rem` | 600 | 1.15 | Space Grotesk |
| Nav tab text | `0.875rem` | 500 | 1.5 | Space Grotesk |
| Card heading (h3) | `1.5rem` | 600 | 1.3 | Space Grotesk |
| Body text | `1rem` | 400 | 1.7 | Inter |
| Small text / labels | `0.875rem` | 500 | 1.5 | Inter |
| Dates / periods | `0.875rem` | 400 | 1.5 | JetBrains Mono |
| Metadata footer | `0.75rem` | 400 | 1.5 | JetBrains Mono |
| Skill node text | `0.875rem` | 500 | 1.4 | Inter |
| Code/terminal text | `1rem` | 400 | 1.5 | JetBrains Mono |

### Special Typography
- **Hero name**: CSS glitch animation effect — `text-shadow` with offset blue and red shadows that jitter. Uses `--gradient-neon` for `background-clip: text`
- **Hero subtitle**: Rendered as `> full_stack_engineer.build()` in JetBrains Mono, like a terminal command with a blinking cursor
- **Section titles**: `--gradient-blue-purple` background-clip text, Space Grotesk weight 600
- **Terminal motif**: Various elements use `>` prefix and monospace font to evoke command-line aesthetic

---

## 3. Layout Architecture

### Overall Structure
```
┌─────────────────────────────────────────────────────┐
│  [Sticky Top Nav]                                    │
│  ● About  ● Skills  ● Projects  ● Contact  ● ...    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────── Hero ────────────────┐           │
│  │  [node-graph SVG decoration]          │           │
│  │  > DYLAN BALLARD  (glitch effect)     │           │
│  │  > full_stack_engineer.build()         │           │
│  │  description paragraph                 │           │
│  │  [Get In Touch]  [View Resume]         │           │
│  └───────────────────────────────────────┘           │
│                                                      │
│  ┌──────────── Skills ──────────────────┐           │
│  │  [node] ── [node] ── [node]           │           │
│  │    │         │         │               │           │
│  │  [node] ── [node]                     │           │
│  └───────────────────────────────────────┘           │
│                                                      │
│  ┌──── Metadata Footer ────────────────┐            │
│  └───────────────────────────────────────┘           │
└─────────────────────────────────────────────────────┘
```

### Dimensions
| Element | Value |
|---------|-------|
| Nav height | `64px` |
| Content max-width | `1200px` |
| Content padding (horizontal) | `3rem` |
| Section padding (vertical) | `8rem 0` |
| Card border-radius | `1rem` |
| Button border-radius | `0.5rem` |
| Skill node size | `auto` (pill, padding-based) |
| Node-graph dot size | `6px` |
| Node-graph line width | `1px` |

### Grid/Flex Patterns
- **Page layout**: Single column, full-width, `margin-top: 64px` (below fixed nav)
- **Nav**: `position: fixed; top: 0; width: 100%; height: 64px; z-index: 50` — Flexbox row, tabs centered
- **Content area**: `max-width: 1200px; margin: 0 auto; padding: 0 3rem`
- **Skills**: `display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center` per category
- **Projects**: `grid-template-columns: repeat(auto-fit, minmax(500px, 1fr))` — large hero-image cards
- **Contact**: `grid-template-columns: 1fr 1fr`

---

## 4. Section-by-Section Design

### 4.1 Top Navigation Bar
**Structure:**
- Fixed at top, full width, `64px` height
- Left side: Name "DB" in monospace as a logo/mark, `--accent-blue`
- Center: Tab links (About, What I Build With, Things I've Shipped, Get in Touch)
- Right side: Social icons (GitHub, LinkedIn) — 18px, `--text-muted`, hover → `--text-primary`

**Behavior:**
- Background: `--bg-secondary` with `backdrop-filter: blur(12px)` and partial transparency (`rgba(10,10,10,0.85)`)
- Border-bottom: `1px solid --border-default`
- Active tab: `--accent-blue` text color + bottom border indicator (2px, `--accent-blue`)
- Inactive tabs: `--text-muted`, hover → `--text-secondary`
- Tabs use Space Grotesk, 0.875rem, weight 500, `text-transform: uppercase`, `letter-spacing: 0.05em`

**Active section tracking:**
- Uses IntersectionObserver on each section
- Bottom border indicator slides under the active tab
- Transition: `left 0.3s ease, width 0.3s ease`

### 4.2 Hero Section
**Layout:** Single column, full-width content area (below fixed nav)
**Min-height:** `100vh`, display: flex, align-items: center
**Background:** Dark blue/purple atmospheric gradient:
```css
background:
  radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.12) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 60%, rgba(168,85,247,0.08) 0%, transparent 50%),
  var(--bg-primary);
```

**Node-graph decoration:**
- Subtle SVG positioned absolutely in the hero background
- Small dots (6px circles, `--border-default` fill) connected by thin lines (1px, `--border-default`)
- Arranged in a loose organic network pattern
- Opacity: 0.3 — purely decorative
- Slight parallax on scroll (optional polish)

**Content (centered):**
- Terminal-style prefix `>` in `--accent-blue` before the name
- Name: "DYLAN BALLARD" in Space Grotesk 4.5rem, uppercase, with glitch animation and `--gradient-neon` background-clip text
- Below name: `> full_stack_engineer.build()` in JetBrains Mono 1.5rem, `--accent-purple`, with blinking cursor animation
- Description: "Welcome to my corner of the Internet, where I showcase my work, my craft, and the things I'm building." in Inter, `--text-secondary`
- Two buttons: "Get In Touch" (gradient neon, box-shadow with blue glow) + "View Resume" (outlined, `--border-default`, hover → `--border-hover` with subtle glow)
- NO profile photo in this variant — the design IS the personality

**Hero → content transition:**
```css
.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: linear-gradient(to bottom, transparent, var(--bg-primary));
  pointer-events: none;
}
```

**Glitch animation CSS:**
```css
@keyframes glitch {
  0%, 100% {
    text-shadow: 2px 0 #ef4444, -2px 0 #3b82f6;
  }
  20% {
    text-shadow: -3px 0 #ef4444, 3px 0 #3b82f6;
  }
  40% {
    text-shadow: 3px 0 #ef4444, -3px 0 #3b82f6;
  }
  60% {
    text-shadow: -2px 0 #ef4444, 2px 0 #3b82f6;
  }
  80% {
    text-shadow: 1px 0 #ef4444, -1px 0 #3b82f6;
  }
}

.hero-name {
  animation: glitch 3s infinite;
  animation-timing-function: steps(1);
}
```

**Blinking cursor animation:**
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: var(--accent-purple);
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}
```

### 4.3 About Section
**Background:** `--bg-primary`
**Section title:** "About" in Space Grotesk, `--gradient-blue-purple` text
**Content:** Single paragraph, max-width `800px` centered
**Text:** `--text-secondary`

### 4.4 Skills Section
**Section heading displayed:** "What I Build With" (creative label, per Maxime Heckel style)
**Background:** `--bg-secondary`
**Layout:** 4 categories, each as a titled group
**Category name:** Space Grotesk, `--accent-blue`, 1.25rem
**Skills:** Displayed as "node" chips in a flex-wrap layout

**Each node chip:**
- Background: `--bg-tertiary`
- Border: 1px solid `--border-default`
- Border-radius: 2rem (pill)
- Padding: 0.5rem 1.25rem
- Icon: 18px, monochrome by default
- Hover: border → `--accent-blue`, subtle blue glow (`box-shadow: 0 0 12px var(--accent-blue-glow)`), icon shows real color

**Connecting-line motif:**
- Between skill categories, thin decorative lines (1px, `--border-default`) connect the groups
- These are purely decorative SVG lines
- Creates a "node graph" / "circuit board" feel

### 4.5 Projects Section
**Section heading displayed:** "Things I've Shipped" (creative label)
**Background:** `--bg-primary`
**Layout:** Auto-fit grid (minmax 500px) — large cards
**Cards are meant to be immersive**

**Each card:**
- Background: `--bg-tertiary`
- Border: 1px solid `--border-default`, hover → neon glow
- Image area: Full-width at top of card, no padding, `border-radius: 1rem 1rem 0 0`
- Image: scale 1.08x on hover, with overlay gradient from bottom (to make text readable if it overlaps)
- Title: Space Grotesk, `--text-primary`, 1.75rem
- Tech stack: small monochrome logos, 24px, color on hover
- Description: `--text-secondary`
- Link: `--accent-blue` with arrow icon, hover → glow effect
- Hover: entire card lifts with `transform: translateY(-4px)` and gets `--border-glow`

### 4.6 Contact Section
**Background:** `--bg-secondary`
**Layout:** 2-column grid (info left, form right)
**Section title includes terminal motif:** `> Get in Touch`

**Left side:**
- Casual intro text: "Drop me a line at dylanballard55@gmail.com. Or find me on GitHub and LinkedIn -- that's where I share most of my work."
- Contact info as monospace-styled items
- Each item: `>` prefix in `--accent-blue`, then icon + text
- Icons: 20px, `--accent-blue`
- Text: `--text-secondary`

**Right side (form):**
- Background: `--bg-tertiary`
- Border: 1px solid `--border-default`
- Border-radius: 1rem
- Inputs: `--bg-hover` background, `--border-default` border
- Focus: border → `--accent-blue` + `box-shadow: 0 0 8px var(--accent-blue-glow)`
- Submit button: `--gradient-neon` background, glow on hover
- Button text: Space Grotesk, weight 600

### 4.7 Metadata Footer
**Background:** `--bg-secondary`
**Border-top:** 1px solid `--border-default`
**Font:** JetBrains Mono, 0.75rem, `--text-muted`
**Layout:** Flex row, space-between
**All text prefixed with `//`** (code comment motif)
**Neon accent:** thin `--gradient-neon` line (1px height) above the footer content

**Content (left to right):**
- `// Built with React 19 + TypeScript + Vite`
- `// Viewport: {w} x {h}` (live-updating via resize listener)
- `// Last updated: Feb 2026`
- `// Deployed on Vercel`

**Copyright (centered below):**
```
// (c) 2026 Dylan Ballard. Built different.
```
Style: `--text-muted`, 0.75rem, JetBrains Mono

---

## 5. Interactions & Animations

### 5.1 Mouse Glow
- Same mechanics as Variant A but more visible
- Fixed overlay covering full viewport
- `pointer-events: none`, `z-index: 1`
- `radial-gradient(800px circle at var(--glow-x) var(--glow-y), rgba(99,102,241,0.12), transparent 70%)`
- Updates on `mousemove` via CSS custom properties
- Transition: `background 0.15s ease` for smoothness
- **Mobile:** Disabled (no cursor)

### 5.2 Scroll Animations
- Elements start `opacity: 0; transform: translateY(30px)`
- On viewport enter (IntersectionObserver, threshold 0.1): transition to `opacity: 1; transform: translateY(0)`
- Duration: `0.6s ease-out`
- Stagger: Each item in a list delays +120ms from the previous
- Respects `prefers-reduced-motion`: skip animations if user prefers

### 5.3 Nav Tab Highlighting
- Bottom border indicator slides horizontally under the active tab
- Indicator: 2px height, `--accent-blue`
- Transition: `left 0.3s ease, width 0.3s ease`

### 5.4 Glitch Effect (Hero)
- Runs continuously on the hero name
- Steps animation (not smooth) for authentic glitch feel
- Red and blue text-shadow offset jitters
- Duration: 3s loop
- Subtle — shadow offset is only 1-3px

### 5.5 Blinking Cursor (Hero Subtitle)
- Inline block element after the subtitle text
- 2px wide, 1.2em tall, `--accent-purple` background
- Blinks with step-end timing, 1s loop

### 5.6 Hover Effects
| Element | Hover Effect |
|---------|-------------|
| Nav tabs | Text: muted → secondary, underline slides in |
| Cards (project) | Border glow, translateY(-4px) lift |
| Skill nodes | Border → blue, blue glow box-shadow, icon color |
| Primary buttons | Glow intensifies, slight scale(1.02) |
| Secondary buttons | Border glow, text → blue |
| Project images | Scale 1.08x |
| Project tech logos | Monochrome → color |
| Links | Color: blue, glow on text |

### 5.7 Hero Entrance
- Name glitches in from 0 opacity (0.8s)
- Subtitle types in letter by letter (typewriter effect, 1.5s), then cursor starts blinking
- Description fades in (0.6s, 400ms delay after subtitle)
- Buttons fade in + slide up (0.6s, 600ms delay)
- Node-graph SVG fades in slowly (2s, 0.3 final opacity)

---

## 6. Responsive Design

### Breakpoint: 1024px (Tablet landscape)
- Content max-width: `900px`
- Project cards: single column
- Hero name: `3.5rem`

### Breakpoint: 768px (Tablet portrait / Mobile)
- **Nav becomes hamburger menu:**
  - Left: "DB" mark
  - Right: hamburger icon (3 lines)
  - Opens full-screen overlay with nav links (centered, large text)
  - Overlay background: `--bg-primary` with 0.95 opacity
- Hero name: `2.5rem`
- Hero subtitle: `1rem`
- Skills: 2 columns
- Contact: single column
- Section padding: `4rem 0`

### Breakpoint: 480px (Small mobile)
- Hero name: `2rem`
- Section titles: `1.75rem`
- Content padding: `1.5rem`
- Cards padding: `1.5rem`
- Button text: `0.9rem`
- Nav overlay links: `1.5rem`
- Node-graph decoration: hidden

---

## 7. Accessibility

- All interactive elements have visible focus rings (`2px solid --accent-blue, offset 2px`)
- Focus rings only show on keyboard navigation (`:focus-visible`)
- Glitch animation respects `prefers-reduced-motion` — falls back to static gradient text
- Blinking cursor respects `prefers-reduced-motion` — stays solid
- Scroll animations disabled when `prefers-reduced-motion: reduce`
- All images have descriptive `alt` text
- Form inputs have associated `<label>` elements
- Color contrast: all text/background combinations meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Nav uses `<nav>` landmark with `aria-label="Main navigation"`
- Active tab has `aria-current="true"`
- Skip-to-content link hidden until focused
- Node-graph SVGs have `aria-hidden="true"` (decorative)

---

## 8. Content (Exact Text)

### Hero
- Name: `DYLAN BALLARD` (uppercase in this variant)
- Subtitle: `> full_stack_engineer.build()`
- Description: `Welcome to my corner of the Internet, where I showcase my work, my craft, and the things I'm building.`
- CTA 1: `Get In Touch` → scrolls to #contact
- CTA 2: `View Resume` → opens /DylanBallardResume2025.pdf in new tab

### About
- Title: `About`
- Text (paragraph 1): `I'm a full-stack engineer who builds things end to end — from database schemas to pixel-perfect UIs. My appetite for learning has recently led me to explore AI integrations, agentic workflows, and the intersection of LLMs and product development.`
- Text (paragraph 2): `When not shipping, I like working on side projects that let me experiment with ideas I find interesting — gamification systems, media platforms, and tools that solve problems I actually have.`

### Skills
- Section title: `What I Build With`

**Frontend Development:** React (Hooks, Context, Suspense), TypeScript, JavaScript (ES6+), React Native, Next.js, Vite, Zustand, TanStack Query, Tailwind CSS, Responsive Design & A11y, Component Architecture & Design Systems

**Backend Development:** Python, FastAPI, SQL, PostgreSQL, MySQL, Supabase, Render, RESTful & GraphQL APIs, Auth (JWT, OAuth), LLM Integrations (OpenAI, Anthropic, Bedrock), Async Processing (Celery, asyncio), ETL Pipelines & Data Processing, Pandas, NumPy

**Cloud & DevOps:** AWS (EC2, S3, RDS, Lambda, SageMaker), Docker & Containerization, CI/CD (GitHub Actions, Railway), Vercel, Railway Deployments, Monitoring (CloudWatch), IaC & Terraform, Linux Systems & Shell Scripting

**Tools & Collaboration:** Cursor, VS Code, Git, GitHub, Node.js, NPM, pnpm, Postman, Figma (UI/UX), Agile, Scrum, Jira, Testing (Jest, Pytest, Vitest), Technical Writing & Documentation

### Projects
- Section title: `Things I've Shipped`

**Embark:**
- Image: /assets/projects/embark.webp
- Tech: React, TypeScript, FastAPI, Python, Supabase
- Description: Life gamification web app that turns real-world activities into RPG-style quests. Users complete challenges, earn Glory currency and XP, level up, and collect items with rarity tiers.
- URL: https://embark-theta.vercel.app

**Cinetik:**
- Image: /assets/projects/cinetik.webp
- Tech: React, TypeScript, FastAPI, Python
- Description: Full-stack media tracking and social app for movies and TV shows. Users track favorites and manage watchlists.
- URL: https://cinetik.app

### Contact
- Section title: `> Get in Touch`
- Intro text: `Drop me a line at dylanballard55@gmail.com. Or find me on GitHub and LinkedIn — that's where I share most of my work.`
- Phone: (703) 848-5998
- Email: dylanballard55@gmail.com
- Location: Reston, VA
- GitHub: https://github.com/dballard10
- LinkedIn: https://linkedin.com/in/dballard55

### Metadata Footer
- `// Built with React 19 + TypeScript + Vite`
- `// Viewport: {w}×{h}`
- `// Last updated: Feb 2026`
- `// Deployed on Vercel`
- Copyright: `// © 2026 Dylan Ballard. Built different.`

---

## 9. File Structure for Variant B

```
src/variants/variant-b/
  VariantB.tsx          — Root: top nav + full-width content layout
  Navigation.tsx        — Sticky top nav with tabs + hamburger mobile
  Hero.tsx              — Glitch name, terminal subtitle, node-graph bg, CTAs
  About.tsx             — About paragraph
  Skills.tsx            — Skill node chips with connecting-line motif
  Projects.tsx          — Large hero-image project cards
  Contact.tsx           — Terminal-styled contact info + form
  NodeGraph.tsx         — Decorative SVG node-graph background component
  variant-b.css         — All Variant B styles
```
