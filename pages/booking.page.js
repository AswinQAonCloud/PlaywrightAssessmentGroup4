import { bookingLocators } from './locators/reservePage.locators.js';

export class BookingPage {
  constructor(page) {
    this.page = page;
  }

  async reserve(data) {
    await bookingLocators.firstname(this.page).fill(data.firstname);
    await bookingLocators.lastname(this.page).fill(data.lastname);
    await bookingLocators.email(this.page).fill(data.email);
    await bookingLocators.phone(this.page).fill(data.phone);
    await bookingLocators.reserveBtn(this.page).click();
  }

  async getTotalPrice() {
    return await this.page.locator('text=Total').locator('..').textContent();
  }

  async validateError() {
    await this.page.waitForSelector('.alert-danger');
  }
}