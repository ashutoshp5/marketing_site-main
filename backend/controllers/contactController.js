import { mailTransporter } from "../config/mailConfig.js";
import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Explicitly specify the path to your .env file

export const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Optional: Validate phone number format (e.g., 10-digit number)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid 10-digit phone number." });
  }

  // Create email options
  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL, // Destination email from environment variables
    subject: "New Contact Us Submission",
    text: `You have received a new message from ${firstName} ${lastName} (${email})\nPhone Number: ${phone}\n\nMessage:\n${message}`,
  };

  try {
    // Send email
    await mailTransporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
};
