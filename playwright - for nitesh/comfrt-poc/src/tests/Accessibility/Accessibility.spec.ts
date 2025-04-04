import { expect } from '@playwright/test';
import HomeFunctions from "pageFunctions/HomePage";
import test from '@playwright/test';
import PLPageFunctions from 'pageFunctions/PLPage';
import PDPFunctions from 'pageFunctions/PDPage';
import SideCartFunctions from 'pageFunctions/Sidecart';
import CheckOutFunctions from 'pageFunctions/CheckOut';
import Category from 'data/CategoryData';
import HoodieItems from 'data/HoodiesItems';
import Color from 'data/Colors';
import Size from 'data/Size';
import Credentials from 'data/Credentials';
import ShippingFunctions from 'pageFunctions/Shipping';
import Titles from 'data/Title';
import Helpers from 'resources/helpers';
import { fail } from 'assert';
import SweatpantsItems from 'data/SweatPantsItems';
import DiscountFunctions from 'pageFunctions/Discount';
import Paginations from 'data/Paginations';
import { createObjectCsvStringifier } from 'csv-writer';
import AccessibilityFunctions from 'pageFunctions/Accessibility';

let home: HomeFunctions;
let plp: PLPageFunctions;
let pdp: PDPFunctions;
let sidecart: SideCartFunctions;
let checkout: CheckOutFunctions;
let shipping: ShippingFunctions;
let helpers: Helpers;
let discount: DiscountFunctions;
let accessibility: AccessibilityFunctions;

const TEST_INTERVAL = 5000

test.beforeEach(async ({ page }) => {

    home = new HomeFunctions(page);  
    plp = new PLPageFunctions(page);
    pdp = new PDPFunctions(page);
    sidecart = new SideCartFunctions(page);
    checkout = new CheckOutFunctions(page);
    shipping = new ShippingFunctions(page);
    helpers = new Helpers(page);
    discount = new DiscountFunctions(page);
    accessibility = new AccessibilityFunctions(page);

    console.log('Waiting before starting next test...');
    await page.waitForTimeout(TEST_INTERVAL);
    console.log('Starting test now');

});
//  test('Accessibility evaluation', async ({ page }, testInfo) => {
//   await accessibility.acessibilityTestFunction1(Credentials.URL_HOMEPAGE, testInfo);
//    });

test('Accessibility evaluation HomePage', async ({ page }, testInfo) => {
  await accessibility.acessibilityTestFunction1(Credentials.URL_HOMEPAGE, testInfo);
  await accessibility.acessibilityTestFunction2(Credentials.URL_HOMEPAGE, testInfo);
});



 // npx playwright test comfrt-poc/src/tests/Accessibility/Accessibility.spec.ts --headed --reporter=html
 