import test, { Page, expect } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import AlertActions from "framework/actions/AlertActions";
import PLPage from "pages/PLPage";
import { createObjectCsvWriter } from "csv-writer";

export default class Helpers {  
    private ui: UIActions;
    private ae: AlertActions;
    public item1Name: string;
    public fromatedPrice: any;
    public priceMatch: boolean;
    public titleMatch: boolean;
    public elementMatch: boolean;
    public randomCategoty: string;

    public getPage(): Page {
            return this.page;
        }
    
        constructor(private page: Page) {
            this.ui = new UIActions(page);
            this.ae = new AlertActions(page);
        }
    /**
     * fromatPrice
     */

    public formatPrice(price1: any) {
        price1 = parseFloat(price1.replace('$',''));

        if(price1 % 1 === 0){
            return price1.toString()
        }
       // console.log('od helpers',price1);
    }  
     
    public comparePrices(price1:any, price2: any){
        console.log('PDP price is ', price1,'Checkout price is ', price2)
        if(price1 === price2){
            return this.priceMatch = true;
        }
        else{
            throw new Error('NO match');
        }
    }
     /**
     * generateRandomNumber
     * Generates a random number between a minimum and maximum value (inclusive)
     * @param min The minimum value for the random number
     * @param max The maximum value for the random number
     * @returns A random number between min and max (inclusive)
     */
     public generateRandomNumberforCategory(min: number, max: number): number {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`Generated random number: ${randomNumber}`);
        return randomNumber;
    }

     /**
     * generateRandomNumber
     * Generates a random number between a minimum and maximum value (inclusive)
     * @param min The minimum value for the random number
     * @param max The maximum value for the random number
     * @returns A random number between min and max (inclusive)
     */
     public generateRandomNumberforItem(min: number, max: number): number {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`Generated random number: ${randomNumber}`);
        return randomNumber;
    }

      /**
     * generateRandomNumber
     * Generates a random number between a minimum and maximum value (inclusive)
     * @param min The minimum value for the random number
     * @param max The maximum value for the random number
     * @returns A random number between min and max (inclusive)
     */
      public generateRandomNumberforColor(min: number, max: number): number {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(`Generated random number: ${randomNumber}`);
        return randomNumber;
    }

    public  compareItemTitles(pdpItemTitle:string, plpItemTitle:string){
        if(pdpItemTitle === plpItemTitle){
         console.log('The titles are maching');
         return this.titleMatch = true;
        }else{
            throw new Error('NO match');
        }   
       
    }

    public async writeTextToCSV(textExtract: string, csvPath: string) {
        try {
            await this.page.locator(textExtract).waitFor()
            const text = await this.page.locator(textExtract).textContent();
            const csvWriter = createObjectCsvWriter({
                path: `${csvPath}`,
                header: [
                    { id: 'Text', title: 'Text' },
                ],
                append: true,
            });
            await csvWriter.writeRecords([{ text }]);
            console.log('Text written to CSV successfully.');
        } catch (error) {
            console.error('Error writing text to CSV:', error);
        }
    }

    public async compare(productElement1 : string, productElement2: string, elementName: string) {
        if(productElement1 === productElement2){
            console.log('The', elementName, 'is matching');
            return this.elementMatch = true;

        }
        else{
        
                throw new Error('NO match');
            }
        }

        public async selectFromList(){
        const categories = [
            'Shop All',
            'SWEATPANTS',
            'TSHIRTS',
            'JACKETS',
            'SHORTS',
            'ACCESSORIES',
            'FOOTWEAR',
            'DRESSES',
            'MENSWEAR',
            'WOMENSWEAR'
        ];
    
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];  
        console.log('kategorija: ',randomCategory);
        this.randomCategoty = randomCategory
        return randomCategory
    }        
}
