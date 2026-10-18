import "dotenv/config"
import { APIRequestContext, APIResponse } from "@playwright/test";
import { Routes } from "../api/endpoints/routes";
import process from "node:process";


export class AuthApiPage {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    //POST 
    async login(username: string, password: string): Promise<APIResponse> {
        return this.request.post(`${Routes.BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username, password
            }
        })
    }

    async loginWithValidCredentials(): Promise<APIResponse> {
        const username = process.env.API_USERNAME;
        const password = process.env.API_PASSWORD;

        if (!username || !password) {
            throw new Error("API_USERNAME and API_PASSWORD missing in .env file");

        }
        else {
            return this.login(username, password)
        }

    }
}
