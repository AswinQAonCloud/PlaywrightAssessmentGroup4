import { adminLocators } from './locators/adminPage.locators.js';

export class AdminPage {
  constructor(page) {
    this.page = page;
  }

  async createRoom(data) {
    await adminLocators.roomNumber(this.page).fill(data.roomNumber);
    await adminLocators.roomType(this.page).fill(data.type);
    await adminLocators.accessible(this.page).fill(data.accessible);
    await adminLocators.price(this.page).fill(data.price);
    await adminLocators.createBtn(this.page).click();
  }

  async validateError() {
    await this.page.waitForSelector('.alert-danger');
  }

  async goToFrontPage() {
    await adminLocators.frontPageBtn(this.page).click();
  }

  async openMessages() {
    await adminLocators.messageTab(this.page).click();
  }
}