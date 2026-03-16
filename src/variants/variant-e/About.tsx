import ScrollAnimation from "../../shared/ScrollAnimation";

export default function About() {
  return (
    <section id="about" className="ve-about">
      <div className="ve-about__content">
        <ScrollAnimation>
          <p className="ve-about__text ve-about__text--dropcap">
          I'm a full-stack engineer who builds from 0 to 1 and end-to-end. I take ideas and turn them into real products using my powerful problem solving skills and unmatched creativity. I build what you need from intricate database systems to intuitive user interfaces. I GOT IT.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}
