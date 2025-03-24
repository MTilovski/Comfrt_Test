import { expect } from '@playwright/test';
import HomeFunctions from "pageFunctions/HomePage";
import { test } from "../../browserstack/fixture";
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

let home: HomeFunctions;
let plp: PLPageFunctions;
let pdp: PDPFunctions;
let sidecart: SideCartFunctions;
let checkout: CheckOutFunctions;
let shipping: ShippingFunctions;

test.beforeEach(async ({ page }) => {

    home = new HomeFunctions(page);  
    plp = new PLPageFunctions(page);
    pdp = new PDPFunctions(page);
    sidecart = new SideCartFunctions(page);
    checkout = new CheckOutFunctions(page);
    shipping = new ShippingFunctions(page);

});

test('Verify Homepage banner and button', async ({page}) => {
    // Navigate to page    
    await home.launchWebSite();
    // Verify the home page banner and logo    
    await home.verifyHomePageBanner();
    // Click banner button
    await home.clickBannerButton();
    await plp.getPage()

})

//test('Verify discount page')