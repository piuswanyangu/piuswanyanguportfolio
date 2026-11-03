import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/services/sha-registration-assistance",
  "/work",
  "/projects/staynia",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

test.describe("Routes", () => {
  for (const route of routes) {
    test(`${route} renders with exactly one h1 and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => message.type() === "error" && errors.push(message.text()));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      // Every image has alt text (empty alt is allowed for decorative images).
      expect(await page.locator("img:not([alt])").count()).toBe(0);
      expect(errors).toEqual([]);
    });
  }

  test("unknown routes show the branded 404", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page could not be found.");
    await expect(page.getByRole("main").getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
  });

  test("inner pages expose breadcrumbs and BreadcrumbList JSON-LD", async ({ page }) => {
    await page.goto("/services");
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText("Home");
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(jsonLd.some((text) => text.includes('"BreadcrumbList"'))).toBe(true);
  });
});

test.describe("Accessibility basics", () => {
  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content$/);
  });

  test("SHA/KRA non-affiliation notice is shown on /services", async ({ page }) => {
    await page.goto("/services");
    await expect(
      page.locator("#digital-online-services").getByText("is not affiliated with SHA or KRA"),
    ).toBeVisible();
  });

  test("testimonials section is hidden while there are no approved testimonials", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#testimonials-heading")).toHaveCount(0);
  });
});

test.describe("Floating actions", () => {
  test("WhatsApp button uses the prefilled link", async ({ page }) => {
    await page.goto("/");
    const whatsapp = page.getByRole("link", { name: "Chat with Afrinex on WhatsApp (opens in a new tab)" });
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/254792342944\?text=/);
  });

  test("back-to-top appears after scrolling and returns to the top", async ({ page }) => {
    await page.goto("/");
    const backToTop = page.getByRole("button", { name: "Back to top" });
    await expect(backToTop).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(backToTop).toBeVisible();

    await backToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(backToTop).toBeHidden();
  });

  test("back-to-top jumps instantly under reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.getByRole("button", { name: "Back to top" }).click();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await context.close();
  });
});
