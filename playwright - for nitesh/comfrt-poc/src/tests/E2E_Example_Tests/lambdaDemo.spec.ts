// import HomeFunctionsDemo from "pageFunctions/HomePageDemoFunctions";
// import { test, expect, chromium } from "@playwright/test";

// let home: HomeFunctionsDemo;

// const capabilities = {
//     browserName: 'Chrome',
//     browserVersion: 'latest',
//     "LT:Options": {
//         platform: 'Windows 10',
//         build: 'LambdaTest Playwright Sample Test',
//         name: 'LambdaTest Playwright Sample Test 1',
//         user: 'martin.tilovski',
//         accessKey: 'Lsu9C6KGg34fRHqpx7gDkpHCCcpCozsCfsFeCgSDrNVz8gO3D1',
//         network: true,
//         video: true,
//         console: true,
//         visual: true,
//         tunnel: false,
//     }
// };

// test.beforeEach(async ({ page }) => {
//     // Initialize the HomeFunctionsDemo class with the page object passed from Playwright
//     home = new HomeFunctionsDemo(page);
// });

// test('LambdaTest Playwright Sample Test', async () => {
//     // Connect to LambdaTest using Playwright's WebSocket endpoint
//     const browser = await chromium.connect({
//         wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
//     });

//     const page = await browser.newPage();
//     await page.goto('https://comfrt.com/?__orly_origin=qa-bento-stage');

//     // Verify homepage banner using the function
//     await home.verifyHomePageBanner();

//     // Close the browser after verification
//     await browser.close();
// });

// npx playwright test comfrt-poc/src/tests/E2E_Example_Tests/lambdaDemo.spec.ts --headed --reporter=html

import HomeFunctionsDemo from "pageFunctions/HomePageDemoFunctions";
import { test, expect, chromium } from "@playwright/test";

const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    "LT:Options": {
        platform: 'Windows 10',
        build: 'LambdaTest Playwright Sample Test',
        name: 'LambdaTest Playwright Sample Test 1',
        user: 'martin.tilovski',
        accessKey: 'Lsu9C6KGg34fRHqpx7gDkpHCCcpCozsCfsFeCgSDrNVz8gO3D1',
        network: true,
        video: true,
        console: true,
        visual: true,
        tunnel: false,
    }
};

test('LambdaTest Playwright Sample Test', async () => {
    // Connect to LambdaTest using Playwright's WebSocket endpoint
    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });

    const page = await browser.newPage();
    const home = new HomeFunctionsDemo(page); 

    await page.goto('https://comfrt.com/?__orly_origin=qa-bento-stage');

    // Verify homepage banner using the function
    await home.verifyHomePageBanner();

    // Close the browser after verification
    await browser.close();
});