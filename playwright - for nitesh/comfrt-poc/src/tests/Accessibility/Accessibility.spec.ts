import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

test('example with attachment', async ({ page }, testInfo) => {
    await page.goto('https://comfrt.com/?__orly_origin=qa-bento-stage');
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });

 // npx playwright test comfrt-poc/src/tests/Accessibility/Accessibility.spec.ts --headed 
 