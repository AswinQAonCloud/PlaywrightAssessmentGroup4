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
  await this.page.getByText(data.roomNumber, { exact: true }).waitFor({
    state: 'visible',
    timeout: 5000
  });
  await this.page.reload();
}

  async validateRoomHomepage(price) {
      return this.page.getByText(`£${price} per night`, { exact: true });
  }
}