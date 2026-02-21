# Variant A: "The Engineer" — Full Design Specification

> Subtle & Professional. Brittany Chiang meets Maxime Heckel polish.
> Content-first, organized, clean. The portfolio of someone who ships production code.

---

## 1. Color System

### Primary Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0f172a` | Main page background (slate-900) |
| `--bg-secondary` | `#1e293b` | Cards, sidebar, alternate sections (slate-800) |
| `--bg-tertiary` | `#334155` | Inputs, skill tags, nested elements (slate-700) |
| `--bg-hover` | `#475569` | Hover states on tertiary elements (slate-600) |

### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#e2e8f0` | Headings, names, primary content (slate-200) |
| `--text-secondary` | `#94a3b8` | Body text, descriptions, paragraphs (slate-400) |
| `--text-muted` | `#64748b` | Dates, periods, subtle labels (slate-500) |
| `--text-link` | `#3b82f6` | Links, interactive text (blue-500) |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-blue` | `#3b82f6` | Primary accent, links, active states |
| `--accent-purple` | `#8b5cf6` | Secondary accent, gradient end |
| `--accent-blue-hover` | `#2563eb` | Blue hover state (blue-600) |
| `--accent-purple-hover` | `#7c3aed` | Purple hover state (violet-600) |
| `--gradient-accent` | `linear-gradient(135deg, #3b82f6, #8b5cf6)` | Name, section titles, primary buttons |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-default` | `#334155` | Card borders, dividers (slate-700) |
| `--border-hover` | `#3b82f6` | Hover state on cards (blue-500) |
| `--border-input-focus` | `#3b82f6` | Input focus ring |

### Mouse Glow
| Property | Value |
|----------|-------|
| Color RGB | `59, 130, 246` (blue-500) |
| Radius | `600px` |
| Opacity | `0.07` |
| Blend | Additive — sits on top, brightens dark background |

---

## 2. Typography

### Font Stack
| Role | Font | Fallback | Weight(s) |
|------|------|----------|-----------|
| Display / Headings | Inter | -apple-system, BlinkMacSystemFont, sans-serif | 600, 700 |
| Body | Inter | -apple-system, BlinkMacSystemFont, sans-serif | 400, 500 |
| Monospace accents | JetBrains Mono | Fira Code, Consolas, monospace | 400, 500 |

### Scale
| Element | Size | Weight | Line-height | Font |
|---------|------|--------|-------------|------|
| Hero name | `3.5rem` | 700 | 1.1 | Inter |
| Hero greeting ("Hi, I'm") | `1.5rem` | 400 | 1.4 | Inter |
| Hero title | `1.25rem` | 500 | 1.4 | Inter |
| Hero description | `1.125rem` | 400 | 1.7 | Inter |
| Section title | `2rem` | 600 | 1.2 | Inter |
| Sidebar name | `1.5rem` | 700 | 1.2 | Inter |
| Sidebar title | `1rem` | 400 | 1.4 | Inter |
| Sidebar nav link | `0.875rem` | 500 | 1.5 | Inter |
| Card heading (h3) | `1.25rem` | 600 | 1.3 | Inter |
| Body text | `1rem` | 400 | 1.7 | Inter |
| Small text / labels | `0.875rem` | 500 | 1.5 | Inter |
| Dates / periods | `0.875rem` | 400 | 1.5 | JetBrains Mono |
| Metadata footer | `0.75rem` | 400 | 1.5 | JetBrains Mono |
| Skill tag text | `0.875rem` | 500 | 1.4 | Inter |

### Special Typography
- **Name in hero**: Gradient text using `background-clip: text` with `--gradient-accent`
- **Section titles**: Left-aligned (not centered — sidebar layout shifts content right), gradient text
- **Monospace accents**: Dates, periods, metadata rendered in JetBrains Mono for engineering feel

---

## 3. Layout Architecture

