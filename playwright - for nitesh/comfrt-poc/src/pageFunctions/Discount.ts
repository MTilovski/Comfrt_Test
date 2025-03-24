import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import HomePageConstants from "framework/constants/HomePageConstants";
import HomePage from "../pages/HomePage";
import UIElementActions from "framework/actions/UIElementActions";
import AlertActions from "framework/actions/AlertActions";

import * as dotenv from "dotenv";
import Discount from "pages/Discount";
import { disconnect } from "process";
import SideCart from "pages/SideCart";
dotenv.config({ path: "playwright - for nitesh\\comfrt-poc\\.env" });



export default class DiscountFunctions {    
    private ui: UIActions;
    private ae: AlertActions;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
    }
    //  public async completeDiscountProcess(email: string, phone: string){
    //         await test.step('Click Sign Up footer button and complete the discount process', async() => {
    //             await this.page.locator(HomePage.SIGN_UP_FOOTER_BUTTON).scrollIntoViewIfNeeded();
    //             await this.page.locator(HomePage.SIGN_UP_FOOTER_BUTTON).click();
    //             await this.page.waitForTimeout(2000);
    //             await this.page.locator(Discount.PRETTY_COMFY_BUTTON).waitFor();
    //             await this.page.locator(Discount.PRETTY_COMFY_BUTTON).click();
    //             await this.page.locator(Discount.INPUT_EMAIL).fill(email);
    //             await this.page.locator(Discount.CLAIM_15).click();
    //             await this.page.locator(Discount.ACTIVATE_BUTTON).waitFor();
    //             await this.page.locator(Discount.INPUT_TEL).fill(phone);
    //             await this.page.locator(Discount.ACTIVATE_BUTTON).click()
    //             await this.page.locator(Discount.SHOP_NOW_BUTTON).waitFor();
    //             await this.page.locator(Discount.SHOP_NOW_BUTTON).click();
                
    //         });
    //     }   
    public async completeDiscountProcess(email: string, phone: string){
            await test.step('Click Sign Up footer button and complete the discount process', async() => {
            console.log(`Starting discount process for email: ${email}`);
            await this.page.locator(HomePage.SIGN_UP_FOOTER_BUTTON).scrollIntoViewIfNeeded();
            console.log('Scrolled to Sign Up footer button');
            await this.page.locator(HomePage.SIGN_UP_FOOTER_BUTTON).click();
            console.log('Clicked Sign Up footer button');
            await this.page.waitForTimeout(2000);
            await this.page.locator(Discount.PRETTY_COMFY_BUTTON).waitFor();
            console.log('Pretty Comfy button is visible');
            await this.page.locator(Discount.PRETTY_COMFY_BUTTON).click();
            console.log('Clicked Pretty Comfy button');
            await this.page.waitForTimeout(2000);
            await this.page.locator(Discount.INPUT_EMAIL).fill(email);
            console.log(`Filled email field with: ${email}`);
            await this.page.locator(Discount.CLAIM_15).click();
            console.log('Clicked Claim 15% button');
            await this.page.locator(Discount.ACTIVATE_BUTTON).waitFor();
            console.log('Activate button is visible');
            await this.page.locator(Discount.INPUT_TEL).fill(phone);
            console.log(`Filled phone field with: ${phone}`);
            await this.page.locator(Discount.ACTIVATE_BUTTON).click();
            await this.page.waitForTimeout(2000);
            console.log('Clicked Activate button');
            await this.page.locator(Discount.SHOP_NOW_BUTTON).waitFor();
            console.log('Shop Now button is visible');
            await this.page.locator(Discount.SHOP_NOW_BUTTON).click();
            await this.page.waitForTimeout(2000);
            console.log('Clicked Shop Now button');
            
        });
    }
    public async checkForDiscont(){
            await test.step('Click Sign Up footer button and complete the discount process', async() => {
            await this.page.locator(SideCart.CHECK_OUT_BUTTON).waitFor();
            const discount = await this.page.locator(SideCart.DISCOUNT_TEXT);
            const discountVisible = await discount.isVisible();
            if(discountVisible){
                console.log("The discount is present");
            }else{
                console.log("The discount is not presnet");
            }
        });
    }
    public async closeDiscount(){
        await test.step('Close the discount pop up', async() =>{
            await this.page.waitForTimeout(5000);
            await this.page.locator(Discount.CLOSE_BUTTON).waitFor();
            await this.page.locator(Discount.CLOSE_BUTTON).click();
        })
    }
}