import { Page, Locator } from "@playwright/test";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";
import { LogoutPage } from "./LogoutPage";
import { SearchResultsPage } from "./SearchResultsPage";
import { ShoppingCartPage } from "./ShoppingCartPage";

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly lnkMyAccount: Locator;
  private readonly ddMenu: Locator;
  private readonly lnkRegister: Locator;
  private readonly lnkLogin: Locator;
  private readonly lnkLogout: Locator;
  private readonly txtSearch: Locator;
  private readonly btnSearch: Locator;
  private readonly lnkShoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.lnkMyAccount = page.locator('.list-inline a[title="My Account"]');
    this.ddMenu = page.locator(".list-inline li.dropdown ul.dropdown-menu");
    this.lnkRegister = this.ddMenu.locator('a[href*="route=account/register"]');
    this.lnkLogin = this.ddMenu.locator('a[href*="route=account/login"]');
    this.lnkLogout = this.ddMenu.locator('a[href*="route=account/logout"]');
    this.txtSearch = page.locator('#search input[name="search"]');
    this.btnSearch = page.locator("#search button");
    this.lnkShoppingCart = page.locator('a[title="Shopping Cart"]');
  }

  /**
   * Opens the My Account dropdown menu in the header
   */
  async openMyAccountMenu(): Promise<void> {
    await this.lnkMyAccount.click();
  }

  /**
   * Opens the registration page via My Account -> Register
   * @returns Promise<RegisterPage> - Instance of the registration page
   */
  async clickRegister(): Promise<RegisterPage> {
    try {
      await this.openMyAccountMenu();
      await this.lnkRegister.click();
      return new RegisterPage(this.page);
    } catch (error) {
      console.log(`Error clicking Register link: ${error}`);
      throw error;
    }
  }

  /**
   * Opens the login page via My Account -> Login
   * @returns Promise<LoginPage> - Instance of the login page
   */
  async clickLogin(): Promise<LoginPage> {
    try {
      await this.openMyAccountMenu();
      await this.lnkLogin.click();
      return new LoginPage(this.page);
    } catch (error) {
      console.log(`Error clicking Login link: ${error}`);
      throw error;
    }
  }

  /**
   * Logs out via My Account -> Logout
   * @returns Promise<LogoutPage> - Instance of the logout page
   */
  async clickLogout(): Promise<LogoutPage> {
    try {
      await this.openMyAccountMenu();
      await this.lnkLogout.click();
      return new LogoutPage(this.page);
    } catch (error) {
      console.log(`Error clicking Logout link: ${error}`);
      throw error;
    }
  }

  /**
   * Searches for a product using the header search box
   * @param productName - Product name to search for
   * @returns Promise<SearchResultsPage> - Instance of the search results page
   */
  async searchProduct(productName: string): Promise<SearchResultsPage> {
    await this.txtSearch.fill(productName);
    await this.btnSearch.click();
    return new SearchResultsPage(this.page);
  }

  /**
   * Opens the shopping cart from the header
   * @returns Promise<ShoppingCartPage> - Instance of the shopping cart page
   */
  async clickShoppingCart(): Promise<ShoppingCartPage> {
    await this.lnkShoppingCart.click();
    return new ShoppingCartPage(this.page);
  }

  /**
   * Verifies the home page is displayed
   * @returns Promise<boolean> - true if the home page is displayed
   */
  async isHomePageExists(): Promise<boolean> {
    try {
      await this.lnkMyAccount.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking home page: ${error}`);
      return false;
    }
  }
}
