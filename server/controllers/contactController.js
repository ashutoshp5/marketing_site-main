import { mailTransporter } from "../config/mailConfig.js";
import Contact from "../models/Contact.js";

const escapeHtml = (value) => {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate email and phone
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Validate phone number format (10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid 10-digit phone number." });
  }

  if (String(message).length > 4000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  try {
    // First, create and save contact to database
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    const savedContact = await newContact.save();
    if (process.env.NODE_ENV !== 'production') {
      console.log('Contact saved to database:', savedContact._id);
    }

    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.CONTACT_EMAIL,
      subject: "New Contact Us Inquiry - KifaytiHealth",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Inquiry</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #14b8a6; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
                .info-section { margin-bottom: 20px; }
                .label { font-weight: bold; color: #14b8a6; }
                .message-box { background-color: white; padding: 15px; border-left: 4px solid #14b8a6; margin: 15px 0; }
                .footer { background-color: #374151; color: white; padding: 20px; text-align: center; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>KifaytiHealth - New Contact Inquiry</h1>
                    <p>Contact Us Today - Schedule a consultation or request more information</p>
                </div>
                
                <div class="content">
                    <h2>New Contact Form Submission</h2>
                    <p>You have received a new inquiry from a potential client interested in your kidney care services.</p>
                    
                    <div class="info-section">
                        <p><span class="label">Name:</span> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
                        <p><span class="label">Email:</span> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                        <p><span class="label">Phone:</span> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
                        <p><span class="label">Submitted:</span> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div class="message-box">
                        <p><span class="label">Message:</span></p>
                        <p>${escapeHtml(message)}</p>
                    </div>
                    
                    <div style="margin-top: 25px; padding: 15px; background-color: #e6fffa; border-radius: 5px;">
                        <p style="margin: 0; font-style: italic; color: #0d9488;">
                            "Let's work together to manage CKD effectively and improve your quality of life."
                        </p>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>KifaytiHealth</strong> - Transforming Kidney Care Through Innovation</p>
                    <p>Please respond to this inquiry promptly to provide excellent customer service.</p>
                    <p style="font-size: 12px; margin-top: 10px;">
                        This email was automatically generated from the KifaytiHealth website contact form.
                    </p>
                </div>
            </div>
        </body>
        </html>
      `,
      text: `
KifaytiHealth - New Contact Inquiry

Contact Us Today
Schedule a consultation or request more information about our services.

New Contact Form Submission:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Submitted: ${new Date().toLocaleString()}

Message:
${message}

"Let's work together to manage CKD effectively and improve your quality of life."

---
KifaytiHealth - Transforming Kidney Care Through Innovation
Please respond to this inquiry promptly to provide excellent customer service.
      `
    };

    // Send email
    try {
      await mailTransporter.sendMail(mailOptions);
      
      // Update contact record to indicate email was sent successfully
      await Contact.findByIdAndUpdate(savedContact._id, { emailSent: true });
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('Email sent successfully for contact:', savedContact._id);
      }
      res.status(200).json({ 
        success: "Message sent successfully!", 
        contactId: savedContact._id 
      });
    } catch (emailError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Error sending email:", emailError);
      }
      
      // Email failed, but contact is saved - update status
      await Contact.findByIdAndUpdate(savedContact._id, { 
        emailSent: false,
        status: 'new' // Keep as new since email failed
      });
      
      res.status(200).json({ 
        success: "Contact saved successfully, but email delivery failed. We'll respond via other means.",
        contactId: savedContact._id 
      });
    }
    
  } catch (dbError) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error saving contact to database:", dbError);
    }
    res.status(500).json({ 
      error: "Failed to save contact information. Please try again later." 
    });
  }
};

// Get all contacts (for admin purposes)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 }) // Most recent first
      .limit(50); // Limit to last 50 contacts
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact." });
  }
};

// Update contact status
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }
    
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ error: "Failed to update contact status." });
  }
};
