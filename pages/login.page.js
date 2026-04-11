import { loginLocators } from './locators/adminLogin.locators.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/admin');
  }

  async login(username, password) {
    await loginLocators.username(this.page).fill(username);
    await loginLocators.password(this.page).fill(password);
    await loginLocators.loginBtn(this.page).click();
  }
}