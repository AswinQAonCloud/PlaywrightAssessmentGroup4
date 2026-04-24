export const homeLocators = {

// Aswin - added locators for date selection and price details
  adminBtn: (page) => page.getByRole('link', { name: 'Admin' }),
  checkin: (page) => page.locator('input.form-control').nth(0),
  checkout: (page) => page.locator('input.form-control').nth(1),
  checkAvailabilityBtn: (page) => page.getByRole('button', { name: 'Check Availability' }),
  bookNow: (page) => page.getByRole('button', { name: 'Book now' }),
  roomPrices: (page) => page.locator('.room-card .price, .card .price, [class*="price"]'),
  roomCard: (page) => page.locator('.card'),
};