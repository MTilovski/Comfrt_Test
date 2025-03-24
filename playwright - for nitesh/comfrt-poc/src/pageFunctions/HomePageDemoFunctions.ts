import { Page, expect, test } from "@playwright/test";
import HomePage from "../pages/HomePage";

export default class HomeFunctionsDemo { 
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async verifyHomePageBanner() {
        await test.step(`Verify the homepage banner`, async () => {
            const banner = this.page.locator(HomePage.HOME_PAGE_BANNER);
            await expect(banner).toBeVisible({ timeout: 10000 });
        });
    }
}