### Overall Structure
```
┌─────────────────────────────────────────────┐
│ [Sticky Left Sidebar]  │  [Scrollable Content]│
│                         │                      │
│  Dylan Ballard          │  ┌──── Hero ────┐   │
│  Full-Stack Engineer    │  │               │   │
│                         │  └───────────────┘   │
│  ● About               │  ┌──── About ───┐   │
│  ● Skills               │  │               │   │
│  ● Projects             │  └───────────────┘   │
│  ● Contact              │  ┌── Skills ────┐   │
│                         │  │               │   │
│  [GitHub] [LinkedIn]    │  └───────────────┘   │
│                         │  ┌── Projects ──┐   │
│                         │  │               │   │
│                         │  └───────────────┘   │
│                         │  ... more sections   │
│                         │  ┌── Metadata ───┐   │
│                         │  └───────────────┘   │
└─────────────────────────────────────────────┘
```

### Dimensions
| Element | Value |
|---------|-------|
| Sidebar width | `320px` |
| Content max-width | `800px` |
| Content padding (horizontal) | `3rem` |
| Section padding (vertical) | `6rem 0` |
| Container padding | `0 1.5rem` |
| Card border-radius | `0.75rem` |
| Button border-radius | `0.5rem` |
| Skill tag border-radius | `2rem` (pill) |

### Grid/Flex Patterns
- **Page layout**: CSS Grid `grid-template-columns: 320px 1fr`
- **Sidebar**: `position: fixed; left: 0; top: 0; height: 100vh` — Flexbox column with `justify-content: space-between`
- **Content area**: `margin-left: 320px; padding: 0 3rem`
- **Skills grid**: `grid-template-columns: repeat(2, 1fr)` within the content area
- **Projects grid**: `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
- **Contact**: `grid-template-columns: 1fr 1fr`

---

## 4. Section-by-Section Design

### 4.1 Sidebar Navigation
**Structure:**
- Top section: Name (gradient), title, one-line bio
- Middle section: Navigation links (About, Skills, Projects, Contact)
- Bottom section: Social icons (GitHub, LinkedIn)

**Behavior:**
- Fixed position, full viewport height
- Background: `--bg-secondary` (#1e293b)
- Right border: `1px solid --border-default`
- Nav links have a left-border indicator (3px) that appears on active section
- Active link: text color `--text-primary`, left-border `--accent-blue`
- Inactive link: text color `--text-muted`, no left-border
- Hover: text color transitions to `--text-primary`
- Social icons at bottom: 20px, `--text-muted`, hover → `--text-primary`

**Active section tracking:**
- Uses IntersectionObserver on each section
- As a section enters >50% of the viewport, its nav link becomes active
- Smooth transition on the indicator

### 4.2 Hero Section
**Layout:** Single column within the content area (no sidebar overlap)
**Background:** `--bg-primary` with a subtle radial gradient emanating from center-top:
```css
background: radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%),
            var(--bg-primary);
