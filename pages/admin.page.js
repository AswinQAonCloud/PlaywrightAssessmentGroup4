import { expect } from '@playwright/test';
import { adminLocators } from './locators/adminPage.locators.js';

export class AdminPage {
  constructor(page) {
    this.page = page;
  }

  async goToFrontPage() {
    await adminLocators.frontPageBtn(this.page).click();
  }

  // Aswin methods
  async deleteAllRooms() {
    while (true) {
      const deleteBtn = adminLocators.deleteButtons(this.page).first();
      const count = await adminLocators.deleteButtons(this.page).count();
      if (count === 0) break;
      const roomRow = adminLocators.roomRows(this.page).first();
      await deleteBtn.click();
      await roomRow.waitFor({ state: 'detached', timeout: 5000 });
    }
  }
  async createRoomAndValidate(data) {
    await adminLocators.roomNumber(this.page).fill(data.roomNumber);
    await adminLocators.roomType(this.page).selectOption(data.type);
    await adminLocators.accessible(this.page).selectOption(data.accessible);
    await adminLocators.price(this.page).fill(data.price);
    await adminLocators.createBtn(this.page).click();
    // Simple validation using room number
    await adminLocators.createdRoomRow(this.page, data.roomNumber).waitFor();
    await this.page.reload();
  }
  async validateRoomHomepage(price) {
    return adminLocators.homepageRoomPrice(this.page, price);
  }

  // prajna methods
  async verifyLogoutVisible() {
    await expect(
      adminLocators.logoutButton(this.page)
    ).toBeVisible();
  }
  async createRoom(data) {
    await adminLocators.roomNumber(this.page).fill(data.roomNumber);
    await adminLocators.roomType(this.page).selectOption(data.type);
    await adminLocators.accessible(this.page).selectOption(data.accessible);
    await adminLocators.price(this.page).fill(data.price);
    await adminLocators.createBtn(this.page).click();
  }
  async validateRoomNameError() {
    await expect(
      adminLocators.errorMsg(this.page)
    ).toHaveText('Room name must be set');
  }

  async openMessages() {
    await adminLocators.messageTab(this.page).click();
  }

  async goToMessages() {
    await adminLocators.messageTab(this.page).click();
  }

  async deleteFirstMessage() {
    const firstRow = adminLocators.firstMessageRow(this.page);
    await adminLocators.deleteBtnInRow(firstRow).click();
  }
  //new report
  async goToReport() {
    await adminLocators.reportMenu(this.page).click();
  }
  async validateBooking(name) {
    await this.page.waitForLoadState('networkidle');
    return adminLocatorsLocators.bookingByName(this.page, name);
  }

  async clickToday() {
    await adminLocators.todayBtn(this.page).click();
  }

  async clickBack() {
    await adminLocators.backBtn(this.page).click();
  }

  async clickNext() {
    await adminLocators.nextBtn(this.page).click();
  }

}