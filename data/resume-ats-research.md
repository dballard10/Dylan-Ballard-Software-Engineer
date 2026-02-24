# Resume ATS Research — Dylan Ballard
*Research compiled February 2026 | Targeting: Startup SWE roles (Series A/B/C)*

---

## TL;DR

- **75%** of resumes are rejected by ATS before a human reads them
- **75%** of that rejection is keyword-based filtering
- Startups use Ashby, Lever, Greenhouse, and Rippling — all prioritize **keyword match + quantified metrics**
- Your editorial PDF **will fail ATS parsing** — see color section below
- The fix: maintain two versions — one ATS-clean, one visual

---

## 1. The Editorial PDF — Color & ATS Verdict

**Short answer: The colored editorial resume will hurt you if submitted through online portals.**

### What happens when ATS parses a designed PDF

ATS systems (Greenhouse, Lever, Ashby) attempt to extract raw text from PDFs. When a PDF uses:

- **Colored text boxes or shaded background blocks** → ATS either skips those regions or scrambles the text
- **Multi-column layouts** → ATS reads left column then right column sequentially, creating nonsense text like `Software Engineer Reston, VA Built at Eigennet a scalable...`
- **Graphics, logos, or decorative elements** → Treated as images, text inside is invisible to ATS
- **Non-standard fonts or special bullet characters** → Parsed as symbols or dropped entirely

Up to **88% of visually designed resumes** are discarded or severely degraded by certain ATS filters.

### The editorial PDF specifically

Unless the editorial variant uses:
1. A single-column layout
2. Text that lives in the PDF text layer (not rendered as image)
3. Colors only as subtle accents (not as background blocks containing text)

...it will be damaged in parsing. The editorial style likely has sidebar columns, colored sections, or stylized headers that ATS will mangle.

### What to do

| Use Case | Which Version |
|---|---|
| Online job application portal (Greenhouse, Lever, Ashby, Rippling, LinkedIn) | **ATS-clean single-column PDF** |
| Email to recruiter directly | **Editorial PDF** |
| LinkedIn profile / portfolio | **Editorial PDF** |
| Networking / in-person | **Editorial PDF** |
| QR code on a business card | **Editorial PDF** |

**Recommended action:** Build one clean ATS version (see formatting rules below) and keep the editorial for direct-contact situations.

### Safe colors (if you use any color in the ATS version)

- **Navy blue** — best choice; conveys trust and technical credibility
- **Teal** — modern, works well for startups and tech
- **Dark gray** — subtle, professional
- **Forest green** — clean alternative

**Rules for any color use:**
- Accent only: headers, horizontal rule lines, section labels
- Never put text inside a colored background box
- Never use light-colored body text
- High contrast only (dark text on white background)
- Maximum 2–3 colors total

**Colors to avoid on ATS version:** Red, orange, neon anything, pastels, light grays for body text.

---

## 2. ATS Formatting Rules — The Non-Negotiables

These apply to your ATS-clean version. Breaking any of these guarantees keyword loss.

### Layout
- Single column only — no sidebars, no two-column splits
- Standard section order: Summary → Experience → Projects → Skills → Education
- Contact info in the body (NOT in a header/footer element — those are often unparsed)

### File
- PDF format (unless the job posting specifically says .docx)
- Filename: `DylanBallard-Resume.pdf` (simple, professional, searchable)
- Text must be in the PDF text layer — not embedded as an image

### Typography
- Font: Arial, Calibri, or Helvetica only
- Size: 10–12pt body, 14–16pt name
- No special bullet characters (✓ ● ➜ ★) — use `•` or `-` only
- No tables for layout

### What breaks ATS parsing
- Text boxes
- Tables used for layout
- Headers and footers
- Images/logos inline with text
- Nested bullets
- Unusual indentation
- Colored background sections with text inside
- Non-standard fonts

---

## 3. Action Verbs — Startup Edition

Startups respond to verbs that signal **ownership, shipping, and impact**. Always lead bullets with one of these.

