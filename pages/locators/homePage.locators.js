export const homeLocators = {
  adminBtn: (page) => page.getByText('Admin', { exact: true }),

  checkin: (page) => page.getByLabel('Check In'),
  checkout: (page) => page.getByLabel('Check Out'),
  checkAvailability: (page) =>
    page.getByRole('button', { name: 'Check Availability' }),

  roomCard: (page) => page.getByText('Single'),
  bookNow: (page) => page.getByRole('button', { name: 'Book now' }),
  //test
};