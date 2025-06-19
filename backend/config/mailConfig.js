import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Explicitly specify the path to your .env file



export const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  //debug: true, // Enable debug output
  //logger: true, // Log information to console
});