### Tier 1 — Startup Gold (use these most)
| Verb | Why It Works |
|---|---|
| **Built** | 0-to-1 mentality, founders love this |
| **Engineered** | Stronger than "built," implies depth |
| **Architected** | System-level thinking, senior signal |
| **Launched** | End-to-end ownership |
| **Shipped** | Startup-native language |
| **Scaled** | Growth mindset, direct impact |
| **Automated** | Reduces manual work = startup value |
| **Optimized** | Technical excellence, ATS loves this word |
| **Deployed** | DevOps/production focus |
| **Reduced** | Cost savings, efficiency |
| **Increased** | Growth, must pair with a number |
| **Drove** | Ownership/leadership signal |

### Tier 2 — Solid (use for variety)
Accelerated, Developed, Implemented, Designed, Integrated, Refactored, Streamlined, Delivered, Achieved, Resolved, Migrated, Improved, Generated, Established, Led

### Tier 3 — Use Sparingly
Collaborated, Facilitated, Coordinated, Contributed, Supported, Maintained, Managed

### Never Use
- "Responsible for" (passive, not an action)
- "Helped with" (unclear contribution)
- "Worked on" (vague)
- "Participated in" (no value)
- "Involved in" (no ownership)
- "Assisted" (junior/subordinate signal)

---

## 4. The Bullet Formula — Every Single Bullet

**Format:** `[Action Verb] [What] [How/Technology] [Impact/Metric]`

```
Built [X feature] using [React/Python/etc.], [reducing Y by Z% / serving N users / enabling X]
```

### Examples using your actual stack

**Eigennet-style bullets:**
```
Engineered LLM document extraction pipeline on AWS SageMaker achieving 99% accuracy across 50K+ records
Built automated metadata transmission system using Python and REST APIs, reducing manual processing time by 80%
Architected EC2/S3 batch workflows with end-to-end tracking, processing [X]GB of data per [timeframe]
Developed scalable Python validation scripts reducing data errors by [X]% across production pipelines
```

**Freddie Mac-style bullets:**
```
Designed Java-based data validation system detecting schema drift and anomalies across large financial CSV datasets
Implemented automated alerting for version mismatches, accelerating Financial Engineering team reconciliation by [X]%
Built data integrity checking framework reducing reconciliation errors across [X] dataset versions
```

**Project-style bullets (Embark/Cinetik):**
```
Built full-stack web app using React, TypeScript, and FastAPI serving [X] users with [Y] feature
Designed PostgreSQL database schema supporting [X] entity types with optimized query performance
Integrated TMDB external API using TanStack Query and Zustand for real-time data sync
Deployed scalable backend on [Railway/Vercel] with CI/CD via GitHub Actions
```

### Numbers are mandatory

If you don't have a real number, estimate conservatively and use it. Examples:
- "50K+ records", "10X faster", "80% reduction in manual steps"
- "3 production features shipped in Q4 2024"
- "Reduced API response time by 40%"
- "$X/month in server cost savings"

Hiring managers at startups skip bullets without numbers.

---

## 5. Technical Keywords — Full List by Category

These are the exact keywords ATS systems at startups filter for. Match these to job descriptions.

### Languages
JavaScript, TypeScript, Python, SQL, Java, HTML, CSS

### Frontend Frameworks & Libraries
React, Next.js, React Native, Vite, Tailwind CSS, ShadCN

### State Management & Data Fetching
Zustand, TanStack Query, React Query, Redux, Context API

### Backend Frameworks
FastAPI, Node.js, Express.js, Django, REST APIs, GraphQL, WebSockets

### Databases
PostgreSQL, MySQL, Supabase, Redis, MongoDB, Firebase, SQL, NoSQL

### Cloud & Infrastructure
AWS, Amazon Web Services, EC2, S3, RDS, Lambda, SageMaker, CloudWatch, Vercel, Railway, Docker, Containerization, Kubernetes, CI/CD, GitHub Actions, Infrastructure as Code, Terraform, Linux, Shell Scripting, Serverless

