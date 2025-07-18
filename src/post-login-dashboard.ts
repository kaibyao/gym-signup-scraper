import { expect, type Page } from "@playwright/test";
import { PAGE_NAVIGATION_TIMEOUT } from "../constants.ts";

export async function navigateToFindClassesPage(
  page: Page,
  buttonTitle: string,
) {
  const classesLink = page.getByRole('link', { name: buttonTitle });
  await classesLink.isVisible();
  await Promise.all([
    classesLink.click(),
    page.waitForEvent("framenavigated", { timeout: PAGE_NAVIGATION_TIMEOUT }),
  ]);

  await clickThroughPopups(page);
}

async function clickThroughPopups(page: Page) {
  console.log("Clicking through popups...");

  try {
    await page.getByRole("heading", { name: "Sorting" }).waitFor({ state: "visible" });
    console.log("Sorting popup visible");
    const button = page.getByRole("button", { name: "OK" });
    await button.isVisible();
    await button.click();
  } catch (error) {
    console.log("Sorting popup not visible");
  }

  try {
    await page.getByRole("heading", { name: "Filtering" }).waitFor({ state: "visible" });
    console.log("Filtering popup visible");
    const button = page.getByRole("button", { name: "OK" });
    await button.isVisible();
    await button.click();
  } catch (error) {
    console.log("Filtering popup not visible");
  }
}
