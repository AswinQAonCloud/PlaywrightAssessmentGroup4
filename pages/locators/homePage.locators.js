export const homeLocators = {

  adminBtn: (page) => page.getByRole('link', { name: 'Admin' }).first(),
  checkin: (page) => page.locator('input.form-control').nth(0),
  checkout: (page) => page.locator('input.form-control').nth(1),
  checkAvailabilityBtn: (page) => page.getByRole('button', { name: 'Check Availability' }),
  bookNow: (page) => page.getByRole('button', { name: 'Book now' }),
  roomPrices: (page) => page.locator('.room-card .price, .card .price, [class*="price"]'),
  roomCard: (page) => page.locator('.card'),
  roomCardByPrice: (page, price) => page.locator('.card').filter({ has: page.getByText(`£${price}`) }),
  bookNowBtn: (card) => card.getByRole('link', { name: 'Book now' }),

  bookNowButtonLocator: (id) => `[href*="/reservation/${id}"]`,
  priceRegex: (price) => new RegExp(`£\\s*${price}(\\.00)?`),  

  roomCard2: (page) => page.getByText('Single'),
  bookingNavMenu: (page) => page.getByRole('link', { name: 'Booking' }).first(),
  firstBookNowBtn: (page) => page.locator('div:has(button:has-text("Book now"))').first().getByRole('button', { name: 'Book now' }),
  reservenow: (page) => page.getByRole('button', { name: 'Reserve Now' }),
  reservenowagain: (page) => page.getByRole('button', { name: 'Reserve Now' }),
  firstNameInput: (page) => page.getByPlaceholder('Firstname'),
  lastNameInput: (page) => page.getByPlaceholder('Lastname'),
  emailInput: (page) => page.getByPlaceholder('Email'),
  phoneInput: (page) => page.getByPlaceholder('Phone'),
  reservenow: (page) => page.getByRole('button', { name: /reserve now/i }),
  errorMessageContainer: (page) => page.locator('.alert-danger'),
  errorMessages: (page) => page.locator('.alert-danger li'),
  messageRow: (page, name, subject) => page.locator('div', { hasText: name }).filter({ hasText: subject, }),
  myreservedRoom: (page) => page.locator('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > a:nth-child(2)'),

};

