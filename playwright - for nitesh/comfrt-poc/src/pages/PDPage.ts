export default class PDPage {
    static readonly ADD_ITEM_TO_CART_BUTTON_MAIN = '//button[@type="submit"]/div[contains(text(),"In-Stock: Ready to Ship")]';
    static readonly ADD_PRE_ORDER_TO_CART_BUTTON = '//*[contains(text(),"Add Pre-Order to Cart")]';
    static readonly CHECKOUT = '//button[text()="Checkout"]';
    static readonly PRODUCT_TITLE = '//*[contains(@id, "product_hero_title")]/h1';
    static readonly PRODUCT_DISCOUNTED_PRICE = '(//*[contains(@id, "product_hero_price")]/div/h2/span)[2]'; // This locator is for items that HAVE a discount price
    static readonly PRODUCT_PRICE = '(//*[contains(@id, "product_hero_price")]/div/h2/span)[1]';  //This locator is forunt products that DO NOT HAVE a discount price
    static readonly SOULD_OUT = '//button[@type="submit"]/span[contains(text(),"Sold Out")]';
    static readonly PRODUCT_DESCRIPTION = '//*[@id="product_hero_add_to_cart_button-default-product-hero-add-to-cart-button_5_rc"]/../div[5]'
    static readonly COMPLETE_THE_LOOK_TITLE = '//*[contains(text(),"Complete The Look")]'
    static readonly COMPLETE_THE_LOOK_IMAGE_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/a/img)[1]'
    static readonly COMPLETE_THE_LOOK_IMAGE_2 = '(//*[contains(text(),"Complete The Look")]/../div/div/a/img)[2]'
    static readonly COMPLETE_THE_LOOK_TITLE_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/a)[2]'
    static readonly COMPLETE_THE_LOOK_TITLE_2 = '(//*[contains(text(),"Complete The Look")]/../div/div/a)[4]'
    static readonly COMPLETE_THE_LOOK_PRICE_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/div/h2)[1]'
    static readonly COMPLETE_THE_LOOK_PRICE_2 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/div/h2)[2]'
    static readonly COMPLETE_THE_LOOK_COLOR_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/fieldset/div/label[@for="Color"])[1]'
    static readonly COMPLETE_THE_LOOK_SIZE_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/fieldset/div/label[@for="Size"])[1]'
    static readonly COMPLETE_THE_LOOK_ADD_TO_CART_BUTTON_1 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/form)[1]'
    static readonly COMPLETE_THE_LOOK_ADD_TO_CART_BUTTON_2 = '(//*[contains(text(),"Complete The Look")]/../div/div/div/form)[2]'



}