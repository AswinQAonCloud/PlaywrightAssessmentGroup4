import { homeLocators } from './locators/homePage.locators.js';

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goToAdmin() {
    await homeLocators.adminBtn(this.page).click();
  }

  async checkAvailability(checkin, checkout) {
    await homeLocators.checkin(this.page).fill(checkin);
    await homeLocators.checkout(this.page).fill(checkout);
    await homeLocators.checkAvailability(this.page).click();
  }

  async selectRoom() {
    await homeLocators.bookNow(this.page).first().click();
  }
}