```
This creates the "distinctive hero atmosphere" that fades into the flat background below.

**Content:**
- Greeting: "Hi, I'm" in `--text-muted`
- Name: "Dylan Ballard" in gradient text, 3.5rem
- Title: "Full-Stack Engineer" in `--text-secondary`, 1.25rem, weight 500
- One-liner: "I build polished, end-to-end products for the web." in `--text-secondary`
- Two buttons: "Get In Touch" (gradient primary) + "View Resume" (secondary outline)
- Profile image: 250px circle with 3px `--accent-blue` border, 15px padding

**Min-height:** `100vh` (fills viewport)

**Hero → content transition:**
A `::after` pseudo-element on the hero section creates a gradient fade:
```css
.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, var(--bg-secondary));
  pointer-events: none;
}
```

### 4.3 About Section
**Background:** `--bg-secondary`
**Content:** Single paragraph, centered within max-width container
**Text:** `--text-secondary`, 1.125rem, line-height 1.7
**Section title:** Left-aligned, gradient text, 2rem

### 4.4 Skills Section
**Background:** `--bg-primary`
**Layout:** 2-column grid of skill categories

**Each category:**
- Background: `--bg-secondary`
- Border: 1px solid `--border-default`
- Category name: `--accent-blue`, 1.25rem, weight 600
- Tags: flex-wrap, 0.5rem gap

**Each skill tag:**
- Background: `--bg-tertiary`
- Border: 1px solid `--bg-hover`
- Border-radius: 2rem (pill shape)
- Padding: 0.5rem 1rem
- Icon: 20px, white filter by default
- Hover: background → `--accent-blue`, icon shows real color

### 4.5 Projects Section
**Background:** `--bg-secondary`
**Layout:** Auto-fit grid (minmax 350px)

**Each card:**
- Background: `--bg-tertiary`
- Border: 1px solid `--border-default`, hover → `--border-hover`
- Image area: `--bg-secondary` background, 3rem padding
- Image: scales 1.05x on card hover
- Title: `--text-primary`, 1.5rem
- Tech stack logos: 28px, grayscale by default, color on card hover
- Description: `--text-secondary`
- Link: `--accent-blue`, hover → `--accent-purple`

### 4.6 Contact Section
**Background:** `--bg-primary`
**Layout:** 2-column grid (info left, form right)

**Left side (contact info):**
- Icon + text pairs, stacked vertically
- Icons: 20px, `--accent-blue`
- Text: `--text-secondary`
- Links: `--accent-blue`, hover → `--accent-purple`

**Right side (form):**
- Background: `--bg-secondary`
- Border: 1px solid `--border-default`
- Inputs: `--bg-tertiary` background, `--border-default` border
- Focus: border → `--accent-blue`
- Submit button: gradient primary

### 4.7 Metadata Footer
**Background:** `--bg-secondary`
**Border-top:** 1px solid `--border-default`
**Font:** JetBrains Mono, 0.75rem, `--text-muted`
**Layout:** Flex row, space-between, centered

**Content (left to right):**
- `Built with React 19 + TypeScript + Vite`
- `Viewport: {width} x {height}` (live-updating via resize listener)
- `Last updated: Feb 2026`
- `Deployed on Vercel`

**Copyright (centered below):**
```
(c) 2026 Dylan Ballard. Crafted with care.
```
Style: `--text-muted`, 0.75rem, JetBrains Mono

---

## 5. Interactions & Animations

### 5.1 Mouse Glow
- Fixed overlay covering full viewport
- `pointer-events: none`, `z-index: 1`
- Radial gradient follows cursor: `radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(59,130,246,0.07), transparent 70%)`
- Updates on `mousemove` via CSS custom properties
- Transition: `background 0.15s ease` for smoothness
- **Mobile:** Disabled (no cursor)

### 5.2 Scroll Animations
- Elements start `opacity: 0; transform: translateY(20px)`
- On viewport enter (IntersectionObserver, threshold 0.1): transition to `opacity: 1; transform: translateY(0)`
- Duration: `0.5s ease-out`
- Stagger: Each item in a list delays +100ms from the previous
- Respects `prefers-reduced-motion`: skip animations if user prefers

### 5.3 Sidebar Nav Highlighting
- Left border indicator (3px, `--accent-blue`) slides to the active section
- Transition: `top 0.3s ease` on the indicator element
- Text color transitions: `color 0.2s ease`

### 5.4 Hover Effects
| Element | Hover Effect |
|---------|-------------|
| Nav links | Text color: muted → primary |
| Cards (project) | Border: default → blue |
| Skill tags | Background: tertiary → blue, icon filter removed |
| Buttons (primary) | Gradient darkens slightly |
| Buttons (secondary) | Border + text → blue |
| Project images | Scale 1.05x |
| Project tech logos | Grayscale removed |
| External links | Color: blue → purple |

### 5.5 Hero Entrance
- Name fades in + slides up (0.8s)
- Description fades in (0.6s, 200ms delay)
- Buttons fade in (0.6s, 400ms delay)
- Profile image fades in + subtle scale (0.8s, 200ms delay)

---

## 6. Responsive Design

### Breakpoint: 1024px (Tablet landscape)
- Sidebar width reduces to `280px`
- Content padding reduces to `2rem`

### Breakpoint: 768px (Tablet portrait / Mobile)
- **Sidebar collapses** into a horizontal top bar:
  - Fixed top, full width, `64px` height
  - Name (left), hamburger menu icon (right)
  - Hamburger opens a full-screen overlay with nav links
- Content area: `margin-left: 0; margin-top: 64px`
- Hero: single column, image above text (centered)
- Skills grid: single column
- Contact: single column (info above form)
- Projects grid: single column

### Breakpoint: 480px (Small mobile)
- Hero name: `2rem`
- Section titles: `1.75rem`
- Reduced padding throughout
- Button text: `0.9rem`

---

## 7. Accessibility

- All interactive elements have visible focus rings (`2px solid --accent-blue, offset 2px`)
- Focus rings only show on keyboard navigation (`:focus-visible`)
- Smooth scroll respects `prefers-reduced-motion`
- Scroll animations disabled when `prefers-reduced-motion: reduce`
- All images have descriptive `alt` text
- Form inputs have associated `<label>` elements
- Color contrast: all text/background combinations meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Sidebar nav uses `<nav>` landmark with `aria-label="Main navigation"`
- Active nav link has `aria-current="true"`
- Skip-to-content link hidden until focused

---

## 8. Content (Exact Text)

### Hero
- Greeting: `Hi, I'm`
- Name: `Dylan Ballard`
- Title: `Full-Stack Engineer`
- One-liner: `I build polished, end-to-end products for the web.`
- CTA 1: `Get In Touch` → scrolls to #contact
- CTA 2: `View Resume` → opens /DylanBallardResume2025.pdf in new tab

