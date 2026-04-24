export const bookingLocators = {

  priceSummary: (page) => page.locator('.price-summary'),
  roomRate: (page) => page.locator('.price-summary').getByText(/night/i),
  cleaningFee: (page) => page.locator('.price-summary').getByText('Cleaning fee').locator('..'),
  serviceFee: (page) => page.locator('.price-summary').getByText('Service fee').locator('..'),
  total: (page) => page.locator("div[class='d-flex justify-content-between fw-bold'] span:nth-child(2)"),
  priceSummarySection: (page) => page.locator('h3.fs-5.mb-3').filter({ hasText: 'Price Summary' }),
  // Rate line: the d-flex row containing "nights" e.g. "£100 x 3 nights"
  rateLine: (page) => page
    .locator('.card.bg-light .card-body .d-flex')
    .filter({ hasText: /nights/i })
    .first()
    .locator('span')
    .first(),
  // Total row: the bold d-flex row containing "Total"
  totalRow: (page) => page
    .locator('.card.bg-light .card-body .d-flex')
    .filter({ hasText: /Total/i })
    .first(),

  firstname: (page) => page.getByPlaceholder('Firstname'),
  lastname: (page) => page.getByPlaceholder('Lastname'),
  email: (page) => page.getByPlaceholder('Email'),
  phone: (page) => page.getByPlaceholder('Phone'),
  reserveBtn: (page) => page.getByRole('button', { name: 'Reserve Now' }),
  confirmMsg: (page) => page.getByText('Booking Confirmed'),
  errorBox: (page) => page.locator('.alert-danger'),

};