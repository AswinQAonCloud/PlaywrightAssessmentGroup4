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
    const roomCard = homeLocators.roomCard(this.page).filter({
      has: this.page.locator(`text=£${price}`)
    });

    await roomCard
      .locator('a', { hasText: 'Book now' })
      .click();
  }

}