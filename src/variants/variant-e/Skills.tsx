import { useMemo } from "react";
import { profile } from "../../data/profile";
import ScrollAnimation from "../../shared/ScrollAnimation";
import type { Skill } from "../../data/types";

export default function Skills() {
  const allSkills: Skill[] = useMemo(
    () => profile.skills.flatMap((category) => category.skills),
    []
  );

  // Split skills roughly in half for two rows
  const mid = Math.ceil(allSkills.length / 2);
  const row1Skills = allSkills.slice(0, mid);
  const row2Skills = allSkills.slice(mid);

  return (
    <section id="skills" className="ve-skills">
      <div className="ve-skills__header">
        <ScrollAnimation>
          <h2 className="ve-skills__title">Toolkit</h2>
        </ScrollAnimation>
      </div>

      <ScrollAnimation delay={100}>
        <div className="ve-skills__marquee-wrapper">
          {/* Row 1: scrolls right */}
          <div className="ve-skills__marquee-row">
            <div className="ve-skills__marquee-track ve-skills__marquee-track--right">
              {[...row1Skills, ...row1Skills].map((skill, i) => (
                <div key={`r1-${i}`} className="ve-skills__card">
                  {skill.icon && (
                    <img
                      src={skill.colorIcon || skill.icon}
                      alt=""
                      className="ve-skills__card-icon"
                      loading="lazy"
                    />
                  )}
                  <span className="ve-skills__card-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: scrolls left */}
          <div className="ve-skills__marquee-row">
            <div className="ve-skills__marquee-track ve-skills__marquee-track--left">
              {[...row2Skills, ...row2Skills].map((skill, i) => (
                <div key={`r2-${i}`} className="ve-skills__card">
                  {skill.icon && (
                    <img
                      src={skill.colorIcon || skill.icon}
                      alt=""
                      className="ve-skills__card-icon"
                      loading="lazy"
                    />
                  )}
                  <span className="ve-skills__card-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
