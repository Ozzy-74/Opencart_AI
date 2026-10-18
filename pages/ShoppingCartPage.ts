import { Page, Locator } from "@playwright/test";

export class ShoppingCartPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;
  private readonly cartTable: Locator;
  private readonly totalsTable: Locator;
  private readonly cartProductLink: Locator;
  private readonly txtQuantity: Locator;
  private readonly unitPriceCell: Locator;
  private readonly totalCell: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h1");
    this.cartTable = page.locator("#content .table-bordered").first();
    this.totalsTable = page.locator("#content .table-bordered").last();
    this.cartProductLink = this.cartTable.locator("tbody tr").first().locator("td.text-left a").first();
    this.txtQuantity = page.locator('#content input[name^="quantity"]').first();
    this.unitPriceCell = this.cartTable.locator("tbody tr").first().locator("td.text-right").first();
    this.totalCell = this.totalsTable.locator("tbody tr").last().locator("td.text-right").last();
  }

  /**
   * Gets the product name shown in the cart
   * @returns Promise<string> - Cart product name
   */
  async getProductName(): Promise<string> {
    return (await this.cartProductLink.textContent())?.trim() ?? "";
  }

  /**
   * Gets the quantity shown for the product in the cart
   * @returns Promise<string> - Cart product quantity
   */
  async getQuantity(): Promise<string> {
    return await this.txtQuantity.inputValue();
  }

  /**
   * Gets the unit price shown for the product in the cart
   * @returns Promise<string> - Cart unit price
   */
  async getUnitPrice(): Promise<string> {
    return (await this.unitPriceCell.textContent())?.trim() ?? "";
  }

  /**
   * Gets the applicable cart total
   * @returns Promise<string> - Cart total amount
   */
  async getCartTotal(): Promise<string> {
    return (await this.totalCell.textContent())?.trim() ?? "";
  }

  /**
   * Verifies the shopping cart page is displayed
   * @returns Promise<boolean> - true if the shopping cart page is displayed
   */
  async isShoppingCartPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      const headingText = (await this.heading.textContent())?.trim() ?? "";
      return headingText.includes("Shopping Cart");
    } catch (error) {
      console.log(`Error checking shopping cart page: ${error}`);
      return false;
    }
  }
}
