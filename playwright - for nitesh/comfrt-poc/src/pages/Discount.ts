export default class Discount {    
    static readonly PRETTY_COMFY_BUTTON = '(//button[@type="button"])[1]';
    static readonly SUPER_COMFY_BUTTON = '//button[contains(text(),"super comfy!")]';
    static readonly INPUT_EMAIL = '//input[@placeholder="Your email address"]';
    static readonly CLAIM_15 = '(//button[@type="submit"])[1]';
    static readonly INPUT_TEL = '//input[@type="tel"]';
    static readonly ACTIVATE_BUTTON = '(//button[@type="submit"])[1]';
    static readonly SHOP_NOW_BUTTON = '//*[contains(text(),"Shop now")]';
    static readonly CLOSE_BUTTON = '//div[@role="button"]';
}