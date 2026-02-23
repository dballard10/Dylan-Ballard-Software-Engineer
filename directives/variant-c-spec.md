# Variant C: "The Minimalist" — Full Design Specification

> Sharp & Clean. T3.gg restraint meets perfect craft.
> No decoration, just typography and whitespace. Every pixel earns its place.

---

## 1. Color System

### Primary Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#111111` | Main page background (near-black) |
| `--bg-secondary` | `#191919` | Cards, alternate sections |
| `--bg-tertiary` | `#222222` | Inputs, tags, nested elements |
| `--bg-hover` | `#2a2a2a` | Hover states |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#eeeeee` | Headings, names, primary content |
| `--text-secondary` | `#999999` | Body text, descriptions |
| `--text-muted` | `#666666` | Dates, periods, subtle labels |
| `--text-link` | `#f59e0b` | Links, interactive text (amber-500) |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-amber` | `#f59e0b` | Primary accent, links, progress bar (amber-500) |
| `--accent-orange` | `#f97316` | Secondary accent, hover states (orange-500) |
| `--accent-amber-dim` | `rgba(245, 158, 11, 0.15)` | Subtle amber backgrounds |
| `--accent-amber-hover` | `#d97706` | Darker amber for hover (amber-600) |
| `--gradient-warm` | `linear-gradient(135deg, #f59e0b, #f97316)` | Rare accent use (progress bar, special elements) |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-default` | `#222222` | Card borders, dividers |
| `--border-hover` | `#333333` | Hover state borders |
| `--border-accent` | `#f59e0b` | Active/focused element borders |

### Mouse Glow
| Property | Value |
|----------|-------|
| Color RGB | `245, 158, 11` (amber-500) |
| Radius | `500px` |
| Opacity | `0.05` |
| Blend | Barely visible — warm subtle hint, not distracting |

---

## 2. Typography

