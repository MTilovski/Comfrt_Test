import { expect } from '@playwright/test';
import HomeFunctions from "pageFunctions/HomePage";
import PLPageFunctions from 'pageFunctions/PLPage';
import PDPFunctions from 'pageFunctions/PDPage';
import SideCartFunctions from 'pageFunctions/Sidecart';
import CheckOutFunctions from 'pageFunctions/CheckOut';
import Credentials from 'data/Credentials';
import ShippingFunctions from 'pageFunctions/Shipping';
import Helpers from 'resources/helpers';
import test from '@playwright/test';

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

test('Complete Shopping Journey - Dynamic test', async ({page}) => {
    // Navigate to page    
       await home.launchWebSite();
   // Verify the home page banner and logo    
       await home.verifyHomePageBanner();
       await home.verifyLogo();
   // Navigate to a specific category    
       await home.selectRandomCategory(helpers.generateRandomNumberforCategory(1,8));
       await plp.verifyDynamicPLPTitle();
       //await plp.verifyItemsOnPLP();                                                 No locators are present 
   // Select an item and specs    
       await plp.selectRandomItem(helpers.generateRandomNumberforItem(1,3));
   // Site navigates to PLP 
       await pdp.verifyDynamicItemTitle();
       await pdp.grabItemPrice();
       await helpers.compareItemTitles(plp.item1Name,pdp.itemPDPtitle);
   // Add item to cart and click checkout button    
       await pdp.addItemToCart();
       await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
       const item1title = pdp.itemPDPtitle
       await sidecart.clickCheckOutButton();
       await checkout.grabItemValueFromCheckout(item1title);
    //Validate first Item  
       await helpers.compare(sidecart.title_sidecart1,checkout.title_checkout,'Title');
       // await helpers.compare(sidecart.size_sidecart,checkout.size_checkout,'size and color');   a change | and \
       await helpers.compare(sidecart.price_sidecart1,checkout.price_checkout,'price');
       await helpers.compare(sidecart.value1,checkout.qty_checkout,'qty');
   // Insert Email, Country/Region, First name, Last name, Adress, City, Postcode, Phone number
       await checkout.fillCredentials(Credentials.EMAIL,Credentials.COUNTRY,Credentials.FIRST_NAME,Credentials.LAST_NAME,Credentials.ADDRESS,Credentials.CITY,Credentials.ZIP,Credentials.PHONE);
       await checkout.clickContinueToShippingButton();
       await page.waitForTimeout(500);
      // await shipping.clickContinueToPayment();                             // Unclickable button
      
    });
   
   //run test - npx playwright test comfrt-poc/src/tests/E2E_Example_Tests/E2E_DynamicTest.spec.ts --headed --reporter=html
   // cnage remote origin -  git remote set-url origin <new-repository-url>
