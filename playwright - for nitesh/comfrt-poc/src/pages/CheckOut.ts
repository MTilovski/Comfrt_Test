export default class CheckOut {

    static readonly EMAIL_FIELD = '//*[@id="email"]';
    static readonly COUNTRY_DROPDOWN = 'select[name="countryCode"]';
    static readonly FIRST_NAME_FIELD = '//*[@placeholder="First name"]';
    static readonly LAST_NAME_FIELD = '//*[@placeholder="Last name"]';
    static readonly ADDRESS_FIELD = '//*[@id="shipping-address1"]';
    static readonly CITY_FIELD = '//*[@placeholder="City"]';
    static readonly STATE_DROP_DOWN = '//*[@id="Select1"]';
    static readonly ZIP_FIELD = '*[placeholder="Postal code"]';
    static readonly PHONE_FIELDS = '//*[@placeholder="Phone"]';
    static readonly CONTINUE_TO_SHIPPING_BUTTON = '//*[@type="submit"]/span[contains(text(),"Continue to shipping")]';
    static readonly CHECKOUT_ITEM_PRICE = '(//div[@role="rowgroup"]//div[@role="row"]//div[@role="cell"][4]/div/span)[1]';
    static readonly BREAD_CRUMBS_CART = '//nav[@aria-label="Breadcrumb"]//*[contains(text(),"Cart")]'
    static readonly ORDER_SUMMARY = '//span[contains(text(),"Order summary")]';
    static readonly DISCOUNT_PAGE_FIELD_MOBILE = '(//input[@placeholder="Discount code or gift card"])[1]';
    static readonly DISCOUNT_PAGE_FIELD_WEB = '//input[@placeholder="Discount code or gift card"]';
    static readonly APPLY_BUTTON_WEB = '//*[@aria-label="Apply Discount Code"]';
    static readonly APPLY_BUTTON_MOBILE = '(//*[@aria-label="Apply Discount Code"])[1]';
    static readonly ERROR_MESSAGE_WEB = '//*[@id="error-for-ReductionsInput0" and contains(text(),"Enter a valid discount code or gift card")]';
    static readonly ERROR_MESSAGE_MOBILE = '//*[@id="error-for-ReductionsInput1" and contains(text(),"Enter a valid discount code or gift card")]';
    static readonly ORDER_DISCOUNT_ROW = '//div[@role="rowheader"]/span[contains(text(),"Order discount")]';
    static readonly ORDER_DISCOUNT_ROW_MOBILE ='(//div[@role="rowheader"]/span[contains(text(),"Order discount")])[1]';
    static readonly TOTAL_PRICE_WEB = '//*[contains(text(),"Total")]/../..//strong[contains(text(),"$")]';
    static readonly TOTAL_PRICE_MOBILE ='(//*[contains(text(),"Total")]/../..//strong[contains(text(),"$")])[1]';

}