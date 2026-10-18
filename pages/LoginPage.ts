import { Page, Locator } from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly txtEmail: Locator;
  private readonly txtPassword: Locator;
  private readonly btnLogin: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.txtEmail = page.locator("#input-email");
    this.txtPassword = page.locator("#input-password");
    this.btnLogin = page.locator('input[value="Login"]');
  }

  /**
   * Logs in with the supplied customer credentials
   * @param email - Customer email address
   * @param password - Customer password
   * @returns Promise<MyAccountPage> - Instance of the My Account page
   */
  async login(email: string, password: string): Promise<MyAccountPage> {
    try {
      await this.txtEmail.fill(email);
      await this.txtPassword.fill(password);
      await this.btnLogin.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Error logging in: ${error}`);
      throw error;
    }
  }

  /**
   * Verifies the login page is displayed
   * @returns Promise<boolean> - true if the login page is displayed
   */
  async isLoginPageExists(): Promise<boolean> {
    try {
      await this.txtEmail.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking login page: ${error}`);
      return false;
    }
  }
}
