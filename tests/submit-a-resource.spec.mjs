// @ts-check
import { test, expect } from "@playwright/test";
import { v1 as uuidv1 } from "uuid";

// Form submission details
const URI =
  "https://deploy-preview-32--wai-course-list.netlify.app/course-list/submit-a-resource"; // NB no trailing /
//const URI = "localhost:8888//course-list/submit-a-resource"; // NB no trailing /
const FORM_ID = `test-${uuidv1()}`;

// GtHub constants
const GH_USER = "w3c";
const GH_REPO = "wai-course-list";
const GH_URI = `https://github.com/${GH_USER}/${GH_REPO}`;

test('Form "test-form" submission should create a Pull Request - slow test', async ({
  page,
}) => {
  // Submit form
  await page.goto(URI);
  await page.evaluate(
    (formID) =>
      (document.querySelector('input[name="form-id"]').value = formID),
    FORM_ID
  );

  // visible fields
  await page.fill('"Name (Required)"', "Submitter");
  await page.fill('"Email (Required)"', "submitter@w3.org");
  await page.fill('"Title (Required)"', "Test Title");
  await page.fill('"Provider (Required)"', "Provider");
  await page.selectOption("select#country", { label: "Georgia (საქართველო)" });
  await page.fill('"Description (Required)"', "Description");
  await page.check('"Training"');
  await page.check('"Developer"');
  await page.check('"Designer"');
  await page.check('"Intermediate"');
  await page.fill('"Prerequisites"', "Prerequisites");
  await page.fill('"Topics (Required)"', "Topics");
  await page.click("details"); // no id - selects first - try "Foundations Modules"
  await page.check('"Module 2: People and Digital Technology"');
  await page.selectOption('"Language (Required)"', {
    label: "Xhosa (isiXhosa)",
  }); // bad label
  await page.check('"Online - all teaching sessions are provided online "');
  await page.check(
    '"Scheduled - participants are required to attend at a specific time"'
  );
  await page.fill('"Platform"', "Platform");
  await page.check('"Material provided ahead of time, if requested"');
  await page.fill(
    '"Additional accessibility support"',
    "Additional accessibility support"
  );
  await page.fill("input#course-length", "3 weeks"); // legend not label
  await page.check('"Paid"');
  await page.fill('"Website (Required)"', "https://w3.org/WAI");
  await page.fill('"Reviews page"', "https://w3.org/WAI");
  await page.fill('"Last updated (Required)"', "2022-01-01");
  await page.fill('"Start date (Required)"', "2022-01-01");
  await page.fill('"End date"', "2022-01-01");
  await page.fill('"Comments"', "Comments");
  await page.check('text="The information I provided is correct"');
  await page.check('text="I give permission for"');

  let [response] = await Promise.all([
    page.waitForResponse(
      (response) => response.url() === URI && response.status() === 200
    ),
    page.click("text=Send information"),
  ]);

  https: await expect(
    page.locator("text=Your form submission has been received.")
  ).toBeVisible();
  await page.click("text=← Back to our site");
  // await expect(page).toHaveURL(URI) for unknown reason this is routing to parentURI in tests

  // Check PR created
  await page.waitForTimeout(20000); // NB this is well flakey but Playwright doesn't provide a way to poll for page updates
  response = await page.goto(`${GH_URI}/pulls`);
  expect(response.ok()).toBeTruthy();

  // Open PR and show file
  // TODO Think about using API rather than UI
  await page.click(`text=/New form submission:.*${FORM_ID}/`);
  await expect(page).toHaveURL(new RegExp(`${GH_URI}/pull/\\d+`));
  await page.click("text=Files changed");
  await expect(page).toHaveURL(new RegExp(`${GH_URI}/pull/\\d+/files`));

  // Check filename name and file contains the form-id
  const fileName = page.locator(
    `div[data-details-container-group="file"] a:has-text("_data/courses/${FORM_ID}.json")`
  );
  await expect(fileName).toBeVisible();
  const fileContent = page.locator(
    `div[data-details-container-group="file"] table`
  );
  await expect(fileContent).toContainText(
    new RegExp(`{[\\s\\S]*"id":\\s*"${FORM_ID}`)
  );
  await expect(fileContent).toContainText(
    new RegExp(`{[\\s\\S]*"submitter-email":\\s*"${SUBMITTER_EMAIL}`)
  );

  // Clean up - user needs to be logged in
  /*  await page.click(`text=Conversation`)
    await page.click(`text=Close pull request`)
    await page.click(`text=Delete Branch`)
    */
});
