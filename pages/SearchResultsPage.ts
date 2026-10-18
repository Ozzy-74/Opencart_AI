import { Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class SearchResultsPage {
  private readonly page: Page;

  // Locators
  private readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.heading = page.locator("#content h1");
  }

  /**
   * Verifies a product is listed in the search results
   * @param productName - Product name to look for
   * @returns Promise<boolean> - true if the product is listed
   */
  async isProductVisible(productName: string): Promise<boolean> {
    try {
      return await this.page
        .locator("#content .product-layout h4 a")
        .filter({ hasText: new RegExp(`^${productName}$`) })
        .first()
        .isVisible();
    } catch (error) {
      console.log(`Error checking product in search results: ${error}`);
      return false;
    }
  }

  /**
   * Opens the product details page for the given product
   * @param productName - Product name to open
   * @returns Promise<ProductPage> - Instance of the product details page
   */
  async clickProduct(productName: string): Promise<ProductPage> {
    await this.page
      .locator("#content .product-layout h4 a")
      .filter({ hasText: new RegExp(`^${productName}$`) })
      .first()
      .click();
    return new ProductPage(this.page);
  }

  /**
   * Verifies the search results page is displayed
   * @returns Promise<boolean> - true if the search results page is displayed
   */
  async isSearchResultsPageExists(): Promise<boolean> {
    try {
      await this.heading.waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking search results page: ${error}`);
      return false;
    }
  }
}
