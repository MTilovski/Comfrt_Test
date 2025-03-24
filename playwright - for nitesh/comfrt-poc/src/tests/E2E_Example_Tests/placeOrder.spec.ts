import { expect, test } from '@playwright/test';
import HomeFunctions from "pageFunctions/HomePage";
import PLPageFunctions from 'pageFunctions/PLPage';
import PDPFunctions from 'pageFunctions/PDPage';
import SideCartFunctions from 'pageFunctions/Sidecart';
import CheckOutFunctions from 'pageFunctions/CheckOut';
import Category from 'data/CategoryData';
import HoodieItems from 'data/HoodiesItems';
import Color from 'data/Colors';
import Size from 'data/Size';
import Credentials from 'data/Credentials';

let home: HomeFunctions;
let plp: PLPageFunctions
let pdp: PDPFunctions
let sidecart: SideCartFunctions
let checkout: CheckOutFunctions

test.beforeEach(async ({ page }) => {

    home = new HomeFunctions(page);  
    plp = new PLPageFunctions(page);
    pdp = new PDPFunctions(page);
    sidecart = new SideCartFunctions(page);
    checkout = new CheckOutFunctions(page)

});

test('Complete Shopping Journey', async ({page}) => {
 // Navigate to page    
    await home.launchWebSite();
// Verify the home page banner and logo    
    await home.verifyHomePageBanner();
    await home.verifyLogo();
// Navigate to a specific category    
    await home.navigateToCategory(Category.HOODIES);
// Select an item and specs    
    await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    await pdp.selectCollor(Color.SNOW);
    await pdp.selectSize(Size.LARGE);
// Add item to cart and click checkout button    
    await pdp.addItemToCart();
   // await sidecart.verifyItemsInCart();
    await sidecart.clickCheckOutButton();
// Insert Email, Country/Region, First name, Last name, Adress, City, Postcode, Phone number
    await checkout.fillCredentials(Credentials.EMAIL,Credentials.COUNTRY,Credentials.FIRST_NAME,Credentials.LAST_NAME,Credentials.ADDRESS,Credentials.CITY,Credentials.ZIP,Credentials.PHONE);
    await checkout.clickContinueToShippingButton();


})
