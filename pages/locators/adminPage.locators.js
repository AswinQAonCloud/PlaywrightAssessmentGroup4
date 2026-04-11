export const adminLocators = {
  roomNumber: (page) => page.locator('input').nth(0),
  roomType: (page) => page.locator('input').nth(1),
  accessible: (page) => page.locator('input').nth(2),
  price: (page) => page.locator('input').nth(3),

  createBtn: (page) => page.getByRole('button', { name: 'Create' }),
  errorMsg: (page) => page.locator('.alert-danger'),

  frontPageBtn: (page) => page.getByText('Front Page'),
  messageTab: (page) => page.getByText('Messages'),
};