### Font Stack
| Role | Font | Fallback | Weight(s) |
|------|------|----------|-----------|
| Display / Headings | Instrument Serif | Georgia, serif | 400 (regular only — serifs don't need bold) |
| Body | Inter | -apple-system, sans-serif | 400, 500 |
| Monospace accents | JetBrains Mono | Fira Code, Consolas, monospace | 400 |

### Scale
| Element | Size | Weight | Line-height | Font |
|---------|------|--------|-------------|------|
| Hero name | `4rem` | 400 | 1.1 | Instrument Serif |
| Hero description | `1.25rem` | 400 | 1.6 | Inter |
| Section title | `2.5rem` | 400 | 1.2 | Instrument Serif |
| Card heading (h3) | `1.25rem` | 500 | 1.3 | Inter |
| Body text | `1rem` | 400 | 1.8 | Inter |
| Small text / labels | `0.875rem` | 400 | 1.5 | Inter |
| Dates / periods | `0.875rem` | 400 | 1.5 | JetBrains Mono |
| Metadata footer | `0.75rem` | 400 | 1.5 | JetBrains Mono |
| Skill text | `1rem` | 400 | 1.6 | Inter |

### Special Typography
- **Hero name**: Instrument Serif, regular weight (400). NO gradient, NO effects. Just the name in `--text-primary`. The serif typeface IS the design element.
- **Section titles**: Instrument Serif, 2.5rem, `--text-primary`. Clean, left-aligned, no decoration. Lowercase (e.g., "about", "skills", "projects", "contact").
- **Body text**: Inter 400, generous line-height (1.8). Readability is paramount.
- **Skill lists**: Expand-on-interact reveal mechanic. JetBrains Mono, dot-separated, lowercase. Categories collapse to a single line and expand on hover/click (see Section 4.4).

---

## 3. Layout Architecture

### Overall Structure
```
┌───────────────────────────────────────┐
│ [Scroll Progress Bar — thin amber]    │  ← fixed top, 2px
├───────────────────────────────────────┤
│                                        │
│          ┌──── Hero ────┐             │
│          │  Dylan Ballard│             │  ← centered, just name
│          │  one-line desc │             │
│          └───────────────┘             │
│                                        │
│          ┌──── About ───┐             │
│          │  paragraph    │             │  ← narrow column
│          └───────────────┘             │
│                                        │
│          ┌── Skills ─────┐             │
│          │  comma text    │             │
│          └───────────────┘             │
│                                        │
│          ┌── Projects ───┐             │
│          │  text card     │             │
│          │  text card     │             │
│          └───────────────┘             │
│                                        │
│          ┌── Contact ────┐             │
│          │  form          │             │
│          └───────────────┘             │
│                                        │
│          ┌── Metadata ───┐             │
│          └───────────────┘             │
│                                        │
│                          [↑ Back to top]│ ← floating button
└───────────────────────────────────────┘
```

### Dimensions
| Element | Value |
|---------|-------|
| Content max-width | `680px` |
| Content padding (horizontal) | `2rem` |
| Section padding (vertical) | `6rem 0` |
| Section divider | `1px solid --border-default` between each section |
| Card border-radius | `0` (sharp corners — minimalist) |
| Button border-radius | `0` (sharp corners) |
| Progress bar height | `2px` |
| Back-to-top button size | `40px` |

### Grid/Flex Patterns
- **Page layout**: Single centered column, `max-width: 680px; margin: 0 auto; padding: 0 2rem`
- **No grid at all**: Everything flows in a single column. No 2-column layouts. Content stacks.
- **Skills**: Paragraph-style text per category
- **Projects**: Stacked text-forward cards (image secondary, below text)
- **Contact**: Centered single-column form

---

## 4. Section-by-Section Design

### 4.1 Scroll Progress Bar (replaces navigation)
- No traditional navigation. The content flows like an article.
- Fixed at top of viewport: `position: fixed; top: 0; left: 0; height: 2px; z-index: 50`
- Background: `--gradient-warm` (amber to orange)
- Width: dynamically calculated based on scroll position (0% at top, 100% at bottom)
- Sits on a `--bg-primary` track (invisible on dark bg)
- This is the ONLY persistent UI element

### 4.2 Hero Section
**Layout:** Single centered column, no sidebar
**Min-height:** `80vh` (not full viewport — content starts to peek above the fold)
**Display:** flex, align-items: center, justify-content: center
**Background:** Warm atmospheric gradient:
```css
background: radial-gradient(ellipse at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 60%),
            var(--bg-primary);
```

**Content (centered, text-only):**
- Name: "Dylan Ballard" in Instrument Serif, 4rem, `--text-primary`. No gradient, no effects.
- One-line description: "I build products I care about." in Inter, 1.25rem, `--text-secondary`
- NO profile photo
- NO buttons (they appear in the Contact section — this hero is pure restraint)
- Below the description, a single thin line (`1px solid --border-default`, `width: 60px`, centered) acts as a subtle visual anchor

**Hero → content transition:**
- No dramatic gradient fade. Just generous whitespace (padding-bottom: 8rem) and the natural background.
- The warm radial gradient in the hero fades naturally.

### 4.3 About Section
**Background:** `--bg-primary`
**Separated from hero** by section divider (1px line, full-width of column)
**Title:** "about" in Instrument Serif (lowercase), left-aligned
**Text:** `--text-secondary`, generous line-height 1.8
**The paragraph just breathes** — lots of space around it

### 4.4 Skills Section
**Background:** `--bg-primary`
**Divider above**
**Title:** "skills" in Instrument Serif (lowercase)

**Expand-on-interact reveal mechanic:**
Each skill category is a single collapsed line that expands on hover/click to reveal the full list.

**Collapsed state (default):**
- Each category shows as: `frontend ·····` (category name + ellipsis dots)
- Font: JetBrains Mono, 1rem, `--text-muted`
- All categories are lowercase
- Dots are `--text-muted` at 0.4 opacity
- Cursor: pointer
- Categories stacked vertically with `1.5rem` gap

**Expanded state (on hover or click):**
- The dots dissolve and the full skill list appears: `frontend · react · typescript · next.js · vite · zustand · tailwind`
- Skills listed dot-separated (` · `), JetBrains Mono, `--text-secondary`
- Category name becomes `--accent-amber` when expanded
- Transition: `max-height 0.4s ease, opacity 0.3s ease`
- On mobile, click/tap toggles (no hover)

**Categories (4 lines when collapsed):**
- `frontend ·····`
- `backend ·····`
- `cloud & devops ·····`
- `tools ·····`

**Implementation note:** Use CSS `max-height` transition from `1.5rem` (collapsed, single line, overflow hidden) to `auto` (expanded). Or use a small state toggle per category. The interaction itself IS the design — minimal but playful.

### 4.5 Projects Section
**Background:** `--bg-primary`
**Divider above**
**Title:** "projects" in Instrument Serif (lowercase)
**Text-forward, brief format** — title + one-line description + link.
**Text-forward cards, stacked**

**Each card:**
- Border: `1px solid --border-default` (full box border — exception to borderless pattern because projects need visual separation)
- Border-radius: `0` (sharp)
- Padding: `2rem`
- Title: Inter weight 500, `--text-primary`, 1.25rem
- Description: `--text-secondary`, line-height 1.8
- Tech stack: comma-separated text in `--text-muted`, JetBrains Mono, 0.875rem. No icons.
- Link: `--accent-amber`, underline on hover, external-link icon (small, 14px)
- Image: Placed BELOW the text content, full-width, subtle `border: 1px solid --border-default`
- Image has `filter: brightness(0.9)` by default, full brightness on hover
- Hover on card: border changes from `--border-default` to `--border-hover`
- Gap between cards: `2rem`

### 4.6 Contact Section
**Background:** `--bg-primary`
**Divider above**
**Title:** "contact" in Instrument Serif (lowercase)
**Centered single-column form (no info/form split)**

**Contact info (above form):**
- Centered text block
- Email: `--accent-amber`, clickable
- Location: `--text-secondary`
- Social links: "GitHub" and "LinkedIn" as text links with `--accent-amber`, separated by ` · `
- Phone: `--text-secondary`
- Minimal — just the essentials, no icons

**Form:**
- Max-width: `480px`, centered within the 680px column
- Inputs: `--bg-tertiary` background, `--border-default` border, sharp corners (border-radius: 0)
- Focus: border changes to `--accent-amber`
- Labels: Inter, `--text-muted`, 0.875rem, above inputs
- Submit button: `--accent-amber` background, `#111` text, sharp corners, no shadow
- Hover: `--accent-amber-hover` background
- Very clean, no frills

### 4.7 Metadata Footer
**Background:** `--bg-primary` (same as rest — no visual break)
**Border-top:** `1px solid --border-default`
**Font:** JetBrains Mono, 0.75rem, `--text-muted`
**Layout:** centered, single line wrapping as needed

**Content:**
```
React 19 · TypeScript · Vite · Vercel · {width}×{height} · Feb 2026
```
Everything separated by ` · ` (middle dot)

**Copyright below:**
```
© 2026 Dylan Ballard
```

Ultra-minimal — no prefixes, no labels, just the facts. Generous padding bottom (4rem).

---

## 5. Interactions & Animations

### 5.1 Mouse Glow
- Barely visible — should feel like a warm light source, not an effect
- Fixed overlay covering full viewport, `pointer-events: none`, `z-index: 1`
- `radial-gradient(500px circle at var(--glow-x) var(--glow-y), rgba(245,158,11,0.05), transparent 70%)`
- Updates on `mousemove` via CSS custom properties
- **Mobile:** Disabled (no cursor)

### 5.2 Scroll Animations
- Extremely subtle — just opacity, NO translateY
- Elements start `opacity: 0`
- On viewport enter (IntersectionObserver): transition to `opacity: 1`
- Duration: `0.8s ease`
- Stagger: +80ms per item
- Respects `prefers-reduced-motion`: skip animations if user prefers
- The minimalist approach means less motion, not more

### 5.3 Scroll Progress Bar
- Width tracks scroll position: `width: (scrollY / (docHeight - viewHeight)) * 100%`
- Smooth visual (no animation needed — direct binding)
- Gradient: amber to orange

### 5.4 Back-to-Top Button
- Fixed, bottom-right: `position: fixed; bottom: 2rem; right: 2rem`
- Hidden when at top of page (opacity 0, pointer-events none when scrollY < 300)
- Appears with `opacity 0.3s ease` transition
- 40px square, `--bg-tertiary` background, `--border-default` border, sharp corners
- Arrow-up icon: `--text-muted`, 18px
- Hover: border changes to `--accent-amber`, icon changes to `--accent-amber`
- Click: smooth scroll to top

### 5.5 Hover Effects
| Element | Hover Effect |
|---------|-------------|
| Project cards | Border: default to hover (slight lighten) |
| Project images | Brightness filter removed |
| Links (text) | Underline appears |
| Submit button | Background darkens to amber-600 |
| Back-to-top | Border + icon change to amber |
| Social links | Underline appears |

- NO hover lifts (translateY), NO glows, NO scale transforms
- Hover effects are minimal: color shifts and underlines only

### 5.6 Hero Entrance
- Name fades in (1s ease, from opacity 0)
- Description fades in (0.8s ease, 300ms delay)
- Decorative line fades in (0.6s ease, 500ms delay)
- That's it. No slides, no scales. Just presence.

---

## 6. Responsive Design

### Breakpoint: 768px (Tablet)
- Content max-width: `100%` (edge-to-edge within padding)
- Content padding: `1.5rem`
- Hero name: `3rem`
- Section titles: `2rem`
- Section padding: `4rem 0`

### Breakpoint: 480px (Mobile)
- Hero name: `2.25rem`
- Section titles: `1.75rem`
- Content padding: `1.25rem`
- Body text: `0.9375rem` (15px)
- Form max-width: `100%`
- Back-to-top button: `bottom: 1.5rem; right: 1.5rem`

### Breakpoint: 320px (Small mobile)
- Hero name: `1.75rem`
- Hero description: `1rem`
- Content padding: `1rem`
- Section padding: `3rem 0`

NOTE: This variant needs fewer responsive adjustments because the narrow single-column layout is inherently mobile-friendly.

---

## 7. Accessibility

- All interactive elements have visible focus rings (`2px solid --accent-amber, offset 2px`)
- Focus rings only show on keyboard navigation (`:focus-visible`)
- Scroll animations disabled when `prefers-reduced-motion: reduce`
- All images have descriptive `alt` text
- Form inputs have associated `<label>` elements
- Color contrast: all text/bg combos meet WCAG AA (amber on dark meets 4.5:1)
- Skip-to-content link hidden until focused
- Back-to-top button has `aria-label="Back to top"`
- Scroll progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- No decorative elements that could confuse screen readers

---

## 8. Content (Exact Text)

### Hero
- Name: `Dylan Ballard`
- One-liner: `I build products I care about.`
- (No buttons, no photo — contact appears in Contact section)

### About
- Title: `about`
- Text: `Full-stack engineer. I like building things from scratch and shipping them. React + TypeScript on the front, Python + FastAPI on the back.`

### Skills
- Title: `skills`
- Format: Expand-on-interact reveal (see Section 4.4)

**Collapsed → Expanded:**
- `frontend ·····` → `frontend · react · typescript · javascript · react native · next.js · vite · zustand · tanstack query · tailwind · responsive design · component architecture`
- `backend ·····` → `backend · python · fastapi · sql · postgresql · mysql · supabase · rest apis · graphql · jwt · oauth · openai · anthropic · celery · asyncio · pandas · numpy`
- `cloud & devops ·····` → `cloud & devops · aws · docker · ci/cd · github actions · vercel · railway · cloudwatch · terraform · linux · shell scripting`
- `tools ·····` → `tools · cursor · vs code · git · github · node.js · npm · pnpm · postman · figma · jira · jest · pytest · vitest`

Note: All lowercase, dot-separated. No parenthetical details — just the tool/framework name.

### Projects
- Title: `projects`

**Embark:**
- Title: `Embark`
- One-liner: `Life gamification app. Quests, XP, loot.`
- Tech (muted): react, typescript, fastapi, python, supabase
- URL: https://embark-theta.vercel.app
- Image: /assets/projects/embark.webp (below text, subtle)

**Cinetik:**
- Title: `Cinetik`
- One-liner: `Track movies and shows.`
- Tech (muted): react, typescript, fastapi, python
- URL: https://cinetik.app
- Image: /assets/projects/cinetik.webp (below text, subtle)

### Contact
- Title: `contact`
- Info line: `dylanballard55@gmail.com · GitHub · LinkedIn` (dot-separated, all --accent-amber links)
- Phone: (703) 848-5998
- Location: Reston, VA
- Form fields: name, email, message, send

### Metadata Footer
- `React 19 · TypeScript · Vite · Vercel · {width}×{height} · Feb 2026`
- Copyright: `© 2026 Dylan Ballard`

---

## 9. File Structure for Variant C

```
src/variants/variant-c/
  VariantC.tsx          — Root: single centered column layout
  ScrollProgress.tsx    — Thin amber progress bar at top
  Hero.tsx              — Name in serif, one-line description, no photo, no buttons
  About.tsx             — About paragraph
  Skills.tsx            — Flowing comma-separated text per category
  Projects.tsx          — Text-forward cards, images secondary
  Contact.tsx           — Centered info + simplified form
  BackToTop.tsx         — Floating back-to-top button
  variant-c.css         — All Variant C styles
```
