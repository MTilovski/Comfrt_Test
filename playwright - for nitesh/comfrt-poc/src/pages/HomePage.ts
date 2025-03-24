export default class HomePage {
    static readonly HOME_PAGE_BANNER = '//*[@id="home_hero-shop-your-hoodie_0"]';
    static readonly SEARCH_BUTTON = '//*[@data-orly-handle="shop-your-hoodie"]';
    static readonly LOGO = '//*[@src="/fast-image/c_limit,w_200,fl_progressive:steep/comfrt/files/comfrt-logo.webp?v=1721338877"]';
    static readonly BANNER_BUTTON = '//button[contains(text(),"Shop Your Hoodie")]';
    static readonly ALL_COLLECTION_LINKS = '//*[@data-orly-type="main_menu_item_desktop"]/..';
    static readonly TICKER = '//header/div[1]'
    static readonly AMBASDOR_PROGRAM_TEXT = '//span[@data-pf-type="Text" and contains(text(),"The Comfrt ambassador program")]'
    static readonly SIGN_UP_FOOTER_BUTTON = '//button[contains(text(),"Sign Up Now")]';
    static readonly FAQ_TITLE_VERIFICATION = '//div[contains(text(),"FAQs")]';
    static readonly COMFRT_MINDSET_TEXT_VERIFICATION = '//p[contains(text(),"At Comfrt, we understand that caring for your mental")]';
    static readonly CONTACT_PAGE_TEXT_VERIFICATION = '//p[contains(text(),"For any questions, please contact our support team at ")]';
    static readonly RETURNS_EXCHANGE_TEXT = '//h2[contains(text(),"Returns and exchanges")]'
    static readonly BACK_TO_SHOP_BUTTON = '(//a[@class="shop-link"])[1]';
    static readonly MENU_TOGGLE = '//label[@for="menu-toggle"]';
}