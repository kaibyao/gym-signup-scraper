import { type Page } from "@playwright/test";
import { setup } from "./setup.ts";
import { login } from "./login.ts";
import { navigateToFindClassesPage } from "./post-login-dashboard.ts";
import { filterClasses, refreshClasses } from "./find-classes-page.ts";

export async function runScraper(page: Page) {
  const { loginUrl, loginEmail, loginPassword, classFinderButtonTitle } =
    setup();

  console.log("Navigating to login URL...");
  await page.goto(loginUrl);

  console.log("Filling in login form...");
  // TODO: maybe use ENV variables for selectors?
  await login({ page, email: loginEmail, password: loginPassword });

  await navigateToFindClassesPage(page, classFinderButtonTitle);
  await filterClasses(page);
  await refreshClasses(page);
}
