import { expect, type Page } from "@playwright/test";

export async function filterClasses(page: Page) {
  const addFilterButton = page.getByRole("button", { name: " ADD A FILTER" });
  await expect(addFilterButton).toBeVisible();
  await addFilterButton.click();

  // Filter days of the week.
  const daysOfWeekFilterOption = page
    .locator("#tab-panel-classes")
    .getByText("DAYS OF THE WEEK");
  await expect(daysOfWeekFilterOption).toBeVisible();
  await daysOfWeekFilterOption.click();

  const daysOfWeekSelectDropdown = page.getByRole("button", {
    name: "Select one or more",
  });
  await expect(daysOfWeekSelectDropdown).toBeVisible();
  await daysOfWeekSelectDropdown.click();

  const saturdayOption = page
    .locator("#filter-classes-days")
    .getByText("SAT done");
  await expect(saturdayOption).toBeVisible();
  await saturdayOption.click();

  await page.waitForTimeout(250);

  // close dropdown
  const closeDayOfWeekDropdownButton = page
    .locator("#filter-classes-days")
    .getByRole("combobox")
    .locator("button");
  await expect(closeDayOfWeekDropdownButton).toBeVisible();
  await closeDayOfWeekDropdownButton.click();

  const applyFilterButton = page.getByRole("button", { name: "ADD FILTER" });
  await expect(applyFilterButton).toBeVisible();
  await applyFilterButton.click();

  expect(
    page.getByRole("heading", { name: "Filter Results by Days" }),
  ).not.toBeVisible();

  // Filter by gender
  await expect(addFilterButton).toBeVisible();
  await addFilterButton.click();

  const genderFilterOption = page
    .locator("#tab-panel-classes")
    .getByText("GENDER");
  await expect(genderFilterOption).toBeVisible();
  await genderFilterOption.click();

  const maleOption = page.getByText("Male", { exact: true });
  await expect(maleOption).toBeVisible();
  await maleOption.click();

  await page.waitForTimeout(250);

  await expect(applyFilterButton).toBeVisible();
  await applyFilterButton.click();

  // Filter by age

  await expect(addFilterButton).toBeVisible();
  await addFilterButton.click();

  const ageFilterOption = page
    .locator("#tab-panel-classes")
    .getByText("AGE", { exact: true });
  await expect(ageFilterOption).toBeVisible();
  await ageFilterOption.click();

  const ageMultiSelectDropdown = page.getByRole("button", {
    name: "Select Age",
  });
  await expect(ageMultiSelectDropdown).toBeVisible();
  await ageMultiSelectDropdown.click();

  const sixOption = page
    .getByRole("listbox")
    .getByRole("option", { name: "6", exact: true });
  await expect(sixOption).toBeVisible();
  await sixOption.click();

  await expect(applyFilterButton).toBeVisible();
  await applyFilterButton.click();

  await page.waitForTimeout(250);
}

export async function refreshClasses(page: Page) {
  let classFound = false;

  const nineClass = page.locator("td").getByText(/9:00/gi);
  const tenClass = page.locator("td").getByText(/10:00/gi);
  const elevenClass = page.locator("td").getByText(/11:00/gi);
  const twelveClass = page.locator("td").getByText(/12:00/gi);
  const oneClass = page.locator("td").getByText(/1:00/gi);
  const twoClass = page.locator("td").getByText(/2:00/gi);

  while (!classFound) {
    if (
      (await nineClass.isVisible()) ||
      (await tenClass.isVisible()) ||
      (await elevenClass.isVisible()) ||
      (await twelveClass.isVisible()) ||
      (await oneClass.isVisible()) ||
      (await twoClass.isVisible())
    ) {
      classFound = true;
    } else {
      const allAgesToggle = page
        .locator("#tab-panel-classes label")
        .filter({ hasText: "All Ages" });

      // refresh page every 30s via clicking "all ages" toggle x2
      await page.waitForTimeout(10000);

      await allAgesToggle.click();

      await page.waitForTimeout(2000);

      await page.waitForTimeout(2000);
      await allAgesToggle.click();

      await page.waitForTimeout(2000);
    }
  }

  // TODO: send email
  console.log("Class found");
}
