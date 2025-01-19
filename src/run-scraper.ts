import { type Page } from "@playwright/test";
import { setup } from "./setup.ts";
import { login } from "./login.ts";
import { navigateToFindClassesPage } from "./post-login-dashboard.ts";
import { filterClasses, refreshClasses } from "./find-classes-page.ts";
import { sendEmail } from "./email.ts";

export async function runScraper(page: Page) {
  const {
    loginUrl,
    loginEmail,
    loginPassword,
    classFinderButtonTitle,
    sendgridEmailFrom,
    sendgridEmailRecipient,
    sendgridEmailTemplateId,
  } = setup();

  console.log("Navigating to login URL...");
  await page.goto(loginUrl);

  console.log("Filling in login form...");
  // TODO: maybe use ENV variables for selectors?
  await login({ page, email: loginEmail, password: loginPassword });

  await navigateToFindClassesPage(page, classFinderButtonTitle);
  await filterClasses(page);
  const classOpenings = await refreshClasses(page);
  console.log("Class openings", classOpenings);

  await sendEmail({
    classOpenings,
    sendgridEmailFrom,
    sendgridEmailRecipient,
    sendgridEmailTemplateId,
  });
}
