import { homeLocators } from './locators/homePage.locators.js';

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async selectDates(checkin, checkout) {
    await homeLocators.checkin(this.page).fill(checkin);
    await homeLocators.checkout(this.page).fill(checkout);
  }

  async clickCheckAvailability() {
    await homeLocators.checkAvailabilityBtn(this.page).click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickBookNowByPrice(price) {
    const card = homeLocators.roomCardByPrice(this.page, price);
    await homeLocators.bookNowBtn(card).click();
  }

   roomCardByPriceText(price) {
    return this.page.locator('.card').filter({
      has: this.page.getByText(new RegExp(`£\\s*${price}(\\.00)?`)),
    });
  }

  async clickBookNowForRoomId(id) {
    const link = this.page
      .getByRole('link', { name: 'Book now' })
      .and(this.page.locator(`[href*="/reservation/${id}"]`))
      .first();
    await link.waitFor({ state: 'visible' });
    await link.click({ force: true });
  }

  //  Methods

  async goToAdmin() {
    await homeLocators.adminBtn(this.page).click();
  }

  async checkAvailability(checkin, checkout) {
    await homeLocators.checkin(this.page).fill(checkin);
    await homeLocators.checkout(this.page).fill(checkout);
    await homeLocators.checkAvailabilityBtn(this.page).click();
  }

  async selectRoom() {
    await homeLocators.bookNow(this.page).first().click();
  }

  async clickBookingMenu() {
    await homeLocators.bookingNavMenu(this.page).click();
  }

  async clickFirstBooking() {
    await this.page.getByRole('link', { name: 'Book now' }).first().click();
  }

  async clickreservenow() {
    await homeLocators.reservenow(this.page).click();
  }

  async clickreservenow() {
    await homeLocators.reservenow(this.page).click();
  }

  async getBookNowButtonByRoomId(roomId) {
    return this.page
      .getByRole('link', { name: 'Book now' })
      .and(this.page.locator(`[href*="/reservation/${roomId}"]`));
  }
  
  async isRoomAvailableById(roomId) {
    const locator = await this.getBookNowButtonByRoomId(roomId);
    return await locator.count();
  }


  async reservenow(data) {
    await homeLocators.firstNameInput(this.page).fill(data.firstname);
    await homeLocators.lastNameInput(this.page).fill(data.lastname);
    await homeLocators.emailInput(this.page).fill(data.email);
    await homeLocators.phoneInput(this.page).fill(data.phone);
    await homeLocators.reservenow(this.page).click();
  }
  //reserve error handle
  async validateBookingErrors(expectedErrors) {
    const errorBox = homeLocators.errorMessageContainer(this.page);
    await errorBox.waitFor(); // ensure visible
    const actualText = await errorBox.innerText();
    for (const error of expectedErrors) {
      if (!actualText.includes(error)) {
        throw new Error(`Expected error not found: ${error}`);
      }
    }
  }

  //confirm resevation
  async verifyMessageExists(name, subject) {
    await expect(
      homeLocators.messageRow(this.page, name, subject)
    ).toBeVisible();
  }

  async verifyMessageNotExists(name, subject) {
    await expect(
      homeLocators.messageRow(this.page, name, subject)
    ).toHaveCount(0);
  }

  async clickMyReservedRoom() {
    await homeLocators.myreservedRoom(this.page).click();
  }

   async isRoomAvailable(price) {
    return await homeLocators.roomCardByPrice(this.page, price).count();
  }

}