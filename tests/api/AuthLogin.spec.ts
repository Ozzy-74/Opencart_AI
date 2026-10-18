import { from } from "node:stream/iter";
import { test, expect } from "../../fixtures/pageFixtures";
test.describe("Auth api",() =>{
    test("Successful login should return 201", {tag: ["@api", "@master", "@regression"]}, async({authApi}) =>{
        //send POSTquest

         const response = await authApi.loginWithValidCredentials();

         expect(response.status()).toBe(201);
         const body = await response.json()

         expect(body).toHaveProperty("token");
    })
})