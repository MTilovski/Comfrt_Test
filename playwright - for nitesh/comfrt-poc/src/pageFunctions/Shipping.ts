import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import AlertActions from "framework/actions/AlertActions";
import Shipping from "pages/Shipping";


export default class ShippingFunctions {    
    private ui: UIActions;
    private ae: AlertActions;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
    }

    public async clickContinueToPayment(){
        await test.step('click the continue to payment button',async() =>{
           await this.ui.element(Shipping.CONTINUE_TO_PAYMENT_BUTTON,'continue to payment button').waitForPresent();
           await this.ui.element(Shipping.CONTINUE_TO_PAYMENT_BUTTON,'continue to payment button').click();
        });
    }

}