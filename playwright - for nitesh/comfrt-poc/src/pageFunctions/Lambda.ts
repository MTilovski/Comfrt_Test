import test, { Page, expect,chromium } from "@playwright/test";
import UIActions from "framework/actions/UIActions";
import AlertActions from "framework/actions/AlertActions";
import Shipping from "pages/Shipping";


export default class LambdaFunctions {    
    private ui: UIActions;
    private ae: AlertActions;
    public browser: any;

    public getPage(): Page {
        return this.page;
    }

    constructor(private page: Page) {
        this.ui = new UIActions(page);
        this.ae = new AlertActions(page);
    }

        public async lambdaTestSetUp() {
            const capabilities = {
                'browserName': 'Chrome',
                'browserVersion': 'latest',
                'LT:Options': {
                    'platform': 'Windows 10',
                    'build': 'Playwright Sample Build',
                    'name': 'Playwright Sample Test',
                    'user': 'martin.tilovski',
                    'accessKey': 'Lsu9C6KGg34fRHqpx7gDkpHCCcpCozsCfsFeCgSDrNVz8gO3D1',
                    'network': true,
                    'video': true,
                    'console': true,
                    'smartUI': true,
                    'visual': true,
                }
            };
            const browser = await chromium.connect({
                wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                    JSON.stringify(capabilities)
                )}`,
            }); 
            this.browser = browser; 
            return  browser
           // const page = await browser.newPage(); 
        }

}