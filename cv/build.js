// Genera los PDFs del CV a partir de cv-es.html y cv-en.html.
// Uso (desde la raíz del repo): node cv/build.js
// Necesita Playwright con Chromium y conexión a Google Fonts.
const path = require("path");
const { chromium } = require("playwright");

const jobs = [
  ["cv-es.html", "../assets/cv-felipe-valenzuela-es.pdf"],
  ["cv-en.html", "../assets/cv-felipe-valenzuela-en.pdf"],
  // Variante orientada a IA aplicada (puestos de IA, LLMs, agentes)
  ["cv-es-ia.html", "../assets/cv-felipe-valenzuela-ia-es.pdf"],
  ["cv-en-ia.html", "../assets/cv-felipe-valenzuela-ia-en.pdf"],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [src, out] of jobs) {
    await page.goto("file://" + path.join(__dirname, src), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(__dirname, out), format: "A4", preferCSSPageSize: true, printBackground: true });
    console.log("ok", out);
  }
  await browser.close();
})();
