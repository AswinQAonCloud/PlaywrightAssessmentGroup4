import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { BookingPage } from '../pages/booking.page.js';
import { ENV } from '../config/env.js';
import { toISO, fromToday } from '../utils/dateHelpers.js';
import { bookingLocators } from '../pages/locators/reservePage.locators.js';

const guestFirst = {
  firstname: 'Alex',
  lastname: 'First',
  email: 'alex.first@example.com',
  phone: '01234567890',
};

const guestSecond = {
  firstname: 'Blake',
  lastname: 'Second',
  email: 'blake.second@example.com',
  phone: '01234567891',
};

test.describe('Prevention of conflicting (double) bookings', () => {
  test('default Single room cannot be booked twice for the same date range', async ({ page }) => {
    test.setTimeout(90_000);
  
    const home = new HomePage(page);
    const booking = new BookingPage(page);
  
    const dayOffset = 40 + Math.floor(Math.random() * 120);
    const checkin = toISO(fromToday(dayOffset));
    const checkout = toISO(fromToday(dayOffset + 1));
    const roomId = 1;
  
    await page.goto(ENV.baseURL);
  
 
    //  First booking
    await home.selectDates(checkin, checkout);
    await home.clickCheckAvailability();
    await home.clickBookNowForRoomId(roomId);
    await booking.completeReservation(guestFirst);
    await booking.expectBookingConfirmed();
    
    //  Second attempt
    await page.goto(ENV.baseURL);
    await home.selectDates(checkin, checkout);
    await home.clickCheckAvailability();
  
    const isAvailable = await home.isRoomAvailableById(roomId);
  
    if (isAvailable === 0) {
      await expect(await home.getBookNowButtonByRoomId(roomId)).toHaveCount(0);
      return;
    }
  
    await home.clickBookNowForRoomId(roomId);
    await booking.completeReservation(guestSecond);
  
    if (await booking.hasBookingError()) {
      const err = await booking.getBookingErrorText();
      expect(err).toMatch(/not available|unavailable|already|booked|conflict|error/i);
      return;
    }
  
    await expect(bookingLocators.confirmMsg(page)).not.toBeVisible();
  });
});
