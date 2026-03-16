import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { profile } from "../../data/profile";
import { useScrollParallax } from "../../hooks/useScrollParallax";
import ScrollAnimation from "../../shared/ScrollAnimation";
import type { Project } from "../../data/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const { ref } = useScrollParallax(0.15);
  const isEven = index % 2 === 1;
  const images = project.images ?? [project.image];
  const hasMultiple = images.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <ScrollAnimation delay={index * 150}>
      <article
        className={`ve-project${isEven ? " ve-project--even" : ""}`}
      >
        <div
          ref={ref}
          className="ve-project__image-wrapper"
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className={`ve-project__image${i === currentIndex ? " ve-project__image--active" : ""}`}
              loading="lazy"
            />
          ))}

          {hasMultiple && (
            <>
              <button
                className="ve-project__carousel-btn ve-project__carousel-btn--prev"
                onClick={prev}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="ve-project__carousel-btn ve-project__carousel-btn--next"
                onClick={next}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              <div className="ve-project__carousel-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`ve-project__carousel-dot${i === currentIndex ? " ve-project__carousel-dot--active" : ""}`}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
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
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ve-project__link"
            >
              View Project <ArrowRight size={16} />
            </a>
          )}
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

      <div className="ve-projects__section">
        <ScrollAnimation>
          <h3 className="ve-projects__section-label">Current</h3>
        </ScrollAnimation>
        <div className="ve-projects__list">
          {profile.currentProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="ve-projects__section">
        <ScrollAnimation>
          <h3 className="ve-projects__section-label">Past</h3>
        </ScrollAnimation>
        <div className="ve-projects__list">
          {profile.pastProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + profile.currentProjects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
