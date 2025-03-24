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

let home: HomeFunctions;
let plp: PLPageFunctions;
let pdp: PDPFunctions;
let sidecart: SideCartFunctions;
let checkout: CheckOutFunctions;
let shipping: ShippingFunctions;
let helpers: Helpers;
let discount: DiscountFunctions;

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

    console.log('Waiting before starting next test...');
    await page.waitForTimeout(TEST_INTERVAL);
    console.log('Starting test now');

});

test('Validate product details_web', async ({page}) => {
    test.slow();
    // Navigate to Home Page     
        await home.launchWebSite();
        await discount.closeDiscount()
    // Navigate to any category and select an item   
        await home.selectRandomCategory(helpers.generateRandomNumberforCategory(1,8));   
        await plp.selectRandomItem(helpers.generateRandomNumberforItem(1,3));
    // Validate that the product has a title and a short description
        await pdp.verifyItemTitle();
        await pdp.verifyItemDescription();
    });

test('Validate UpSell Product_web', async ({page}) => {
    test.slow();
    // Navigate to PDP     
        await home.launchWebSite();
        await discount.closeDiscount()
        await home.selectRandomCategory(helpers.generateRandomNumberforCategory(1,8));   
        await plp.selectRandomItem(helpers.generateRandomNumberforItem(1,3));
    // Navigate to Complete The Look section
    // Validate the following details are correct in Complete The Look section for UpSell products:
        // Product Image        
        // Product name
        // Price
        // Size
        // Color
        await pdp.CompleteTheLook_Verification()
        // Alignment of 'Add to Cart' button
        await pdp.CompleteTheLook_AddToCartVerification() 
    });

test('Purchase single product And Validate breadcrumb on checkout page_web', async ({page}) => {
    test.slow();
    // Navigate to page    
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify the home page banner and logo    
        await home.verifyHomePageBanner();
        await home.verifyLogo();
    // Navigate to a specific category  
        await home.navigateToCategory(Category.HOODIES);
        await plp.verifyPLPTitle(Titles.HOODEIS);                                                 
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
        const item1title = pdp.itemPDPtitle
        await sidecart.clickCheckOutButton();
    // Navigate to checkout     
        await checkout.grabItemValueFromCheckout(item1title);
    //Validate first Item  
        await helpers.compare(sidecart.title_sidecart1,checkout.title_checkout,'Title');
    // await helpers.compare(sidecart.size_sidecart,checkout.size_checkout,'size and color');   a change | and \
        await helpers.compare(sidecart.price_sidecart1,checkout.price_checkout,'price');
        await helpers.compare(sidecart.value1,checkout.qty_checkout,'qty');
    });

test('Purchase 2 products_web', async ({page}) => {
    test.slow();
    // Navigate to page    
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify the home page banner and logo    
        await home.verifyHomePageBanner();
        await home.verifyLogo();
    // Navigate to a specific category    
        await home.navigateToCategory(Category.HOODIES);
        await plp.verifyPLPTitle(Titles.HOODEIS);                                                 
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
        const item1title = pdp.itemPDPtitle
    // Close the sidecart    
        await sidecart.closeSideCart();
    // navigate to a different category    
        await home.navigateToCategory(Category.SWEATPANTS);
        await plp.verifyPLPTitle(Titles.SWEATPANTS);
    // Select an item and specs    
        await plp.selectItem(SweatpantsItems.SSL_SWEATPANTS);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.BARK);
        await pdp.selectSize(Size.MEDIUM);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart2(pdp.itemPDPtitle);
        const item2title = pdp.itemPDPtitle
        await sidecart.clickCheckOutButton();
    // Navigate to checkout     
        await checkout.grabItemValueFromCheckout(item1title);
    //Validate first Item  
        await helpers.compare(sidecart.title_sidecart1,checkout.title_checkout,'Title');
    // await helpers.compare(sidecart.size_sidecart,checkout.size_checkout,'size and color');   a change | and \
        await helpers.compare(sidecart.price_sidecart1,checkout.price_checkout,'price');
        await helpers.compare(sidecart.value1,checkout.qty_checkout,'qty');
    // Compare item info from sidecart  
        await checkout.grabItemValueFromCheckout(item2title);
    //Validate Second Item 
        await helpers.compare(sidecart.title_sidecart2,checkout.title_checkout,'Title');
    // await helpers.compare(sidecart.size_sidecart,checkout.size_checkout,'size and color');    a change | and \
        await helpers.compare(sidecart.price_sidecart2,checkout.price_checkout,'price');
        await helpers.compare(sidecart.value2,checkout.qty_checkout,'qty');
    });

