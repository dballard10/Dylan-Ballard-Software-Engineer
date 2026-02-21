import { useActiveSection } from "../../hooks/useActiveSection";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = SECTIONS.map((s) => s.id);

export default function DotNav() {
  const activeSection = useActiveSection(sectionIds);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="ve-dotnav" aria-label="Section navigation">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`ve-dotnav__item${
            activeSection === section.id ? " ve-dotnav__item--active" : ""
          }`}
          onClick={() => scrollTo(section.id)}
          aria-label={`Navigate to ${section.label}`}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          <span className="ve-dotnav__dot" />
          <span className="ve-dotnav__label" aria-hidden="true">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
