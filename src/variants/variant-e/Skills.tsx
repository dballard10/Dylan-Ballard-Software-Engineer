import { useMemo } from "react";
import { profile } from "../../data/profile";
import ScrollAnimation from "../../shared/ScrollAnimation";
import type { Skill } from "../../data/types";

export default function Skills() {
  // Split first 4 categories into 4 rows, agentic category gets its own 5th row
  const { mainRows, agenticRow } = useMemo(() => {
    const agenticCategory = profile.skills.find(
      (c) => c.name === "AI & Agentic Development"
    );
    const mainSkills = profile.skills
      .filter((c) => c.name !== "AI & Agentic Development")
      .flatMap((c) => c.skills);

    const quarter = Math.ceil(mainSkills.length / 4);
    return {
      mainRows: [
        mainSkills.slice(0, quarter),
        mainSkills.slice(quarter, quarter * 2),
        mainSkills.slice(quarter * 2, quarter * 3),
        mainSkills.slice(quarter * 3),
      ],
      agenticRow: agenticCategory?.skills ?? [],
    };
  }, []);

  const directions = ["right", "left", "right", "left", "right"] as const;

  const renderRow = (skills: Skill[], rowIndex: number) => {
    const dir = directions[rowIndex];
    const tripled = [...skills, ...skills, ...skills];
    return (
      <div key={`row-${rowIndex}`} className="ve-skills__marquee-row">
        <div className={`ve-skills__marquee-track ve-skills__marquee-track--${dir}`}>
          {tripled.map((skill, i) => (
            <div key={`r${rowIndex}-${i}`} className="ve-skills__card">
              {skill.icon && (
                <img
                  src={skill.colorIcon || skill.icon}
                  alt=""
                  className={`ve-skills__card-icon${!skill.colorIcon ? " ve-skills__card-icon--mono" : ""}`}

                />
              )}
              <span className="ve-skills__card-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="ve-skills">
      <div className="ve-skills__header">
        <ScrollAnimation>
          <h2 className="ve-skills__title">Skills</h2>
        </ScrollAnimation>
      </div>

      <ScrollAnimation delay={100}>
        <div className="ve-skills__marquee-wrapper">
          {mainRows.map((row, i) => renderRow(row, i))}
          {renderRow(agenticRow, 4)}
        </div>
      </ScrollAnimation>
    </section>
  );
}
