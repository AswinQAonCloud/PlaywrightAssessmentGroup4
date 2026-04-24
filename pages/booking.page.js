import { bookingLocators } from './locators/reservePage.locators.js';

export class BookingPage {
  constructor(page) {
    this.page = page;
  }

  extractAmount(text) {
    if (!text) return 0;
    return parseInt(text.replace(/[^\d]/g, ''), 10);
  }

  async getTotalAmount() {
    const text = await bookingLocators.total(this.page).textContent();
    return this.extractAmount(text);
  }

  async getNights() {
    await bookingLocators.priceSummarySection(this.page).waitFor({ state: 'visible', timeout: 6000 });
    const text = await bookingLocators.rateLine(this.page).textContent();
    const match = text.match(/x\s*(\d+)\s*nights?/i);
    if (!match) throw new Error(`Could not parse nights from: "${text}"`);
    return parseInt(match[1], 10);
  }

}