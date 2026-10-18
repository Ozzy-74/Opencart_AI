import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h2").first();
  }

  /**
   * Verifies the My Account dashboard is displayed after authentication
   * @returns Promise<boolean> - true if the My Account page is displayed
   */
  async isMyAccountPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      const headingText = (await this.heading.textContent())?.trim() ?? "";
      return headingText === "My Account";
    } catch (error) {
      console.log(`Error checking My Account page: ${error}`);
      return false;
    }
  }
}
