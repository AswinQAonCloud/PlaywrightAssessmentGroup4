import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { AdminPage } from '../pages/admin.page.js';
import { BookingPage } from '../pages/booking.page.js';
import { HomePage } from '../pages/home.page.js';
import { ENV } from '../config/env.js';
import { testData, expectedTotal } from '../fixtures/bookingLogic.js';



test.describe('Booking Pricing — Admin-Created Room', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);

    await login.navigate();
    await login.login(ENV.username, ENV.password);
    await page.waitForURL('**/admin/rooms');
    await admin.deleteAllRooms();
    await page.pause();
    await admin.createRoomAndValidate(testData.room);
  });

  test('Admin-created room is visible on home page with correct price', async ({ page }) => {
    const admin = new AdminPage(page);
    await admin.goToFrontPage();
    await expect(await admin.validateRoomHomepage(testData.room.price)).toBeVisible();
  });

  test('1-night stay: total = (rate x 1) + cleaning + service', async ({ page }) => {
    const admin = new AdminPage(page);
    const home = new HomePage(page);
    const booking = new BookingPage(page);

    await admin.goToFrontPage();
    await home.selectDates(testData.dates.valid.checkin, testData.dates.valid.checkout);
    await home.clickCheckAvailability();
    await home.clickBookNowByPrice(testData.room.price);

    const actual = await booking.getTotalAmount();
    const expected = expectedTotal(
      1,
      testData.room.price,
      testData.fees
    );
    expect(actual).toBe(expected);
  });

  test('3-night stay: total = (rate x 3) + cleaning + service', async ({ page }) => {
    const admin = new AdminPage(page);
    const home = new HomePage(page);
    const booking = new BookingPage(page);

    await admin.goToFrontPage();

    await home.selectDates(
      testData.dates.threeNights.checkin,
      testData.dates.threeNights.checkout
    );

    await home.clickCheckAvailability();

    await home.clickBookNowByPrice(testData.room.price);

    const actual = await booking.getTotalAmount();
    const expected = expectedTotal(
      3,
      testData.room.price,
      testData.fees
    );
    expect(actual).toBe(expected);
  });

  test('7-night stay: total = (rate x 7) + cleaning + service', async ({ page }) => {

    const admin = new AdminPage(page);
    const home = new HomePage(page);
    const booking = new BookingPage(page);

    await admin.goToFrontPage();

    await home.selectDates(
      testData.dates.sevenNights.checkin,
      testData.dates.sevenNights.checkout
    );

    await home.clickCheckAvailability();

    await home.clickBookNowByPrice(testData.room.price);

    const actual = await booking.getTotalAmount();
    const expected = expectedTotal(
      7,
      testData.room.price,
      testData.fees
    );
    expect(actual).toBe(expected);
  });

  test('Nights shown in price summary matches selected date range', async ({ page }) => {

    const admin = new AdminPage(page);
    const home = new HomePage(page);
    const booking = new BookingPage(page);

    await admin.goToFrontPage();

    await home.selectDates(
      testData.dates.threeNights.checkin,
      testData.dates.threeNights.checkout
    );

    await home.clickCheckAvailability();

    await home.clickBookNowByPrice(testData.room.price);
    await page.waitForLoadState('networkidle');
    const nights = await booking.getNights();
    expect(nights).toBe(3);
  });

});