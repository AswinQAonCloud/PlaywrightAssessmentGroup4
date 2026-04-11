import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { HomePage } from '../pages/home.page.js';
import { ENV } from '../config/env.js';

test('End-to-End Booking Flow', async ({ page }) => {

  const login = new LoginPage(page);
    const home = new HomePage(page);

  // Home Page
  await page.goto('/');

  // Admin Login
  await home.goToAdmin();
  await login.login(ENV.username, ENV.password);

});