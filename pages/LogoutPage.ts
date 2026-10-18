import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly btnContinue: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h1");
    this.btnContinue = page.locator("#content a.btn-primary");
  }

  /**
   * Clicks the Continue button after logout
   * @returns Promise<HomePage> - Instance of the home page
   */
  async clickContinue(): Promise<HomePage> {
    await this.btnContinue.click();
    return new HomePage(this.page);
  }

  /**
   * Verifies the logout confirmation page is displayed
   * @returns Promise<boolean> - true if the logout page is displayed
   */
  async isLogoutPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking logout page: ${error}`);
      return false;
    }
  }
}
