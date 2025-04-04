import { Page, expect, test } from "@playwright/test";
import HomePage from "../pages/HomePage";

export default class AccessibilityFunctions { 
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async acessibilityTestFunction1(URL: string, testInfo) {
        await test.step(`Accessibility test function for missing elements`, async () => {
            await this.page.goto(URL);
            
              const elementsReport = await this.page.evaluate(() => {
                const elements = [];
                let counter = 1;
            
                const getAccessibleName = (el) => {
                  return (
                    el.getAttribute('aria-label') ||
                    el.getAttribute('placeholder') ||
                    el.textContent.trim() ||
                    '*NO ACCESSIBLE NAME*'
                  );
                };
            
            
                const createMarker = (el, number) => {
                  const marker = document.createElement('div');
                  marker.textContent = number;
                  marker.style.position = 'absolute';
                  marker.style.background = 'yellow';
                  marker.style.color = 'black';
                  marker.style.border = '1px solid black';
                  marker.style.borderRadius = '50%';
                  marker.style.width = '20px';
                  marker.style.height = '20px';
                  marker.style.display = 'flex';
                  marker.style.alignItems = 'center';
                  marker.style.justifyContent = 'center';
                  marker.style.fontSize = '12px';
                  marker.style.zIndex = '1000'; 
            
                  const rect = el.getBoundingClientRect();
                  const markerLeft = rect.left + window.scrollX + rect.width / 2 - 10; // Center horizontally
                  const markerTop = rect.top + window.scrollY - 25; // Place above the element
            
                  marker.style.left = `${Math.max(markerLeft, 0)}px`;
                  marker.style.top = `${Math.max(markerTop, 0)}px`;
            
                  document.body.appendChild(marker);
                };
            
                const navigableSelectors = [
                  'a', // Links
                  'button', // Buttons
                  'input', // Input elements
                  'select', // Select dropdowns
                  'textarea', // Textareas
                  '[role="button"]', // ARIA button roles
                  '[role="link"]', // ARIA link roles
                  '[role="checkbox"]', // ARIA checkboxes
                  '[role="radio"]', // ARIA radio buttons
                ];
            
                navigableSelectors.forEach((selector) => {
                  document.querySelectorAll(selector).forEach((el) => {
                    // Get the accessible name for each element
                    const accessibleName = getAccessibleName(el);
            
                    if (accessibleName === '*NO ACCESSIBLE NAME*') {
                      (el as HTMLElement).style.outline = '3px solid red'; // Highlight missing accessible name
                    }
                    createMarker(el, counter); // Add marker to all valid elements
            
                    elements.push({
                      id: counter,
                      role: el.getAttribute('role') || el.tagName,
                      accessibleName,
                      html: el.outerHTML,
                    });
                    counter++;
                  });
                });
            
                return elements;
              });
            
              console.log('Accessibility Evaluation Report:');
              elementsReport.forEach((element) => {
                console.log(`${element.id}. Role: ${element.role}`);
                console.log(`   Accessible Name: ${element.accessibleName}`);
                console.log(`   HTML: ${element.html}`);
              });
            
              const fs = require('fs');
              fs.writeFileSync('accessibility-report.json', JSON.stringify(elementsReport, null, 2));
              console.log('Report saved as accessibility-report.json');
            
              const screenshotPath = 'screenshots/accessibility-violations-full-page.png';
              await this.page.screenshot({ path: screenshotPath, fullPage: true }); // Full page screenshot
            
              testInfo.attachments.push({
                name: 'Accessibility Screenshot - Filtered Full Page',
                path: screenshotPath,
                contentType: 'image/png',
              });
        });
    }

    public async acessibilityTestFunction2(URL: string, testInfo) {
        await test.step(`Accessibility test function for missing elements`, async () => {
            await this.page.goto(URL);
                 await this.page.evaluate(() => {
           const createSymbol = (el, symbol, color, description, offset) => {
            const marker = document.createElement('div');
            marker.textContent = symbol;
            marker.title = description;
            marker.style.position = 'absolute';
            marker.style.background = color;
            marker.style.color = 'white';
            marker.style.border = '1px solid black';
            marker.style.borderRadius = '50%';
            marker.style.width = '20px';
            marker.style.height = '20px';
            marker.style.display = 'flex';
            marker.style.alignItems = 'center';
            marker.style.justifyContent = 'center';
            marker.style.fontSize = '12px';
            marker.style.zIndex = '1000';
            
            const rect = el.getBoundingClientRect();
            const markerLeft = rect.left + window.scrollX + rect.width / 2 - 10;
            const markerTop = rect.top + window.scrollY - 25 + offset;
            
            marker.style.left = `${Math.max(markerLeft, 0)}px`;
            marker.style.top = `${Math.max(markerTop, 0)}px`;
            
            document.body.appendChild(marker);
        };

        const navigableSelectors = [
            'a', 'button', 'input', 'select', 'textarea',
            '[role="button"]', '[role="link"]', 
            '[role="checkbox"]', '[role="radio"]',
        ];
        
        navigableSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                const accessibleName = el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.textContent.trim() || '*NO ACCESSIBLE NAME*';
                let offset = 0;

                if (accessibleName === '*NO ACCESSIBLE NAME*') {
                    createSymbol(el, 'E', 'red', 'Error: Missing accessible name', offset);
                    offset += 30;
                } else {
                    createSymbol(el, '✓', 'green', 'Accessible element', offset);
                }
            });
        });
    });

    const screenshotPath = 'screenshots/accessibility-violations-full-page-with-updated-symbols.png';
    await this.page.screenshot({ path: screenshotPath, fullPage: true });

    testInfo.attachments.push({
        name: 'Accessibility Screenshot - Full Page with Updated Symbols',
        path: screenshotPath,
        contentType: 'image/png',
    });

    console.log('Screenshot of the full page with updated symbols saved.');
    });
}}