### About
- Title: `About`
- Text (paragraph 1): `I'm a full-stack engineer who loves building products from the ground up. I specialize in React and TypeScript on the frontend and Python and FastAPI on the backend, with a focus on clean architecture, performance, and user experience.`
- Text (paragraph 2): `Lately, I've been exploring AI/LLM integrations and agentic workflows — finding new ways to make software smarter. When I'm not building, I'm usually tinkering with side projects or diving into whatever technology has my attention that week.`

### Skills
**Frontend Development:** React (Hooks, Context, Suspense), TypeScript, JavaScript (ES6+), React Native, Next.js, Vite, Zustand, TanStack Query, Tailwind CSS, Responsive Design & A11y, Component Architecture & Design Systems

**Backend Development:** Python, FastAPI, SQL, PostgreSQL, MySQL, Supabase, Render, RESTful & GraphQL APIs, Auth (JWT, OAuth), LLM Integrations (OpenAI, Anthropic, Bedrock), Async Processing (Celery, asyncio), ETL Pipelines & Data Processing, Pandas, NumPy

**Cloud & DevOps:** AWS (EC2, S3, RDS, Lambda, SageMaker), Docker & Containerization, CI/CD (GitHub Actions, Railway), Vercel, Railway Deployments, Monitoring (CloudWatch), IaC & Terraform, Linux Systems & Shell Scripting

**Tools & Collaboration:** Cursor, VS Code, Git, GitHub, Node.js, NPM, pnpm, Postman, Figma (UI/UX), Agile, Scrum, Jira, Testing (Jest, Pytest, Vitest), Technical Writing & Documentation

### Projects
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
- Phone: (703) 848-5998
- Email: dylanballard55@gmail.com
- Location: Reston, VA
- GitHub: https://github.com/dballard10
- LinkedIn: https://linkedin.com/in/dballard55

### Metadata Footer
- Left: `Built with React 19 · TypeScript · Vite · Deployed on Vercel`
- Copyright: `© 2026 Dylan Ballard. Crafted with care.`

---

## 9. File Structure for Variant A

```
src/variants/variant-a/
  VariantA.tsx          — Root: sidebar + content area layout
  Navigation.tsx        — Sticky sidebar with nav links + social icons
  Hero.tsx              — Greeting, name, description, CTAs, profile photo
  About.tsx             — About paragraph
  Skills.tsx            — 2-column skill category grid with tag pills
  Projects.tsx          — Project cards with images and tech stacks
  Contact.tsx           — Contact info + form (uses shared form logic)
  variant-a.css         — All Variant A styles
```
