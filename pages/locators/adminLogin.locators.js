export const loginLocators = {
  username: (page) => page.getByRole('textbox', { name: 'Username' }),
  password: (page) => page.getByRole('textbox', { name: 'Password' }),
  loginBtn: (page) => page.getByRole('button', { name: 'Login' }),
};