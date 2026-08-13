// Captures public/og.png from the real /og-card route.
//
// The site must be running first:  npm run build && npm run start
//   node scripts/gen-og.mjs [port]
//
// Screenshotting the page is deliberate. Building the card as an SVG and
// rendering it needs the fonts as files, and that failed twice: sharp resolves
// font-family through the OS font database and quietly substitutes a generic
// sans, and Google Fonts returns something other than truetype whatever user
// agent asks. This way the preview is by construction in the same typefaces as
// the page, and cannot drift from it.

import puppeteer from "puppeteer-core";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const port = process.argv[2] || "3000";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu"],
});
const page = await browser.newPage();
// deviceScaleFactor 1: 1200x630 is already the size every scraper wants, and
// doubling it only doubles the bytes on a preview nobody zooms into.
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(`http://127.0.0.1:${port}/og-card`, { waitUntil: "networkidle0", timeout: 45000 });
await page.evaluateHandle("document.fonts.ready"); // or the serif captures as a fallback face
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: join(root, "public", "og.png") });
await browser.close();

console.log("public/og.png  1200x630");
console.log("Now open it and look at it.");
