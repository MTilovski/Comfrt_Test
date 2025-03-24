import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import AlertActions from "framework/actions/AlertActions";
import SideCart from "pages/SideCart";
import { createObjectCsvStringifier, createObjectCsvWriter } from "csv-writer";


export default class SideCartFunctions {    
    private ui: UIActions;
    private ae: AlertActions;
    public title_sidecart1: string;
    public size_sidecart1: string;
    public price_sidecart1: string;
    public discount_sidecart1: string;
    public value1: any;
    public title_sidecart2: string;
    public size_sidecart2: string;
    public price_sidecart2: string;
    public discount_sidecart2: string;
    public value2: any;
    public number: string;
    public subtotal: string;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
    } 

    public async clickCheckOutButton(){
        await test.step('Click the checkout button', async() =>{
        await this.ui.element(SideCart.CHECK_OUT_BUTTON,'Click the checkout button').waitForPresent();
        await this.ui.element(SideCart.CHECK_OUT_BUTTON,'Click the checkout button').click();
        })
    } 
    public async openSideCart(){
        await test.step('Verify and open the sidecart',async() =>{
            await this.ui.element(SideCart.SIDE_CART_ICON,'verify the sidecart').waitForPresent();
            await this.ui.element(SideCart.SIDE_CART_ICON,'verify the sidecart').click();
        
        })
    }
    

    public async closeSideCart(){
        await test.step('Close the sidecart',async() =>{
            await this.ui.element(SideCart.CLOSE_SIDECART,'close the sidecart').click();
        
        })
    }
    public async verifyItemsInCart1(itemTitle: string){
        await test.step('Verify that itemas are present in the cart', async() =>{
        let ITEM_SIZE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../p`;
        let ITEM_IMAGE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../../../a`;
        let ITEM_TITLE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]`;
        let ITEM_PRICE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../div/p[1]`;
        let ITEM_DISCOUNT_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../div/p[2]`;
        let ITEM_QTY_SIDECART =`//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../..//input[contains(@type,"text")]`;
        await this.ui.element(SideCart.ITEMS_IN_CART,'verify that item is present in cart').waitForPresent();    
        await this.page.locator(ITEM_IMAGE_SIDECART).isVisible();
        await this.page.waitForTimeout(2000);
    // Grab item title    
        await this.page.locator(ITEM_TITLE_SIDECART).isVisible();
        const title_sidecart1 = await this.page.locator(ITEM_TITLE_SIDECART).textContent();
        this.title_sidecart1 = title_sidecart1;
        console.log('title for', itemTitle ,'in sidecart is: ',title_sidecart1);   
    // Grab item size    
        await this.page.locator(ITEM_SIZE_SIDECART).isVisible();
        const size_sidecart1 = await this.page.locator(ITEM_SIZE_SIDECART).textContent();
        this.size_sidecart1 = size_sidecart1;
        console.log('size for', itemTitle ,' item in sidecart is: ',size_sidecart1);
    // Grab item price    
        await this.page.locator(ITEM_PRICE_SIDECART).isVisible();
        const price_sidecart1 = await this.page.locator(ITEM_PRICE_SIDECART).textContent();
        this.price_sidecart1 = price_sidecart1;
        console.log('price for', itemTitle ,' item in sidecart is: ',price_sidecart1);
    // Grab item discount price    
        await this.page.locator(ITEM_DISCOUNT_SIDECART).isVisible();
        const discount_sidecart1 = await this.page.locator(ITEM_DISCOUNT_SIDECART).textContent(); 
        this.discount_sidecart1 = discount_sidecart1;
        console.log('discount for', itemTitle ,' item in sidecart is: ',discount_sidecart1);
    // Grab item quantity    
        await this.page.locator(ITEM_QTY_SIDECART).isVisible();
        const inputElement = await this.page.locator(ITEM_QTY_SIDECART); // Select the input element
    // Use inputValue() to get the value of the quantity field
        const value1 = await inputElement.inputValue(); // Fetch the current value of the input field
        this.value1 = value1;
        console.log('Quantity for', itemTitle, 'in sidecart is: ', value1

        );
        return {
            title_sidecart1,
            size_sidecart1,
            price_sidecart1,
            discount_sidecart1,
            value1
        }.toString()
      });
    } 
    public async verifyItemsInCart2(itemTitle: string){
        await test.step('Verify that itemas are present in the cart', async() =>{
        let ITEM_SIZE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../p`;
        let ITEM_IMAGE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../../../a`;
        let ITEM_TITLE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]`;
        let ITEM_PRICE_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../div/p[1]`;
        let ITEM_DISCOUNT_SIDECART = `//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../div/p[2]`;
        let ITEM_QTY_SIDECART =`//div[contains(@id,"cart_items-cart_items")]//a[contains(text(),"${itemTitle}")]/../..//input[contains(@type,"text")]`;
        await this.ui.element(SideCart.ITEMS_IN_CART,'verify that item is present in cart').waitForPresent();    
        await this.page.locator(ITEM_IMAGE_SIDECART).isVisible();
        await this.page.waitForTimeout(2000);
    // Grab item title    
        await this.page.locator(ITEM_TITLE_SIDECART).isVisible();
        const title_sidecart2 = await this.page.locator(ITEM_TITLE_SIDECART).textContent();
        this.title_sidecart2 = title_sidecart2;
        console.log('title for', itemTitle ,'in sidecart is: ',title_sidecart2);   
    // Grab item size    
        await this.page.locator(ITEM_SIZE_SIDECART).isVisible();
        const size_sidecart2 = await this.page.locator(ITEM_SIZE_SIDECART).textContent();
        this.size_sidecart2 = size_sidecart2;
        console.log('size for', itemTitle ,' item in sidecart is: ',size_sidecart2);
    // Grab item price    
        await this.page.locator(ITEM_PRICE_SIDECART).isVisible();
        const price_sidecart2 = await this.page.locator(ITEM_PRICE_SIDECART).textContent();
        this.price_sidecart2 = price_sidecart2;
        console.log('price for', itemTitle ,' item in sidecart is: ',price_sidecart2);
    // Grab item discount price    
        await this.page.locator(ITEM_DISCOUNT_SIDECART).isVisible();
        const discount_sidecart2 = await this.page.locator(ITEM_DISCOUNT_SIDECART).textContent(); 
        this.discount_sidecart2 = discount_sidecart2;
        console.log('discount for', itemTitle ,' item in sidecart is: ',discount_sidecart2);
    // Grab item quantity    
        await this.page.locator(ITEM_QTY_SIDECART).isVisible();
        const inputElement = await this.page.locator(ITEM_QTY_SIDECART); // Select the input element
    // Use inputValue() to get the value of the quantity field
        const value2 = await inputElement.inputValue(); // Fetch the current value of the input field
        this.value2 = value2;
        console.log('Quantity for', itemTitle, 'in sidecart is: ', value2

        );
        return {
            title_sidecart2,
            size_sidecart2,
            price_sidecart2,
            discount_sidecart2,
            value2
        }.toString()
      });
    } 
    
    public async increaseItemQty (){
        await test.step('Increase Item QTY', async() =>{
        await this.ui.element(SideCart.INCREASE_QTY_SIDECART,'wait for button').waitForPresent();
        await this.ui.element(SideCart.INCREASE_QTY_SIDECART,'Click the (+) button').click();
        })
    } 

    public async decreaseItemQty (){
        await test.step('decrease item QTY', async() =>{
        await this.ui.element(SideCart.INCREASE_QTY_SIDECART,'wait for button').waitForPresent();
        await this.ui.element(SideCart.INCREASE_QTY_SIDECART,'Click the (-) button').click();
        })
    } 

    public async removeItem (){
        await test.step('REmove item from sidecart', async() =>{
        await this.ui.element(SideCart.REMOVE_ITEM_SIDECART,'wait for button').waitForPresent();
        await this.ui.element(SideCart.REMOVE_ITEM_SIDECART,'Click the remove button').click();
        })
    } 
    public async verifySidecartNumber (NM: string){
        await test.step('Verify number of items in sidecart', async() =>{
        await this.page.waitForTimeout(2000);    
        await this.page.locator(SideCart.SIDE_CART_QTY).waitFor();
        const number = await this.page.locator(SideCart.SIDE_CART_QTY).textContent();
        this.number = number;
        await console.log('The side cart number quantity is ', number )

            if(number === `Subtotal (${NM} item)`){
                console.log('The number is correct');
            }else{
        
                    throw new Error('The number is not correct');
                 
            }
        })

    }
    public async grabSubtotalSidecartPrice(){
        await test.step('Grab the subtotal price from the sidecart', async() =>{
        await this.ui.element(SideCart.SICE_CART_SUBTOTAL,'subtotal price').waitForPresent();
        const subtotal = await this.page.locator(SideCart.SICE_CART_SUBTOTAL,).textContent();
        this.subtotal = subtotal
        await console.log("the subtotal price is",subtotal);
        return subtotal

        })
    }
    public async removePackageProtection(){
        await test.step('Remove the package protection rout', async() =>{
        const protection = await this.page.locator(SideCart.REMOVE_SHIPPINH_PROTECTION);
        const protectionVisable = await protection.isVisible();
        if(protectionVisable){
            await this.page.locator(SideCart.REMOVE_SHIPPINH_PROTECTION).waitFor();
            await this.page.locator(SideCart.REMOVE_SHIPPINH_PROTECTION).click();
        }else{
            await this.page.locator(SideCart.CHECK_OUT_BUTTON).waitFor();
        }
        await this.page.waitForTimeout(3000);
        })
    }
}
