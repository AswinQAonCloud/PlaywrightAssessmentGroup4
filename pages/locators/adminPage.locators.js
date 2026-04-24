export const adminLocators = {
  roomNumber:   (page) => page.locator('#roomName'),
  roomType:     (page) => page.locator('#type'),
  accessible:   (page) => page.locator('#accessible'),
  price:        (page) => page.locator('#roomPrice'),
  createBtn:    (page) => page.getByRole('button', { name: 'Create' }),
  frontPageBtn: (page) => page.getByRole('link', { name: 'Front Page' }),
  roomRows: (page) => page.locator('table tbody tr, .room-row'),
  deleteButtons: (page) => page.locator('span.roomDelete'),
   
};