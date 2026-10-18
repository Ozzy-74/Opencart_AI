/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @regression @web @end-to-end
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product, quantity, price and applicable cart total
 */

// using custom fixtures
import { test, expect } from "../../fixtures/pageFixtures";
import { RandomDataUtil } from "../../utils/dataGenerator";
import { Helper } from "../../utils/helper";
import { RowDataPacket } from "mysql2/promise";
import { executeQuery } from "../../utils/dbClient";

test("End-to-End Shopping Flow test @master @regression @web @e2e", async ({
  homePage,
  registerPage,
  accountSuccessPage,
  logoutPage,
  loginPage,
  myAccountPage,
  searchResultsPage,
  productPage,
  shoppingCartPage,
}) => {
  const registrationData = {
    firstName: RandomDataUtil.getFirstName(),
    lastName: RandomDataUtil.getLastName(),
    email: RandomDataUtil.getEmail(),
    telephone: RandomDataUtil.getPhoneNumber(),
    password: RandomDataUtil.getPassword(),
  };
  const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

  await test.step("1) Open the application", async () => {
    const isHomePageLoaded = await homePage.isHomePageExists();
    expect(isHomePageLoaded).toBeTruthy();
  });

  await test.step("2) Register a new customer using dynamically generated unique data", async () => {
    await homePage.clickRegister();
    const isRegisterPageLoaded = await registerPage.isRegisterPageExists();
    expect(isRegisterPageLoaded).toBeTruthy();
    await registerPage.completeRegistration(registrationData);
  });

  
  await test.step("3) Verify successful registration", async () => {
    const isRegistered = await accountSuccessPage.isAccountSuccessPageExists();
    expect(isRegistered).toBeTruthy();
    expect(await accountSuccessPage.getConfirmationHeading()).toContain("Your Account Has Been Created!");
  });

  // await test.step("4) verify new customer record in DB", async() =>{
  //   const [result] = await executeQuery("SELECT firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ?",[registrationData.email]);

  //   const rows = result as RowDataPacket[];
  //   expect(rows, "Exactly one customer record should exist").toHaveLength(1);

  //   const customer = rows[0];
  //   expect(customer.firstname).toBe(registrationData.firstName);
  //   expect(customer.lastname).toBe(registrationData.lastName);
  //   expect(customer.email.toLowerCase()).toBe(registrationData.email.toLowerCase());
  //   expect(Number(customer.status)).toBe(1); // use 0 if your store requires admin approval
  //   expect(customer.date_added).toBeTruthy();
 
  // })

  await test.step("5) Log out from the application", async () => {
    await homePage.clickLogout();
    const isLogoutPageLoaded = await logoutPage.isLogoutPageExists();
    expect(isLogoutPageLoaded).toBeTruthy();
    await logoutPage.clickContinue();
  });

  await test.step("6) Log in again using the newly created credentials", async () => {
    await homePage.clickLogin();
    const isLoginPageLoaded = await loginPage.isLoginPageExists();
    expect(isLoginPageLoaded).toBeTruthy();
    await loginPage.login(registrationData.email, registrationData.password);
  });

  await test.step("7) Verify successful authentication", async () => {
    const isAuthenticated = await myAccountPage.isMyAccountPageExists();
    expect(isAuthenticated).toBeTruthy();
  });

  await test.step("8) Search for a known product", async () => {
    await homePage.searchProduct(productName);
    const isSearchResultsLoaded = await searchResultsPage.isSearchResultsPageExists();
    expect(isSearchResultsLoaded).toBeTruthy();
    expect(await searchResultsPage.isProductVisible(productName)).toBeTruthy();
  });

  await test.step("9) Open the product details page", async () => {
    await searchResultsPage.clickProduct(productName);
    const isProductPageLoaded = await productPage.isProductPageExists();
    expect(isProductPageLoaded).toBeTruthy();
    expect(await productPage.getProductName()).toBe(productName);
    expect(await productPage.getProductPrice()).toBe(totalPrice);
  });

  await test.step("10) Add the product to the cart", async () => {
    await productPage.setQuantity(productQuantity);
    await productPage.addToCart();
    expect(await productPage.getAddToCartSuccessMessage()).toContain(productName);
  });

  await test.step("11) Open the shopping cart", async () => {
    await productPage.clickShoppingCart();
    const isShoppingCartLoaded = await shoppingCartPage.isShoppingCartPageExists();
    expect(isShoppingCartLoaded).toBeTruthy();
  });

  await test.step("12) Verify product, quantity, price and applicable cart total", async () => {
    expect(await shoppingCartPage.getProductName()).toBe(productName);
    expect(await shoppingCartPage.getQuantity()).toBe(productQuantity);
    expect(await shoppingCartPage.getUnitPrice()).toBe(totalPrice);
    expect(await shoppingCartPage.getCartTotal()).toBe(totalPrice);
  });

  console.log("✅ ✔️ End-to-End Shopping Flow completed successfully!");
});
