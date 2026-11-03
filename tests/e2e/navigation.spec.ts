import { expect, test } from "@playwright/test";
import { publishedArticles } from "../../src/data/articles";

const primaryNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Primary navigation" });

test.describe("Services dropdown", () => {
  test("opens on hover and links to a service group", async ({ page }) => {
    await page.goto("/");
    const trigger = primaryNav(page).getByRole("button", { name: "Services" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = page.locator("#services-menu");
    await expect(menu).toBeVisible();

    await menu.getByRole("link", { name: /Data Services/ }).click();
    await expect(page).toHaveURL(/\/services#data-services$/);
    await expect(page.locator("#data-services")).toBeInViewport();
  });

  test("opens on click and toggles closed", async ({ page }) => {
    await page.goto("/about");
    const trigger = primaryNav(page).getByRole("button", { name: "Services" });
    // Move the pointer away first so hover does not interfere with click toggling.
    await page.mouse.move(0, 600);
    await trigger.dispatchEvent("click");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await trigger.dispatchEvent("click");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("is keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const trigger = primaryNav(page).getByRole("button", { name: "Services" });
    await trigger.focus();

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("ArrowDown");
    const items = page.locator("#services-menu [data-menu-item]");
    await expect(items.first()).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("ArrowDown on the trigger opens the menu and focuses the first item", async ({ page }) => {
    await page.goto("/");
    const trigger = primaryNav(page).getByRole("button", { name: "Services" });
    await trigger.focus();
    await page.keyboard.press("ArrowDown");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#services-menu [data-menu-item]").first()).toBeFocused();
  });
});

test.describe("Mobile drawer", () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test("opens, traps focus, locks scroll and closes with Escape", async ({ page }) => {
    await page.goto("/");
    const open = page.getByRole("button", { name: "Open navigation menu" });
    await open.click();

    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(drawer).toBeVisible();
    await expect(open).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

    // Focus never leaves the drawer while tabbing in either direction.
    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Tab");
      expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    for (let i = 0; i < 5; i += 1) {
      await page.keyboard.press("Shift+Tab");
      expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(open).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });

  test("services accordion reveals group links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    const accordion = drawer.getByRole("button", { name: "Services" });
    await expect(accordion).toHaveAttribute("aria-expanded", "false");
    await expect(drawer.getByRole("link", { name: "Software & Technology" })).toBeHidden();

    await accordion.click();
    await expect(accordion).toHaveAttribute("aria-expanded", "true");
    await drawer.getByRole("link", { name: "Software & Technology" }).click();
    await expect(page).toHaveURL(/\/services#software-technology$/);
    await expect(drawer).toBeHidden();
  });
});

test.describe("Footer", () => {
  const groups = [
    ["Digital & Online Services", "digital-online-services"],
    ["Data Services", "data-services"],
    ["Software & Technology", "software-technology"],
    ["Creative & Professional", "creative-professional"],
  ] as const;

  for (const [label, id] of groups) {
    test(`Solutions link "${label}" lands on #${id}`, async ({ page }) => {
      await page.goto("/");
      const footer = page.getByRole("contentinfo");
      const link = footer.getByRole("navigation", { name: "Solutions" }).getByRole("link", { name: label });
      await expect(link).toHaveAttribute("href", `/services#${id}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/services#${id}$`));

      const section = page.locator(`#${id}`);
      await expect(section).toBeInViewport();
      // The heading is not hidden behind the sticky header.
      const headerBottom = await page.locator("header.site-header").evaluate((el) => el.getBoundingClientRect().bottom);
      const headingTop = await page.locator(`#${id}-heading`).evaluate((el) => el.getBoundingClientRect().top);
      expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
    });
  }

  test("has legal links and a current copyright year", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy-policy");
    await expect(footer.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("href", "/terms");
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Afrinex Solutions`);
  });
});

test.describe("Blog visibility", () => {
  test("Blog link follows whether any post is published", async ({ page }) => {
    await page.goto("/");
    const navBlog = primaryNav(page).getByRole("link", { name: "Blog" });
    const footerBlog = page.getByRole("contentinfo").getByRole("link", { name: "Blog" });

    if (publishedArticles.length === 0) {
      await expect(navBlog).toHaveCount(0);
      await expect(footerBlog).toHaveCount(0);
    } else {
      await expect(navBlog).toBeVisible();
      await expect(footerBlog).toBeVisible();
    }
  });

  test("/blog still renders its empty state", async ({ page }) => {
    test.skip(publishedArticles.length > 0, "Only applies while there are no posts");
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Practical digital guidance");
    await expect(page.getByRole("heading", { name: "Articles are being prepared" })).toBeVisible();
    await expect(page.getByRole("main").getByRole("link", { name: "Explore Services" })).toBeVisible();
  });
});

test.describe("Header", () => {
  test("gains a shadow after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header.site-header");
    await expect(header).toHaveAttribute("data-scrolled", "false");
    await page.mouse.wheel(0, 800);
    await expect(header).toHaveAttribute("data-scrolled", "true");
  });

  test("theme switcher has an accessible label and switches theme", async ({ page }) => {
    await page.goto("/");
    const group = page.getByRole("group", { name: "Color theme" }).first();
    await expect(group).toBeVisible();
    await group.getByRole("radio", { name: "Dark theme" }).check({ force: true });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
