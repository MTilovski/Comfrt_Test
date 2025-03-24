import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import UIElementActions from "framework/actions/UIElementActions";
import AlertActions from "framework/actions/AlertActions";

import * as dotenv from "dotenv";
import CheckOut from "pages/CheckOut";
dotenv.config({ path: "playwright - for nitesh\\comfrt-poc\\.env" });



export default class CheckOutFunctions {    
    private ui: UIActions;
    private ae: AlertActions;
    public itemPriceCheckOutPage: string;
    public title_checkout: string;
    public size_checkout: string;
    public price_checkout: string;
    public qty_checkout: string;


    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
        this.itemPriceCheckOutPage = this.itemPriceCheckOutPage;
    }
    public async fillCredentials(email: string, country: string, name: string, lastName:string, adress: string, city: string,
        zip: string, phone: string 
     ) {
            await test.step(`Fill in all required filds`, async () => {
                await this.page.locator(CheckOut.EMAIL_FIELD).fill(email) ;
                await this.page.locator(CheckOut.COUNTRY_DROPDOWN).selectOption({ value: country});
                await this.page.locator(CheckOut.FIRST_NAME_FIELD).fill(name);
                await this.page.locator(CheckOut.LAST_NAME_FIELD).fill(lastName);
                await this.page.locator(CheckOut.ADDRESS_FIELD).fill(adress);
                await this.page.locator(CheckOut.CITY_FIELD).fill(city);
                await this.page.locator(CheckOut.ZIP_FIELD).fill(zip);
                await this.page.locator(CheckOut.PHONE_FIELDS).fill(phone);

            });          
    }
    public async clickContinueToShippingButton(){
            await test.step('Clicking the Continue to shipping Button', async() => {
               await this.ui.element(CheckOut.CONTINUE_TO_SHIPPING_BUTTON,'Continue to shipping').waitForPresent();
               await this.ui.element(CheckOut.CONTINUE_TO_SHIPPING_BUTTON,'Continue to shipping').click();
            }); 

    }  
 
    public async grabCheckoutItemPrice(){
        await test.step('Verify that the item price is visable and grab the value', async() =>{
              this.itemPriceCheckOutPage = await this.page.locator(CheckOut.CHECKOUT_ITEM_PRICE).textContent();
              await console.log('the item price on the checkout page is', this.itemPriceCheckOutPage)
              return this.itemPriceCheckOutPage;
            });
    }  

    public async clickCart_BreadCrumbs(){
        await test.step('Verify and click the "Cart" button on the breadcrubs', async() =>{
            await this.page.locator(CheckOut.BREAD_CRUMBS_CART).waitFor();
            await this.page.locator(CheckOut.BREAD_CRUMBS_CART).click();
        });
    }
    public async clickOrderSummaryButton(){
        await test.step('Click the order summary button', async() =>{
            await this.page.locator(CheckOut.ORDER_SUMMARY).waitFor();
            await this.page.locator(CheckOut.ORDER_SUMMARY).click();
        });
    }
    public async grabItemValueFromCheckout(itemTitle: string ){
        await test.step('Verify that the item image is present and grab the data from the item', async() =>{
            let ITEM_TITLE_CHECKOUT = `(//p[contains(text(),"${itemTitle}")])[1]`;
            let ITEM_SIZE_CHECKOUT = `(//p[contains(text(),"${itemTitle}")]/../div/p)[1]`;
            let ITEM_IMAGE_CHECKOUT =  `(//p[contains(text(),"${itemTitle}")]/../../..//picture)[1]`;
            let ITEM_PRICE_CHECKOUT =  `(//p[contains(text(),"${itemTitle}")]/../../..//div/span)[4]`;
            let ITEM_QTY_CHECKOUT = `(//p[contains(text(),"${itemTitle}")]/../../..//span[2])[1]`
            await this.page.locator(ITEM_IMAGE_CHECKOUT).waitFor();
            await this.page.locator(ITEM_IMAGE_CHECKOUT).isVisible();
            console.log('Image is present');
        // Grab item title    
            await this.page.locator(ITEM_TITLE_CHECKOUT).isVisible();
            const title_checkout = await this.page.locator(ITEM_TITLE_CHECKOUT).textContent();
            this.title_checkout = title_checkout
            console.log('title for', itemTitle ,' item on checkout is: ',title_checkout);
        // Grab item size and color 
            await this.page.locator(ITEM_SIZE_CHECKOUT).isVisible();
            const size_checkout = await this.page.locator(ITEM_SIZE_CHECKOUT).textContent();
            this.size_checkout = size_checkout
            console.log('size for', itemTitle ,' item on checkout is: ',size_checkout);
        // Grab Item price    
            await this.page.locator(ITEM_PRICE_CHECKOUT).isVisible();
            const price_checkout= await this.page.locator(ITEM_PRICE_CHECKOUT).textContent();
            this.price_checkout = price_checkout
            console.log('price for', itemTitle ,' item on checkout is: ',price_checkout);
        // Grab Item qty
            await this.page.locator(ITEM_QTY_CHECKOUT).isVisible();
            const qty_checkout = await this.page.locator(ITEM_QTY_CHECKOUT).textContent(); 
            this.qty_checkout = qty_checkout
            console.log('qty for', itemTitle ,' item on checkout is: ',qty_checkout
                
            );  
            
            return {
                title_checkout,
                size_checkout,
                price_checkout,
                qty_checkout
            }.toString()
        });
    }  
}
