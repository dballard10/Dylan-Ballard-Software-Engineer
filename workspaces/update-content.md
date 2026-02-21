# Update Portfolio Content

## Trigger
User requests a content change to any portfolio section (experience, skills, education, about text, contact info, hero text).

## Component Map

| Section | File |
|---------|------|
| Hero | `src/components/Hero.tsx` |
| About | `src/components/About.tsx` |
| Experience | `src/components/Experience.tsx` |
| Education | `src/components/Education.tsx` |
| Skills | `src/components/Skills.tsx` |
| Projects | `src/components/Projects.tsx` |
| Contact | `src/components/Contact.tsx` |
| Footer | `src/components/Footer.tsx` |

## Steps

1. Identify which component file(s) to modify using the map above.
2. Read the current content from the relevant component.
3. Make the requested changes — modify text, add/remove items, update URLs, etc.
4. Run validation: `python tools/validate_content.py`
5. Run type check: `npm run type-check`
6. Run build: `npm run build`

## Constraints

- Only modify content (text, URLs, image paths). Do not change component structure or CSS class names.
- Images go in `public/assets/` as `.webp` (photos) or `.svg` (icons).
- Tech logos: use Simple Icons CDN (`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/{slug}.svg`) when available. Use local SVG in `public/assets/technologies/` otherwise.
- For colored hover variants, use Devicon CDN (`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg`).
