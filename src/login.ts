import type { Page } from "@playwright/test";

export async function login({
  page,
  email,
  password,
}: {
  page: Page;
  email: string;
  password: string;
}) {
  await page.fill('input[name="UserName"]', email);
  await page.fill('input[name="Password"]', password);
  await page.click('button[id="btn-signin"]');
}
