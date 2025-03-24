import { test, expect, chromium } from "@playwright/test";
import smartuiSnapshot from "@lambdatest/playwright-driver"

test('LambdaTest Playwright Sample Test', async () => {
  // Set up LambdaTest capabilities
  const capabilities = {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': 'Playwright Sample Test',
      'user': 'martin.tilovski',
      'accessKey': 'Lsu9C6KGg34fRHqpx7gDkpHCCcpCozsCfsFeCgSDrNVz8gO3D1',
      'network': true,
      'video': true,
      'console': true,
      'smartUI': true,
      'visual': true,
      'smartUIProjectName': 'Comfrt_SmartUI_test'
    }
  };

  // Connect to LambdaTest using Playwright's WebSocket endpoint
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  });

  // Create a new page and navigate to the website
  const page = await browser.newPage();
  await page.goto('https://comfrt.com/');

  // Wait for the image element to be visible and clickable
  const element = page.locator('xpath=//*[@src="/fast-image/c_limit,w_200,fl_progressive:steep/comfrt/files/comfrt-logo.webp?v=1721338877"]');
  await element.waitFor({ state: 'visible' });  // Ensures element is present
  await element.click();  // Click the element
  await page.evaluate((_) => {},
  `lambdatest_action: ${JSON.stringify({
   action: 'smartui.takeScreenshot',
   arguments: {
   fullPage: true,
   screenshotName: 'HomePage SS'
   }
})}`)

  
  // Add any further assertions here if needed
  await expect(page).toHaveURL('https://comfrt.com/'); // Example assertion for URL change

  // Close the browser
  await browser.close();
});


// npx playwright test comfrt-poc/src/tests/SmartUI_Demo.spec.ts --headed
