import "dotenv/config";
import { chromium } from "playwright";
import { runScraper } from "./src/run-scraper.ts";

async function main() {
  const browser = await chromium.launch({
    headless: false, // To see the browser in action
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await runScraper(page);
}

// Run the script
main();
