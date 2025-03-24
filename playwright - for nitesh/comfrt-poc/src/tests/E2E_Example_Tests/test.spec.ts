import { expect } from '@playwright/test';
import HomeFunctions from "pageFunctions/HomePage";
import test from '@playwright/test';
import PLPageFunctions from 'pageFunctions/PLPage';
import PDPFunctions from 'pageFunctions/PDPage';
import SideCartFunctions from 'pageFunctions/Sidecart';
import CheckOutFunctions from 'pageFunctions/CheckOut';
import Category from 'data/CategoryData';
import ShippingFunctions from 'pageFunctions/Shipping';
import Titles from 'data/Title';
import Helpers from 'resources/helpers';
import PLPage from 'pages/PLPage';
import { fail } from 'assert';

let home: HomeFunctions;
let plp: PLPageFunctions;
let pdp: PDPFunctions;
let sidecart: SideCartFunctions;
let checkout: CheckOutFunctions;
let shipping: ShippingFunctions;
let helpers: Helpers;

test.beforeEach(async ({ page }) => {

    home = new HomeFunctions(page);  
    plp = new PLPageFunctions(page);
    pdp = new PDPFunctions(page);
    sidecart = new SideCartFunctions(page);
    checkout = new CheckOutFunctions(page);
    shipping = new ShippingFunctions(page);
    helpers = new Helpers(page);

});

test('Complete Shopping Journey - Static test', async ({page}) => {
 // Navigate to page    
    await home.launchWebSite();
// Verify the home page banner and logo    
    await home.verifyHomePageBanner();
    await home.verifyLogo();
// Navigate to a specific category    
    await home.navigateToCategory(Category.HOODIES);
    await plp.verifyPLPTitle(Titles.HOODEIS);
    await helpers.writeTextToCSV(PLPage.MAIN_TITLE,'category_title_store.csv');
});    

// npx playwright test comfrt-poc/src/tests/E2E_Example_Tests/test.spec.ts --headed --reporter=html