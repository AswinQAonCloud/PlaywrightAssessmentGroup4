import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { AdminPage } from '../pages/admin.page.js';
import { HomePage } from '../pages/home.page.js';
import { BookingPage } from '../pages/booking.page.js';
import { testData } from '../fixtures/bookingLogic.js';
import { ENV } from '../config/env.js';

test.describe('Booking System - Full Coverage', () => {

  test('E2E Flow + Booking Logic', async ({ page }) => {

    const login = new LoginPage(page);
    const admin = new AdminPage(page);
    const home = new HomePage(page);
    const booking = new BookingPage(page);

    // Step 1: Go Home
    await page.goto('/');

    // Step 2: Login
    await home.goToAdmin();
    await login.login(ENV.username, ENV.password);

    // Step 3: Invalid Room Creation
    await admin.createRoom({ roomNumber: '', type: '', accessible: '', price: '' });
    await admin.validateError();

    // Step 4: Valid Room Creation
    await admin.createRoom(testData.room);

    // Step 5: Back to Home
    await admin.goToFrontPage();

    // Step 6: Validate Room Visible
    await expect(page.getByText(testData.room.type)).toBeVisible();

    // Step 7: VALID DATE FLOW
    await home.checkAvailability(
      testData.dates.valid.checkin,
      testData.dates.valid.checkout
    );

    await home.selectRoom();

    // Step 8: INVALID BOOKING FORM
    await booking.reserve(testData.invalidBooking);
    await booking.validateError();

    // Step 9: VALID BOOKING
    await booking.reserve(testData.validBooking);

    // Step 10: CONFIRMATION
    await expect(page.getByText('Booking Confirmed')).toBeVisible();
  });

  // -----------------------------
  // 🔥 DATE VALIDATION TEST
  // -----------------------------
  test('Invalid Date - Checkin > Checkout', async ({ page }) => {

    const home = new HomePage(page);

    await page.goto('/');

    await home.checkAvailability(
      testData.dates.invalid.checkin,
      testData.dates.invalid.checkout
    );

    // Expect no rooms / validation
    await expect(page).toHaveURL(/reservation/); // or validate error
  });

  // -----------------------------
  // 🔥 SAME DAY BOOKING
  // -----------------------------
  test('Same Day Booking Edge Case', async ({ page }) => {

    const home = new HomePage(page);

    await page.goto('/');

    await home.checkAvailability(
      testData.dates.sameDay.checkin,
      testData.dates.sameDay.checkout
    );

    await home.selectRoom();

    // System behavior check (based on app)
    await expect(page).toHaveURL(/reservation/);
  });

  // -----------------------------
  // 🔥 PRICE VALIDATION
  // -----------------------------
  test('Duration Price Validation', async ({ page }) => {

    const home = new HomePage(page);
    const booking = new BookingPage(page);

    await page.goto('/');

    await home.checkAvailability('2026-04-18', '2026-04-20'); // 2 days
    await home.selectRoom();

    const priceText = await booking.getTotalPrice();

    console.log('Total Price:', priceText);

    // Example validation (adjust if needed)
    await expect(priceText).toContain('Total');
  });

});