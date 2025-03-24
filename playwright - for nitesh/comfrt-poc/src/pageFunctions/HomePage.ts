import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import HomePageConstants from "framework/constants/HomePageConstants";
import HomePage from "../pages/HomePage";
import UIElementActions from "framework/actions/UIElementActions";
import AlertActions from "framework/actions/AlertActions";
import * as dotenv from "dotenv";

dotenv.config({ path: "playwright - for nitesh\\comfrt-poc\\.env" });



export default class HomeFunctions {    
    private ui: UIActions;
    private ae: AlertActions;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
    }
    
    public async launchWebSite() {
        const { chromium } = require("playwright");
            await test.step(`Launching the web site`, async () => {
            await this.page.goto("https://comfrt.com/?__orly_origin=qa-bento-stage");
            await this.page.waitForTimeout(3000);
        });
    }
    public async launchWebSiteMobile() {
        const { chromium } = require("playwright");
            await test.step(`Launching the web site`, async () => {
            await this.page.setViewportSize({ width: 360, height: 740 });
            await this.page.goto("https://comfrt.com/?__orly_origin=qa-bento-stage");
            await this.page.waitForTimeout(3000);
        });
    }

    public async verifyHomePageBanner() {
        await test.step(`Verify the hompage banner`, async () => {
            await this.page.locator(HomePage.HOME_PAGE_BANNER).isVisible();
        });
    }

    //Close pop-up window on home page
    public async closePopUp(){
        await test.step(`Close Pop up window on Home Page`, async () => {
            await this.page.getByRole('button', { name: 'Close' }).click();
        });
    }

    //Click on search icon
    public async searchIcon(){
        await test.step(`Click on Home Page`, async () => {
            await this.ui.element(HomePage.SEARCH_BUTTON, HomePageConstants.SEARCH_ICON).click();
        });
    }

    public async verifyLogo(){
        await test.step('verify that the logo is present', async() => {
            await this.ui.element(HomePage.LOGO,'verify logo').waitForPresent();
            await this.ui.element(HomePage.LOGO,'click logo').click();
            await this.ui.element(HomePage.BANNER_BUTTON,'verify user is still on homepage').waitForPresent();
        });
    }
    public async selectCategoryMobile(categoryName: string, subCategoryName: string){
        await test.step('Select mobile category',async() => {
            let category = `(//div[@id="menu-default"]//*[contains(text(),"${categoryName}")])[1]`;
            let subCategory = `(//a[@class="menuItemLink" and contains(text(),"${subCategoryName}")])[1]`;
            await this.page.locator(HomePage.MENU_TOGGLE).isVisible();
            await this.page.locator(HomePage.MENU_TOGGLE).click();
            await this.page.locator(category).click();
            const subCategoryLocator = this.page.locator(subCategory);
            const hasSubcategory = await subCategoryLocator.isVisible();
            await this.page.waitForTimeout(300);
            if(hasSubcategory){
                await this.page.locator(subCategory).click();
            }
            
        })
    }
    public async navigateToCategory(collectionName: string){
        let COLLECTION_MENU = `//*[@data-orly-type="main_menu_item_desktop" and contains(text(),'${collectionName}')]`
        //let COLLECTION_MENU = `//*[@href="/collections/${collectionName}"]` 
        await test.step('Navigate to a category', async () => {
            await this.page.locator(COLLECTION_MENU).waitFor();
            await this.page.locator(COLLECTION_MENU).click();
        });     
    } 
    public async clickBannerButton(){
        await test.step('Navigate to a category', async () => {
            await this.page.locator(HomePage.BANNER_BUTTON).waitFor();
            await this.page.locator(HomePage.BANNER_BUTTON).click();
         });
    }
    public async selectRandomCategory(number: number){
        await test.step('Selecting a random category', async() =>{
        let RANDPM_CATEGORY = `(//*[@data-orly-type="main_menu_item_desktop"])[${number}]`;
        await this.page.locator(RANDPM_CATEGORY).click();
        const grabTitle = await this.page.locator(RANDPM_CATEGORY).textContent();
        await console.log(grabTitle);
        return grabTitle;

        });
    }
    public async verifyCollectionLinks(){
        await test.step('verify all collection links', async() => {
            const collectionLink = await this.page.locator(HomePage.ALL_COLLECTION_LINKS);
            const collectionLinkPresent = await collectionLink.isVisible()
            if(collectionLinkPresent){
                console.log("The collection links are present")
            }else{
                console.log("The collection links are not present")
            }  
        });
    }
    public async collectionLinkNavigation(collectionTitle: string){
        await test.step('verify that all collection links work properly and navigate to homepage', async() => {
            let COLLETION_LINK = `//*[@data-orly-type="main_menu_item_desktop"and contains(text(),"${collectionTitle}")]`;
            let COLLECTION_TITLE = `(//h1[contains(text(),"${collectionTitle}")])[1]`;
            await this.ui.element(HomePage.ALL_COLLECTION_LINKS,'wait for collection links').waitForPresent();
            await this.page.locator(COLLETION_LINK).click();
            await this.page.waitForTimeout(2000);
            const PageTitles = await this.page.locator(COLLECTION_TITLE);
            const collectionTitleVisible = await PageTitles.isVisible();
            if(collectionTitleVisible){
                await console.log (collectionTitle,"collection link works properly")
            }else{
                await console.log (collectionTitle,"collection link does not work properly")
            }
        });
    }
    public async verifyTicker(){
        await test.step('verify that the Ticker is present', async() => {
            await this.ui.element(HomePage.TICKER,'verify logo').waitForPresent();
        });
    }   
    
    public async verifyAmbassadorProgram(){
        await test.step('verify Ambasador Program', async() => {
            await this.page.waitForTimeout(500);
            const ambassador = await this.page.locator(HomePage.AMBASDOR_PROGRAM_TEXT);
            const ambassadorVisable = await ambassador.isVisible();
            if(ambassadorVisable){
                await console.log("The ambassador program page is workingg properly")
            }else{
                await console.log("This page is not working properly")
            }
        });
    } 

    public async checkLinks(linkTitle: string){
        await test.step('Check if the links in the footer are wirling properly', async() => {
            let link = `//a[contains(text(),"${linkTitle}")]`;
            let pageTitle = `//h1[contains(text(),"${linkTitle}")]`
            await this.page.locator(link).scrollIntoViewIfNeeded();
            await this.page.locator(link).isVisible();
            await this.page.locator(link).click();
            await this.page.locator(pageTitle).waitFor();
            await this.page.locator(pageTitle).isVisible();
            await console.log(linkTitle, "Link works properly")
            await this.page.locator(HomePage.LOGO).scrollIntoViewIfNeeded();
            await this.page.locator(HomePage.LOGO).click();

        });
    } 
    public async checkFAQLinks(linkTitle: string){
        await test.step('Check if the links in the footer are wirling properly', async() => {
            let link = `//a[contains(text(),"${linkTitle}")]`;
            await this.page.locator(link).scrollIntoViewIfNeeded();
            await this.page.locator(link).click();
            await this.page.locator(HomePage.FAQ_TITLE_VERIFICATION).waitFor();
            await this.page.locator(HomePage.FAQ_TITLE_VERIFICATION).isVisible();
            await this.page.locator(HomePage.LOGO).scrollIntoViewIfNeeded();
            await console.log(linkTitle, "Link works properly");
            await this.page.locator(HomePage.LOGO).click();
            await this.page.waitForTimeout(500);
        });
    } 
    public async checkMindsetLinks(linkTitle: string){
        await test.step('Check if the links in the footer are wirling properly', async() => {
            let link = `//a[contains(text(),"${linkTitle}")]`;
            await this.page.locator(link).scrollIntoViewIfNeeded();
            await this.page.locator(link).click();
            await this.page.locator(HomePage.COMFRT_MINDSET_TEXT_VERIFICATION).waitFor();
            await this.page.locator(HomePage.COMFRT_MINDSET_TEXT_VERIFICATION).isVisible();
            await this.page.locator(HomePage.LOGO).scrollIntoViewIfNeeded();
            await console.log(linkTitle, "Link works properly");
            await this.page.locator(HomePage.LOGO).click();
            await this.page.waitForTimeout(500);
        });
    } 
    public async checkContactLinks(linkTitle: string){
        await test.step('Check if the links in the footer are wirling properly', async() => {
            let link = `//a[contains(text(),"${linkTitle}")]`;
            await this.page.locator(link).scrollIntoViewIfNeeded();
            await this.page.locator(link).click();
            await this.page.locator(HomePage.CONTACT_PAGE_TEXT_VERIFICATION).waitFor();
            await this.page.locator(HomePage.CONTACT_PAGE_TEXT_VERIFICATION).isVisible();
            await this.page.locator(HomePage.LOGO).scrollIntoViewIfNeeded();
            await console.log(linkTitle, "Link works properly")
            await this.page.locator(HomePage.LOGO).click();
            await this.page.waitForTimeout(500);
        });
    } 
    public async checkExchangestLinks(linkTitle: string){
        await test.step('Check if the links in the footer are wirling properly', async() => {
            let link = `//a[contains(text(),"${linkTitle}")]`;
            await this.page.locator(link).scrollIntoViewIfNeeded();
            await this.page.locator(link).click();
            await this.page.locator(HomePage.RETURNS_EXCHANGE_TEXT).waitFor();
            await this.page.locator(HomePage.RETURNS_EXCHANGE_TEXT).isVisible();
            await console.log(linkTitle, "Link works properly")
            await this.page.locator(HomePage.BACK_TO_SHOP_BUTTON).click();
            await this.page.waitForTimeout(500);
        });
    } 

}