### AI & ML (now essential for startups)
LLM integrations, Large Language Models, OpenAI API, Anthropic API, AWS Bedrock, SageMaker, AI-assisted development, Prompt Engineering, Agentic workflows, Machine Learning, ETL Pipelines, Pandas, NumPy, Async Processing, Celery

### Auth & Security
JWT, OAuth, Authentication, Authorization, CORS, API Security

### Testing
Jest, Pytest, Vitest, Unit Testing, Integration Testing

### Tools & Process
Git, GitHub, Postman, Figma, Agile, Scrum, Jira, VS Code, Node.js, pnpm, npm, Technical Documentation

### Architecture Patterns (put these in bullets, not just skills)
Microservices, Scalability, Performance Optimization, Database Design, Event-Driven Architecture, Component Architecture, Design Systems, Responsive Design, API Design, System Design

---

## 6. Startup-Specific Language — Phrases That Land

These phrases appear in startup job postings constantly. Mirror their language.

### In job descriptions, startups say:
- "Ownership mentality"
- "Build features from 0 to 1"
- "Fast-paced environment"
- "Impact-driven"
- "High agency"
- "Scrappy"
- "Move fast and ship"

### How to reflect this in your resume:

| Startup Language | Your Bullet Translation |
|---|---|
| Ownership mentality | "Owned full-stack development of [feature] from design to production" |
| 0-to-1 building | "Built [X] from scratch using [stack]" |
| Fast execution | "Shipped [X features] in [Y weeks/sprint]" |
| High agency | "Independently architected and deployed [X] without prior [Y]" |
| Impact-driven | "Reduced [X] by Y% resulting in [business outcome]" |
| Scrappy/resourceful | "Implemented [complex feature] using [constrained resources/small team]" |

### Soft skill phrases that resonate with startups (use in summary/cover letter)
- "I take ownership from design to deployment"
- "I ship fast and iterate based on real user feedback"
- "I learn new technologies rapidly and apply them in production"
- "I've built products end-to-end, from database schema to UI"
- "I thrive in ambiguous environments where I can drive decisions"

---

## 7. Your Professional Summary — Startup-Optimized

Your current summary is generic. Here are two ATS-optimized alternatives:

### Option A (Technical Depth Lead)
```
Full-stack software engineer with experience building and shipping production systems
using React, TypeScript, Python, and FastAPI. Deployed LLM-powered pipelines on AWS
SageMaker achieving 99% accuracy. Experienced with cloud infrastructure (AWS EC2/S3/RDS),
CI/CD automation, and modern full-stack architecture. Currently pursuing M.S. Computer
Science at George Mason University.
```

### Option B (Impact Lead — Startup Preferred)
```
Full-stack engineer who builds end-to-end systems from database schema to pixel-perfect UI.
Shipped production applications using React, TypeScript, FastAPI, and PostgreSQL. Built
AI/LLM extraction pipelines on AWS achieving 99% accuracy across 50K+ records. Strong in
cloud infrastructure (EC2, S3, SageMaker), async processing, and rapid prototyping.
```

**Key elements both include:**
- Specific tech stack keywords in first two sentences
- A quantified achievement upfront
- "Built" and "shipped" language
- No fluff phrases

---

## 8. Skills Section — ATS-Optimized Format

The skills section must be a flat, comma-separated list organized by category. No icons, no rating bars (ATS ignores those), no visual elements.

```
Languages: JavaScript, TypeScript, Python, SQL, Java, HTML, CSS
Frontend: React, Next.js, React Native, Vite, Zustand, TanStack Query, Tailwind CSS
Backend: FastAPI, Node.js, REST APIs, GraphQL, Auth (JWT, OAuth), Async Processing (Celery)
Databases: PostgreSQL, MySQL, Supabase, Redis
Cloud & DevOps: AWS (EC2, S3, RDS, Lambda, SageMaker), Docker, CI/CD, GitHub Actions, Vercel, Railway, Terraform, Linux
AI & ML: LLM Integrations (OpenAI, Anthropic, Bedrock), SageMaker, ETL Pipelines, Pandas, NumPy
Tools: Git, GitHub, Figma, Postman, Jest, Pytest, Vitest, Agile, Jira
```

