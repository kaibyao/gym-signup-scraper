import { expect, type Page } from "@playwright/test";
import { PAGE_NAVIGATION_TIMEOUT } from "../constants.ts";

export async function navigateToFindClassesPage(
  page: Page,
  buttonTitle: string,
) {
  await Promise.all([
    page.getByText(buttonTitle).click(),
    page.waitForEvent("framenavigated", { timeout: PAGE_NAVIGATION_TIMEOUT }),
  ]);

  await clickThroughPopups(page);
}

async function clickThroughPopups(page: Page) {
  console.log("Clicking through popups...");

  await expect(page.getByRole("heading", { name: "Sorting" })).toBeVisible();
  const button = page.getByRole("button", { name: "OK" });
  await button.click();

  await expect(page.getByRole("heading", { name: "Filtering" })).toBeVisible();
  await button.click();
}
