import { Page, Locator } from "@playwright/test";
import { AccountSuccessPage } from "./AccountSuccessPage";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtEmail: Locator;
  private readonly txtTelephone: Locator;
  private readonly txtPassword: Locator;
  private readonly txtPasswordConfirm: Locator;
  private readonly chkPrivacyPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.txtFirstName = page.locator("#input-firstname");
    this.txtLastName = page.locator("#input-lastname");
    this.txtEmail = page.locator("#input-email");
    this.txtTelephone = page.locator("#input-telephone");
    this.txtPassword = page.locator("#input-password");
    this.txtPasswordConfirm = page.locator("#input-confirm");
    this.chkPrivacyPolicy = page.locator('input[name="agree"]');
    this.btnContinue = page.locator('input[value="Continue"]');
    this.heading = page.locator("#content h1");
  }

  /**
   * Fills the registration form, accepts the privacy policy and submits it
   * @param data - Customer registration details
   * @returns Promise<AccountSuccessPage> - Instance of the account success page
   */
  async completeRegistration(data: RegistrationData): Promise<AccountSuccessPage> {
    try {
      await this.txtFirstName.fill(data.firstName);
      await this.txtLastName.fill(data.lastName);
      await this.txtEmail.fill(data.email);
      await this.txtTelephone.fill(data.telephone);
      await this.txtPassword.fill(data.password);
      await this.txtPasswordConfirm.fill(data.password);
      await this.chkPrivacyPolicy.check();
      await this.btnContinue.click();
      return new AccountSuccessPage(this.page);
    } catch (error) {
      console.log(`Error completing registration: ${error}`);
      throw error;
    }
  }

  /**
   * Verifies the registration page is displayed
   * @returns Promise<boolean> - true if the registration page is displayed
   */
  async isRegisterPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking registration page: ${error}`);
      return false;
    }
  }
}
