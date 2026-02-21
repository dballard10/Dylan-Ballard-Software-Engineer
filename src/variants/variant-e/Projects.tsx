import { ArrowRight } from "lucide-react";
import { profile } from "../../data/profile";
import { useScrollParallax } from "../../hooks/useScrollParallax";
import ScrollAnimation from "../../shared/ScrollAnimation";
import type { Project } from "../../data/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref, offset } = useScrollParallax(0.15);
  const isEven = index % 2 === 1;

  return (
    <ScrollAnimation delay={index * 150}>
      <article
        className={`ve-project${isEven ? " ve-project--even" : ""}`}
      >
        <div
          ref={ref}
          className="ve-project__image-wrapper"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="ve-project__image"
            loading="lazy"
          />
        </div>

        <div className="ve-project__text">
          <h3 className="ve-project__name">{project.title}</h3>
          <p className="ve-project__description">{project.description}</p>
          <div className="ve-project__tech">
            {project.tech.map((t) => (
              <span key={t.name} className="ve-project__tech-item">
                {t.name}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ve-project__link"
          >
            View Project <ArrowRight size={16} />
          </a>
        </div>
      </article>
    </ScrollAnimation>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="ve-projects">
      <div className="ve-projects__header">
        <ScrollAnimation>
          <h2 className="ve-projects__title">Projects</h2>
        </ScrollAnimation>
      </div>

      <div className="ve-projects__list">
        {profile.projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
