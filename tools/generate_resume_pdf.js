import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESUME_DIR = path.resolve(__dirname, "../src/resume");
const OUTPUT_DIR = path.resolve(__dirname, "../public");

const VARIANTS = ["impact", "editorial", "dense", "terminal", "brutalist", "noir", "timeline", "monolith", "forge", "canopy", "cellar", "glacier", "ember"];

async function generate(variant) {
  const htmlPath = path.resolve(RESUME_DIR, `variant-${variant}.html`);
  const outputPath = path.resolve(OUTPUT_DIR, `DylanBallardResume-${variant}.pdf`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

  // Wait for Google Fonts to load
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: outputPath,
    format: "letter",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log(`Generated: ${outputPath}`);
}

// Parse CLI args
const args = process.argv.slice(2);
const variantFlag = args.find((a) => a.startsWith("--variant="));
const requested = variantFlag ? variantFlag.split("=")[1] : null;

if (requested && !VARIANTS.includes(requested)) {
  console.error(`Unknown variant: ${requested}. Choose from: ${VARIANTS.join(", ")}`);
  process.exit(1);
}

const toGenerate = requested ? [requested] : VARIANTS;

(async () => {
  for (const variant of toGenerate) {
    await generate(variant);
  }
  console.log("Done.");
})();
