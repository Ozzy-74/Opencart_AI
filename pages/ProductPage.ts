import { Page, Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";

export class ProductPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly productPrice: Locator;
  private readonly txtQuantity: Locator;
  private readonly btnAddToCart: Locator;
  private readonly alertSuccess: Locator;
  private readonly lnkShoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h1");
    this.productPrice = page.locator("#content .list-unstyled h2").first();
    this.txtQuantity = page.locator("#input-quantity");
    this.btnAddToCart = page.locator("#button-cart");
    this.alertSuccess = page.locator(".alert-success");
    this.lnkShoppingCart = page.locator('a[title="Shopping Cart"]');
  }

  /**
   * Gets the product name from the product details heading
   * @returns Promise<string> - Product name
   */
  async getProductName(): Promise<string> {
    return (await this.heading.textContent())?.trim() ?? "";
  }

  /**
   * Gets the displayed product price
   * @returns Promise<string> - Product price text
   */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent())?.trim() ?? "";
  }

  /**
   * Sets the quantity to add to the cart
   * @param quantity - Quantity value
   */
  async setQuantity(quantity: string): Promise<void> {
    await this.txtQuantity.fill(quantity);
  }

  /**
   * Adds the current product to the shopping cart
   */
  async addToCart(): Promise<void> {
    await this.btnAddToCart.click();
  }

  /**
   * Gets the product-added confirmation message
   * @returns Promise<string> - Success alert text
   */
  async getAddToCartSuccessMessage(): Promise<string> {
    await this.alertSuccess.waitFor({ state: "visible" });
    return (await this.alertSuccess.textContent())?.trim() ?? "";
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
   * Verifies the product details page is displayed
   * @returns Promise<boolean> - true if the product page is displayed
   */
  async isProductPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking product page: ${error}`);
      return false;
    }
  }
}
