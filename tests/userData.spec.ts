import { expect, test } from "@playwright/test";
import { allure } from "allure-playwright";

import Chance from 'chance';
const chance = new Chance();

test.describe('Test user controller', () => {
    test.describe.configure({ mode: 'serial' });

    let _id : String;
    const limit = 10;

    test('Get list user', async ({ request, baseURL }) => {
        allure.parameter("limit", String(limit));

        const _response = await request.get(`${baseURL}/user`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            params: {
                limit
            }
        });
        
        const responseData = await _response.json();
        console.log(responseData);

        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });

    test('Get user by id', async ({ request, baseURL }) => {
        const id = "60d0fe4f5311236168a109de";

        allure.parameter("id", String(id));

        const _response = await request.get(`${baseURL}/user/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        const responseData = await _response.json();
        console.log(responseData);

        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
    });    

    test('Create user', async ({ request, baseURL }) => {
        const firstName = "Im";
        const lastName = "Tester";
        const email = chance.email({domain: "example.com"});

        allure.parameter("firstName", String(firstName)); 
        allure.parameter("lastName", String(lastName)); 
        allure.parameter("email", String(email)); 

        const _response = await request.post(`${baseURL}/user/create`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                firstName,
                lastName,
                email
            }
        });

        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
        
        const responseData = await _response.json();
        console.log(responseData);

        _id = responseData.id;
    });
    
    test('Update user', async ({ request, baseURL }) => {
        const lastName = "Tester Updated";

        allure.parameter("id", String(_id));
        allure.parameter("lastName", String(lastName));

        const _response = await request.put(`${baseURL}/user/${_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                lastName
            }
        });

        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
        
        const responseData = await _response.json();
        console.log(responseData);
    });
    
    test('Delete user', async ({ request, baseURL }) => {
        allure.parameter("id", String(_id));

        const _response = await request.delete(`${baseURL}/user/${_id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        expect(_response.status()).toBe(200);
        expect(_response.ok()).toBeTruthy();
        
        const responseData = await _response.json();
        console.log(responseData);
    });
});
