import { expect, test, type Page } from "@playwright/test";

/** Navigates and waits until the enquiry form is hydrated and interactive. */
async function openContact(page: Page, query = "") {
  await page.goto(`/contact${query}`);
  await expect(page.locator("form[data-hydrated]")).toHaveCount(1);
}

test.describe("Contact form", () => {
  test("is server-rendered (no loading placeholder)", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/contact");
    await expect(page.getByText("Loading enquiry options")).toHaveCount(0);
    await expect(page.getByLabel(/^Name/)).toBeVisible();
    await expect(page.getByLabel(/^Service needed/)).toBeVisible();
    await expect(page.getByLabel(/^Message/)).toBeVisible();
    await context.close();
  });

  test("shows accessible inline errors and focuses the first invalid field", async ({ page }) => {
    await openContact(page);
    await page.getByRole("button", { name: /Continue in WhatsApp/ }).click();

    const name = page.getByLabel(/^Name/);
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toHaveAttribute("aria-describedby", "enquiry-name-error");
    await expect(page.locator("#enquiry-name-error")).toHaveText("Enter your name.");
    await expect(page.locator("#enquiry-service-error")).toHaveText("Choose the service you need.");
    await expect(page.locator("#enquiry-message-error")).toHaveText("Briefly describe what you need.");

    await name.fill("Wanjiru");
    await expect(page.locator("#enquiry-name-error")).toHaveCount(0);
    await expect(name).toHaveAttribute("aria-invalid", "false");
  });

  test("validates a field on blur", async ({ page }) => {
    await openContact(page);
    const message = page.getByLabel(/^Message/);
    await message.fill("short");
    await message.blur();
    await expect(page.locator("#enquiry-message-error")).toContainText("at least 10 characters");
  });

  test("prefills the service from ?service= (slug)", async ({ page }) => {
    await openContact(page, "?service=data-cleaning");
    await expect(page.getByLabel(/^Service needed/)).toHaveValue("data-cleaning");
  });

  test("prefills the service from ?service= (category)", async ({ page }) => {
    await openContact(page, `?service=${encodeURIComponent("Data Services")}`);
    await expect(page.getByLabel(/^Service needed/)).toHaveValue("category:Data Services");
  });

  test("ignores an unknown ?service= value", async ({ page }) => {
    await openContact(page, "?service=not-a-service");
    await expect(page.getByLabel(/^Service needed/)).toHaveValue("");
  });

  test("opens WhatsApp with a prefilled message", async ({ page }) => {
    let target = "";
    await page.route("https://wa.me/**", async (route) => {
      target = route.request().url();
      await route.fulfill({ status: 200, body: "ok" });
    });

    await openContact(page, "?service=etims-assistance");
    await page.getByLabel(/^Name/).fill("Wanjiru");
    await page.getByLabel(/^Message/).fill("I need help setting up eTIMS for my shop.");
    await page.getByRole("button", { name: /Continue in WhatsApp/ }).click();

    await expect.poll(() => target).toContain("https://wa.me/254792342944");
    const text = new URL(target).searchParams.get("text") ?? "";
    expect(text).toContain("eTIMS Assistance");
    expect(text).toContain("Name: Wanjiru");
    expect(text).toContain("I need help setting up eTIMS for my shop.");
  });

  test("switches to email and links to the privacy policy", async ({ page }) => {
    await openContact(page);
    await page.locator("form").getByText("Email", { exact: true }).click();
    await expect(page.getByRole("button", { name: /Continue in Email/ })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy");
  });
});
