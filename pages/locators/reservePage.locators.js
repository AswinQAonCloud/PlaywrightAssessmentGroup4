export const bookingLocators = {
  firstname: (page) => page.getByPlaceholder('Firstname'),
  lastname: (page) => page.getByPlaceholder('Lastname'),
  email: (page) => page.getByPlaceholder('Email'),
  phone: (page) => page.getByPlaceholder('Phone'),

  reserveBtn: (page) =>
    page.getByRole('button', { name: 'Reserve Now' }),

  confirmMsg: (page) => page.getByText('Booking Confirmed'),
  errorBox: (page) => page.locator('.alert-danger'),
};