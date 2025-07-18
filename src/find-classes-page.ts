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

  // Filter by session
  await expect(addFilterButton).toBeVisible();
  await addFilterButton.click();

  const sessionFilterOption = page
    .locator("#tab-panel-classes")
    .getByText("SESSION", { exact: true });
  await expect(sessionFilterOption).toBeVisible();
  await sessionFilterOption.click();

  const sessionMultiSelectDropdown = page.getByRole("button", {
    name: "Select Session",
  });
  await expect(sessionMultiSelectDropdown).toBeVisible();
  await sessionMultiSelectDropdown.click();

  const schoolYearOption = page.getByRole("listbox").getByRole("option", { name: "2025-2026 School Year", exact: true });
  await expect(schoolYearOption).toBeVisible();
  await schoolYearOption.click();

  await expect(applyFilterButton).toBeVisible();
  await applyFilterButton.click();

  await page.waitForTimeout(250);
}

export async function refreshClasses(page: Page) {
  let classFound = false;

  // Used for testing
  // const eightClass = page.locator("td").getByText(/8:00/gi);

  // Times we are interested in
  // const nineClass = page.locator("td").getByText(/9:00/gi);
  const tenClass = page.locator("td").getByText(/10:00/gi);
  const elevenClass = page.locator("td").getByText(/11:00/gi);
  const twelveClass = page.locator("td").getByText(/12:00/gi);
  const oneClass = page.locator("td").getByText(/1:00/gi);
  const twoClass = page.locator("td").getByText(/2:00/gi);

  while (!classFound) {
    if (
      // (await eightClass.isVisible()) ||
      // (await nineClass.isVisible()) ||
      (await tenClass.isVisible()) ||
      (await elevenClass.isVisible()) ||
      (await twelveClass.isVisible()) ||
      (await oneClass.isVisible()) ||
      (await twoClass.isVisible())
    ) {
      classFound = true;
    } else {
      console.log(
        'No classes found, refreshing list via toggling "All Ages" button.',
      );

      const allAgesToggle = page
        .locator("#tab-panel-classes label")
        .filter({ hasText: "All Ages" });

      // refresh page every 30s via clicking "all ages" toggle x2
      await page.waitForTimeout(30000);

      await allAgesToggle.click();

      await page.waitForTimeout(2000);

      await page.waitForTimeout(2000);
      await allAgesToggle.click();

      await page.waitForTimeout(2000);
    }
  }

  return scrapeClassOpenings(page);
}

export interface ClassOpening {
  title: string;
  sessionName: string;
  time: string;
}

async function scrapeClassOpenings(page: Page): Promise<ClassOpening[]> {
  const classOpenings: ClassOpening[] = [];

  const classRows = await page.locator(".btn-class-details").all();

  for (const classRow of classRows) {
    const title = await classRow.locator("td:nth-child(1)").innerText();
    const sessionNameFullText = await classRow
      .locator("td:nth-child(3)")
      .innerText();
    const sessionName = sessionNameFullText.split("\n")[0];
    const timeFullText = await classRow.locator("td:nth-child(4)").innerText();
    const time = timeFullText.split("\n")[0];

    classOpenings.push({
      title,
      sessionName: sessionName ?? sessionNameFullText,
      time: time ?? timeFullText,
    });
  }

  return classOpenings;
}