**Rules:**
- 40–60 keywords total is the ATS sweet spot
- Spell technologies consistently every time: "TypeScript" not "Typescript", "PostgreSQL" not "Postgres"
- Match exact capitalization to how they appear in job descriptions
- Don't include ratings or proficiency bars — ATS ignores them, humans find them suspicious

---

## 9. What To Avoid — The Rejection List

### Vague language (ATS won't match these to anything)
- "Passionate about technology"
- "Excellent communication skills"
- "Team player" / "self-starter" / "go-getter"
- "Wore multiple hats"
- "Detail-oriented"
- "Hardworking"
- "Proactive"
- "Results-oriented" (unless followed by actual results)

### Passive constructions
- "Responsible for X"
- "Contributed to codebase"
- "Worked on a project"
- "Assisted the team"
- "Involved in development"

### Startup red flags (avoid implying these)
- Heavy process-dependence ("followed established processes")
- Bureaucratic language ("managed stakeholders", "coordinated requirements")
- Waiting for direction ("implemented requirements provided by PM")
- Maintenance-only framing ("maintained legacy codebase") — if you maintained, say what you improved

---

## 10. ATS Systems Startups Use — What Each Prioritizes

| ATS | Startup Stage | What It Prioritizes |
|---|---|---|
| **Ashby** | Series A–C (fastest growing) | Keyword density + metrics, analytics-heavy screening, speed |
| **Lever** | Growth stage | Candidate experience, collaboration keywords, storytelling |
| **Greenhouse** | Series B+ / scaled | Structure, standard job titles, consistency, volume |
| **Rippling** | Integrated HRIS companies | Role consistency, career progression clarity |
| **Workable** | Early stage | Basic keyword matching, simple parsing |

**Universal priority across all:** Keyword match (75% of filter weight) → Quantified metrics → Standard job title alignment → Years of experience.

---

## 11. Quick Checklist Before Submitting Any Resume

**ATS Format:**
- [ ] Single-column layout
- [ ] Simple bullet points (• or -)
- [ ] Standard font (Arial, Calibri, or Helvetica)
- [ ] 10–12pt body text
- [ ] Consistent date format (MM/YYYY)
- [ ] No headers/footers/text boxes/images/tables for layout
- [ ] Contact info in body (not in a PDF header element)
- [ ] PDF submitted unless .docx specifically requested

**Keywords:**
- [ ] Technical Skills section present with 40–60 keywords
- [ ] Keywords match the specific job description (70%+ overlap)
- [ ] All frameworks/tools spelled consistently
- [ ] Job title on resume matches or closely mirrors the role you're applying for

**Content:**
- [ ] Every bullet starts with an action verb (Tier 1 preferred)
- [ ] Every bullet includes a metric or quantified result
- [ ] No "responsible for" or passive language
- [ ] No vague buzzwords
- [ ] Summary has specific tech keywords in first two sentences

---

## Sources

- ResumeAdapter: Software Engineer Resume Keywords (2026)
- The Interview Guys: ATS Resume Optimization 2025
- Career Launch Campus: Top 400 ATS Resume Keywords 2025
- Resumly: Optimizing Resume Design for Software Engineers in 2026
- MentorCruise: Software Engineer Resume Template & Examples 2026
- AI ResumeGuru: Resume Colors ATS-Safe Guide for 2026
- Resumly: Resume Color Scheme for ATS Compatibility & Readability
- Jobscan: ATS Formatting Mistakes to Avoid
- Teal HQ: 2026 Resume Trends
- The Interview Guys: 5 Resume Formats That Will Dominate 2026
- Enhancv: How Does Color on a Resume Impact Hiring?
- Standout-CV: Resume Color Psychology
- Index.dev: Greenhouse vs Lever vs Ashby ATS Comparison 2026
- IGotAnOffer: 40 Software Engineer Resume Keywords
- Indeed: ATS Resume Template and Tips
- Levels.fyi: Startup Software Engineer Salary Data
