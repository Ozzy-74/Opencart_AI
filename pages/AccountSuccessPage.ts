import { Page, Locator } from "@playwright/test";

export class AccountSuccessPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h1");
  }

  /**
   * Gets the account-created confirmation heading
   * @returns Promise<string> - Confirmation heading text
   */
  async getConfirmationHeading(): Promise<string> {
    return (await this.heading.textContent())?.trim() ?? "";
  }

  /**
   * Verifies the account success page is displayed
   * @returns Promise<boolean> - true if the account success page is displayed
   */
  async isAccountSuccessPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking account success page: ${error}`);
      return false;
    }
  }
}