test('Purchase product after updating qty_web', async ({page}) => {
    test.slow();
    // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify the home page banner and logo    
        await home.verifyHomePageBanner();
        await home.verifyLogo();
    // Navigate to a specific category    
        await home.navigateToCategory(Category.HOODIES);
        await plp.verifyPLPTitle(Titles.HOODEIS);                                                 
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.increaseItemQty();
        await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
        await sidecart.grabSubtotalSidecartPrice();
        const item1title = pdp.itemPDPtitle
        await sidecart.increaseItemQty
    // Navigate to checkout     
        await sidecart.clickCheckOutButton();     
        await checkout.grabItemValueFromCheckout(item1title);
    // Validate    
        await helpers.compare(sidecart.title_sidecart1,checkout.title_checkout,'Title');
    // await helpers.compare(sidecart.size_sidecart1,checkout.size_checkout,'size and color');
        await helpers.compare(sidecart.subtotal,checkout.price_checkout,'price');
        await helpers.compare(sidecart.value1,checkout.qty_checkout,'qty');
    });

test('Remove the only item from the side cart and validate the product purchase process is disabled_web', async ({page}) => {
    test.slow();
    // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify the home page banner and logo    
        await home.verifyHomePageBanner();
        await home.verifyLogo();
    // Navigate to a specific category    
        await home.navigateToCategory(Category.HOODIES);
        await plp.verifyPLPTitle(Titles.HOODEIS);                                                 
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
        await sidecart.removeItem();
        await sidecart.verifySidecartNumber('0');
    });

test('Remove one of the items from the side cart and validate the product purchase process_web', async ({page}) => {
    test.slow();
    // Navigate to page    
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify the home page banner and logo    
        await home.verifyHomePageBanner();
        await home.verifyLogo();
    // Navigate to a specific category    
        await home.navigateToCategory(Category.HOODIES);
        await plp.verifyPLPTitle(Titles.HOODEIS);                                                 
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart1(pdp.itemPDPtitle);
        const item1title = pdp.itemPDPtitle
    // Close the sidecart    
        await sidecart.closeSideCart();
    // navigate to a different category    
        await home.navigateToCategory(Category.SWEATPANTS);
        await plp.verifyPLPTitle(Titles.SWEATPANTS);
    // Select an item and specs    
        await plp.selectItem(SweatpantsItems.SSL_SWEATPANTS);
    // Site navigates to PLP 
        await pdp.verifyDynamicItemTitle();
        await pdp.selectCollor(Color.BARK);
        await pdp.selectSize(Size.MEDIUM);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await sidecart.verifyItemsInCart2(pdp.itemPDPtitle);
        const item2title = pdp.itemPDPtitle
        await sidecart.removeItem()
        await sidecart.verifySidecartNumber('1');
    // Navigate to checkout page    
        await sidecart.clickCheckOutButton()
        await checkout.grabItemValueFromCheckout(item1title);
    // Compare results for the items    
        await helpers.compare(sidecart.title_sidecart1,checkout.title_checkout,'Title');
       // await helpers.compare(sidecart.size_sidecart1,checkout.size_checkout,'size and color');       // difference between / and |
        await helpers.compare(sidecart.price_sidecart1,checkout.price_checkout,'price');
       // await helpers.compare(sidecart.value1,checkout.qty_checkout,'qty');                  // Problem with qty is the shipping protection rout
    });

