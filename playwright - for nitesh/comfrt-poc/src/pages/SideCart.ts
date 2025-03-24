export default class SideCart {
    static readonly SIDE_CART_ICON = '//label[@id="cart-icon-bubble"]';
    static readonly CHECK_OUT_BUTTON = '//div[contains(@id,"checkout_button-checkout_button")]';
    static readonly CONTINUE_SHOPPING_BUTTON = '//*[@id="cart_continue_shopping_button-cart_continue_shopping_button_2"]';
    static readonly SHOP_PAY_BUTTON = '//*[@id="shop_pay_checkout_button-shop_pay_checkout_button_3"]';
    static readonly ITEMS_IN_CART = '//*[@id="cart_items-cart_items_1"]';
    static readonly CLOSE_SIDECART = '//div[contains(text(),"YOUR COZY SHOPPING BAG")]/../label';
    static readonly INCREASE_QTY_SIDECART = '(//form[contains(@action,"/cart/change?")])[2]';
    static readonly DECREASE_QTY_SIDECART = '(//form[contains(@action,"/cart/change?")])[1]';
    static readonly REMOVE_ITEM_SIDECART = '(//form[contains(@action,"/cart/change?")])[3]';
    static readonly SIDE_CART_QTY = '(//*[@id="cart_subtotals-cart_subtotals_0"]/div/div)[1]';
    static readonly SICE_CART_SUBTOTAL = '(//*[@id="cart_subtotals-cart_subtotals_0"]/div/div)[2]/div';
    static readonly REMOVE_SHIPPINH_PROTECTION = '//*[contains(text(),"Shipping Protection")]/../../div/form';
    static readonly DISCOUNT_TEXT = '//p[contains(text(),"WELCOME15")]';

}