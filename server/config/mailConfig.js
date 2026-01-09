import nodemailer from "nodemailer";

const isProd = process.env.NODE_ENV === 'production';
export const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: !isProd,
  logger: !isProd,
});