test('Validate Header_web', async ({page}) => {
    test.slow();
     // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify collection links     
        await home.verifyCollectionLinks();
        await home.collectionLinkNavigation('All');
        await home.collectionLinkNavigation('Hoodies');
        await home.collectionLinkNavigation('Sweatpants');
        await home.collectionLinkNavigation('Kids');
        await home.collectionLinkNavigation('Loungewear');
        await home.collectionLinkNavigation('Blankets');
        await home.collectionLinkNavigation('Pets');
    // Verify Side Cart    
        await sidecart.openSideCart();
        await sidecart.closeSideCart();
    // Verify Ticker    
        await home.verifyTicker();
    });

test('Validate AMBASSADOR program_web', async ({page}) => {
    test.slow();
    // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
    // Navigate and verify Ambassador program     
        await home.navigateToCategory(Category.AMBASSADOR_PROGRAM);
        await home.verifyAmbassadorProgram();
    });

test('Verify that Sign up now button works_web', async ({page}) => {
    test.slow();
    // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
        await discount.completeDiscountProcess(`test4@local.com`,Credentials.PHONE);
        await home.navigateToCategory(Category.HOODIES);                                              
    // Select an item and specs    
        await plp.selectItem(HoodieItems.CLOUD_ZIP_HOODIE);
        await pdp.selectCollor(Color.SNOW);
        await pdp.selectSize(Size.LARGE);
    // Add item to cart and click checkout button    
        await pdp.addItemToCart();
        await page.waitForTimeout(1000);
        await discount.checkForDiscont();
        console.log('Discount process completed successfully');
    });
    
test('Verify the Footer menu links_web', async ({page}) => {
    test.slow();
    // Navigate to page       
        await home.launchWebSite();
        await discount.closeDiscount()
    // Verify links under "About Us"    
        await home.checkMindsetLinks('Comfrt Mindset');
        await home.checkFAQLinks('FAQ');
        await home.checkLinks('Resources')
        await home.checkContactLinks('Contact');
    // Verify links under "Help"   
        await home.checkLinks('Privacy Policy')
        await home.checkLinks('Terms of Service')
        await home.checkLinks('Pre-Order')
        await home.checkLinks('Refund Policy')
        await home.checkLinks('Pricing Policy')
        await home.checkExchangestLinks('Exchanges')
    // Verify links under "Social"   
    //  await home.checkLinks('Instagram')
    //  await home.checkLinks('TikTok')
    });   
    /*
    Run individual tests
    
        .. npx playwright test --grep "Verify the Footer menu links_web" --headed

    Run the test

        .. npx playwright test comfrt-poc/src/tests/Regression/COMFRT_Regression.spec.ts --headed --reporter=junit > results.xml
    
        Set the testmo token

        .. $env:TESTMO_TOKEN="testmo_api_eyJpdiI6Inp4S05xMnRwdytjdE9RaGh6eUg3bUE9PSIsInZhbHVlIjoibitQeUFRa1NXd0R2QkYvUXVtWjllUDY2NmM1eUNieC9VcGVKSjNTNlR1dz0iLCJtYWMiOiI5MGJkZWMyOWFiM2U2ZDQ5OGEzMTBkMjVmMTFmMDI3OTA2NTkwMGVkOWE2ZGU2ZmU0YzQzMWY0OTMyNWQ5YWI1IiwidGFnIjoiIn0="
     
    Convert the .xml file in UTF-8

        .. Get-Content "D:\Outsmartly\playwright_COMFRT_Dynamic\results.xml" |
          Set-Content -Encoding utf8 "D:\Outsmartly\playwright_COMFRT_Dynamic\results_fixed.xml"

    Integrate with testmo 

        .. testmo automation:run:submit `
       --instance https://outsmartly.testmo.net `
       --project-id 1 `
       --name "Regression Suit 1" `
       --source "Playwright" `
       --results "D:\Outsmartly\playwright_COMFRT_Dynamic\results_fixed.xml" 

    */