import { Suspense } from "react";
import MouseGlow from "./shared/MouseGlow";
import VariantE from "./variants/variant-e/VariantE";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/shared.css";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <MouseGlow />
      <Suspense fallback={null}>
        <VariantE />
      </Suspense>
    </>
  );
}
