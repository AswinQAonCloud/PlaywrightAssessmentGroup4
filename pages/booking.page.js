import { expect } from '@playwright/test';
import { bookingLocators } from './locators/reservePage.locators.js';

export class BookingPage {
  constructor(page) {
    this.page = page;
  }

  extractAmount(text) {
    if (!text) return 0;
    return parseInt(text.replace(/[^\d]/g, ''), 10);
  }

  async hasBookingError() {
    return await bookingLocators
      .errorBox(this.page)
      .isVisible()
      .catch(() => false);
  }
  
  async getBookingErrorText() {
    return await bookingLocators.errorBox(this.page).innerText();
  }

  async expectBookingConfirmed() {
    const confirm = bookingLocators.confirmMsg(this.page);
    const errorBox = bookingLocators.errorBox(this.page);
  
    // Wait for either success OR error
    await Promise.race([
      confirm.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      errorBox.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
    ]);
  
    // If error appears → fail clearly
    if (await errorBox.isVisible().catch(() => false)) {
      const err = await errorBox.innerText();
      throw new Error(`Booking failed: ${err}`);
    }
  
    // Otherwise assert success
    await expect(confirm).toBeVisible();
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

  /**
   * @param {{ firstname: string, lastname: string, email: string, phone: string }} guest
   */
  async completeReservation(guest) {
    const first = bookingLocators.firstname(this.page);
    if (!(await first.isVisible().catch(() => false))) {
      await bookingLocators.reserveBtn(this.page).click();
    }
    await first.waitFor({ state: 'visible', timeout: 15_000 });
    await first.fill(guest.firstname);
    await bookingLocators.lastname(this.page).fill(guest.lastname);
    await bookingLocators.email(this.page).fill(guest.email);
    await bookingLocators.phone(this.page).fill(guest.phone);
    await bookingLocators.reserveBtn(this.page).click();
  }

  async expectBookingConfirmed() {
    await expect(bookingLocators.confirmMsg(this.page)).toBeVisible({ timeout: 15_000 });
  }

  async getBookingErrorText() {
    const box = bookingLocators.errorBox(this.page);
    await box.waitFor({ state: 'visible', timeout: 10_000 });
    return box.innerText();
  }

}