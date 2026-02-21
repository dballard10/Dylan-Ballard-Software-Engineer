# Add a Featured Project

## Trigger
User wants to add or update a project in the Featured Projects section.

## Steps

1. Gather project info from the user:
   - Project name
   - Description
   - Tech stack (list of technologies)
   - Live URL (if available)
   - Screenshot image

2. If a screenshot is provided, place it in `public/assets/projects/` as `.webp`.

3. Add a new project card in `src/components/Projects.tsx` following the existing pattern:
   - Add an `imageError` state: `const [nameImageError, setNameImageError] = useState(false);`
   - Add it to the `useEffect` dependency array for Lucide re-init.
   - Add a new `<div className="project-card">` block inside `.projects-grid`.

4. Use Simple Icons CDN for tech stack logos:
   `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/{slug}.svg`

5. Run validation: `python tools/validate_content.py`
6. Run type check: `npm run type-check`
7. Run build: `npm run build`

## Project Card Template

```tsx
<div className="project-card">
  <div className="project-image">
    {!projectNameImageError ? (
      <img
        src="/assets/projects/project-name.webp"
        alt="Project Name Preview"
        className="project-preview"
        onError={() => setProjectNameImageError(true)}
      />
    ) : (
      <i data-lucide="icon-name" className="project-icon"></i>
    )}
  </div>
  <div className="project-content">
    <h3 className="project-title">Project Name</h3>
    <div className="project-tech-stack">
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg"
        alt="React"
        title="React"
        className="project-tech-logo"
      />
      <!-- Add more tech logos as needed -->
    </div>
    <p className="project-description">
      Description of the project goes here.
    </p>
    <div className="project-links">
      <a
        href="https://project-url.com"
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        <i data-lucide="external-link"></i>
        View Project
      </a>
    </div>
  </div>
</div>
```

## Constraints

- Follow the exact JSX structure above — the CSS depends on these class names.
- Always include the `onError` fallback pattern for project images.
- Pick a Lucide icon name for the fallback (browse at lucide.dev/icons).
