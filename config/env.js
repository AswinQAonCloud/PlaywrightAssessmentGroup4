import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  baseURL: process.env.BASE_URL,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};