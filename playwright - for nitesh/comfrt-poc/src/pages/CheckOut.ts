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

}