import {Page, expect, chromium } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import PDPPageConstants from "framework/constants/PDPPageConstatnts";
import PDPage from "../pages/PDPage";
import { test } from '@playwright/test';

export default class PDPFunctions {
    private ui: UIActions;
    public discountText: string;
    public priceText: string;
    public itemPDPtitle: string;
    public itemTitleComparason: string;
    public PDPtitle: string;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    // Add Product to Cart
    public async selectCollor(Color: string) {
        let COLOR = `(//input[@value="${Color}"]/..)[1]`

        await test.step(`Select Item Color`, async () => {
            await this.page.waitForTimeout(200);
            await this.page.locator(COLOR).click();
        });
    }
    public async selectSize(Size: string) {
        let SIZE = `(//*[@value="${Size}"]/..)[1]`

        await test.step(`Select Item Size`, async () => {
            await this.page.locator(SIZE).click();
        });
    }

    public async addItemToCart(){
        await test.step('Add item to cart', async() => {
            await this.page.waitForTimeout(300);
            const AddToCart = await this.page.locator(PDPage.ADD_ITEM_TO_CART_BUTTON_MAIN).isVisible();
            const SoldOut = await this.page.locator(PDPage.SOULD_OUT).isVisible();

            if(AddToCart){
                await this.page.locator(PDPage.ADD_ITEM_TO_CART_BUTTON_MAIN).click();
            }else if(SoldOut){
                console.log('The item is sold out, the test is skiped');
                test.skip();
            }else{
                await console.log("Button is not present");
            }
        })
    }

    public async verifyItemTitle(){
        await test.step('Verify that the item title on PDP is present', async() => {
            await this.ui.element(PDPage.PRODUCT_TITLE,PDPPageConstants.CART_ITEM).waitForPresent();
            await console.log('Title is present')
        })
    }

    public async grabItemPrice() {
        await test.step('Verify that the item price is present and grab it', async () => {
            const priceLocator = this.page.locator(PDPage.PRODUCT_PRICE);
            const discountLocator = this.page.locator(PDPage.PRODUCT_DISCOUNTED_PRICE);
    
            const priceVisible = await priceLocator.isVisible();
            const discountVisible = await discountLocator.isVisible();

    
            if (discountVisible) {
                this.discountText = await discountLocator.textContent(); // Grab the discounted price text
                console.log('The item has a discount:', this.discountText);
                return this.discountText;
            } else if (priceVisible) {
                this.priceText = await priceLocator.textContent(); // Grab the regular price text
                console.log('The item does not have a discount:', this.priceText);
                return this.priceText;
            } else {
                console.log('The price is not visible');
            }
            
            
        });
    }
    public async verifyDynamicItemTitle(){
        await test.step('Verify the item title od PDP', async() => {
            await this.page.waitForTimeout(1000);
            await this.page.locator(PDPage.PRODUCT_TITLE).waitFor();
            await this.page.locator(PDPage.PRODUCT_TITLE).isVisible();
            this.itemPDPtitle = await this.page.locator(PDPage.PRODUCT_TITLE).textContent();
            await console.log('Item PDP title is', this.itemPDPtitle);
            return this.itemPDPtitle;
            
            
        });    
    }
    public async verifyItemDescription(){
        await test.step('Verify the item description', async() => {
            await this.page.locator(PDPage.PRODUCT_DESCRIPTION).waitFor();
            await this.page.locator(PDPage.PRODUCT_DESCRIPTION).isVisible();            
        });    
    }

    public async CompleteTheLook_Verification(){
        await test.step('Verify the item image, title, price, size, color in the complete the look section on PDP', async() => {
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_IMAGE_1).waitFor();
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_IMAGE_1).isVisible();
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_TITLE_1).isVisible(); 
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_PRICE_1).isVisible();    
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_SIZE_1).isVisible();   
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_COLOR_1).isVisible();                  
        });    
    } 
    public async CompleteTheLook_AddToCartVerification(){
        await test.step('Verify the item image, title, price, size, color in the complete the look section on PDP', async() => {
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_IMAGE_1).waitFor();
            await this.page.locator(PDPage.COMPLETE_THE_LOOK_IMAGE_1).isVisible();
        });
    }    
    public async addPreOrderToCart(){
        await test.step('Add Pre-Order to cart', async() => {
            await this.page.waitForTimeout(300);
            await this.page.locator(PDPage.ADD_PRE_ORDER_TO_CART_BUTTON).isVisible();
            await this.page.locator(PDPage.ADD_PRE_ORDER_TO_CART_BUTTON).click()
        });
    }
    public async addPreOrderToCartMobile(){
        await test.step('Add Pre-Order to cart', async() => {
            await this.page.waitForTimeout(300);
            await this.page.locator(PDPage.ADD_PRE_ORDER_TO_CART_MOBILE).isVisible();
            await this.page.locator(PDPage.ADD_PRE_ORDER_TO_CART_MOBILE).click()
        });
    }
}