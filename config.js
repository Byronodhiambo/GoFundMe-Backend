// Import all env vars from .env file
require("dotenv").config();

export const MONGO_URI = process.env.MONGO_URI;
export const EMAIL_HOST_ADDRESS = process.env.EMAIL_HOST_ADDRESS;
export const ANDROID_CLIENT_ID = process.env.ANDROID_CLIENT_ID;
export const OAUTH_CLIENT_ID_GOOGLE_SIGNIN = process.env.OAUTH_CLIENT_ID_GOOGLE_SIGNIN;
export const OAUTH_CLIENT_SECRET_GOOGLE_SIGNIN = process.env.OAUTH_CLIENT_SECRET_GOOGLE_SIGNIN;
export const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
export const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
export const OAUTH_ACCESS_TOKEN = process.env.OAUTH_ACCESS_TOKEN;
export const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
export const ADMIN_EMAIL_1 = process.env.ADMIN_EMAIL_1;
export const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS;
export const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;
export const JWT_ACCESS_EXP = process.env.JWT_ACCESS_EXP;
export const JWT_REFRESH_EXP = process.env.JWT_REFRESH_EXP;
export const PORT = process.env.PORT;
export const NODEMAILER_USER = process.env.NODEMAILER_USER;
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
export const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

