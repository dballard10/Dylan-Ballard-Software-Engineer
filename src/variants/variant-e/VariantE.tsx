import DotNav from "./DotNav";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import MetadataFooter from "../../shared/MetadataFooter";
import "./variant-e.css";

export default function VariantE() {
  return (
    <div className="variant-e">
      <DotNav />
      <main id="main-content" className="variant-e__main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <MetadataFooter />
      </main>
    </div>
  );
}
