import ScrollAnimation from "../../shared/ScrollAnimation";

export default function About() {
  return (
    <section id="about" className="ve-about">
      <div className="ve-about__content">
        <ScrollAnimation>
          <p className="ve-about__text ve-about__text--dropcap">
            I'm a full-stack engineer who builds things end to end — from
            database schemas to pixel-perfect UIs. My appetite for learning has
            recently led me to explore AI integrations, agentic workflows, and
            the intersection of LLMs and product development.
          </p>
        </ScrollAnimation>
        <ScrollAnimation delay={150}>
          <p className="ve-about__text">
            When not shipping, I like working on side projects that let me
            experiment with ideas I find interesting — gamification systems,
            media platforms, and tools that solve problems I actually have.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
