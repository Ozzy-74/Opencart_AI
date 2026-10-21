import { test as base } from "@playwright/test";
import dotenv from "dotenv";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { AccountSuccessPage } from "../pages/AccountSuccessPage";
import { LogoutPage } from "../pages/LogoutPage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { AuthApiPage } from "../pages/AuthApiPage";
dotenv.config();

const APP_URL = process.env.WEB_APP_URL || "http://localhost/opencart/upload/";

type PageFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  accountSuccessPage: AccountSuccessPage;
  logoutPage: LogoutPage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
  shoppingCartPage: ShoppingCartPage;
};

type ApiFixtures ={
  authApi : AuthApiPage;
};

export const test = base.extend<PageFixtures & ApiFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto(APP_URL!);
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountSuccessPage: async ({ page }, use) => {
    await use(new AccountSuccessPage(page));
  },
  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  authApi : async({request},use)=>{
    await use(new AuthApiPage(request));
  },
});


test.afterEach(async ({ page, context }) => {
  if (!page.isClosed()) {
    await page.close();
  }
  await context.close();
});


export { expect } from "@playwright/test";
