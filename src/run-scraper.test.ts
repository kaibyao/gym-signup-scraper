import "dotenv/config";
import { test } from "@playwright/test";
import { runScraper } from "./run-scraper.ts";

test.describe.serial("Gym Signup Scraper", () => {
  test.slow();

  test("should login, navigate to find classes page, and scrape classes", async ({
    page,
  }) => {
    await runScraper(page);
  });
});
