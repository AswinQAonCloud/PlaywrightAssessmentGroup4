export const adminLocators = {
  roomNumber: (page) => page.locator('#roomName'),
  roomType: (page) => page.locator('#type'),
  accessible: (page) => page.locator('#accessible'),
  price: (page) => page.locator('#roomPrice'),
  createBtn: (page) => page.getByRole('button', { name: 'Create' }),
  frontPageBtn: (page) => page.getByRole('link', { name: 'Front Page' }),
  roomRows: (page) => page.locator('table tbody tr, .room-row'),
  deleteButtons: (page) => page.locator('span.roomDelete'),
  createdRoomRow: (page, roomNumber) =>  page.getByText(roomNumber, { exact: true }),
  homepageRoomPrice: (page, price) => page.getByText(`£${price} per night`),

  errorMsg: (page) => page.locator('text=Room name must be set'),
  messageTab: (page) => page.getByText('Messages'),
  logoutButton: (page) => page.getByRole('button', { name: 'Logout' }),
  messageTab: (page) => page.getByRole('link', { name: /Messages/ }),
  firstMessageRow: (page) => page.locator('div').filter({ has: page.locator('p') }).first(),
  deleteBtnInRow: (row) => row.locator('div').last(),
  reportMenu: (page) => page.getByRole('link', { name: 'Report' }),
  todayBtn: (page) => page.getByRole('button', { name: 'Today' }),
  backBtn: (page) => page.getByRole('button', { name: 'Back' }),
  nextBtn: (page) => page.getByRole('button', { name: 'Next' }),
  bookingByName: (page, name) => page.getByText(name, { exact: false }),



};