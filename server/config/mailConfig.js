import nodemailer from "nodemailer";

const isProd = process.env.NODE_ENV === 'production';

const resolveFirst = (...values) => {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
  }
  return '';
};

const smtpHost = resolveFirst(process.env.SMTP_HOST, 'smtp.gmail.com');
const smtpPort = Number(resolveFirst(process.env.SMTP_PORT, '587')) || 587;

// Prefer the project-specific vars, but accept common alternatives.
const smtpUser = resolveFirst(
  process.env.EMAIL_USERNAME,
  process.env.SMTP_USER,
  process.env.MAIL_USER,
  process.env.GMAIL_USER
);

const smtpPass = resolveFirst(
  process.env.EMAIL_PASSWORD,
  process.env.SMTP_PASS,
  process.env.MAIL_PASS,
  process.env.GMAIL_APP_PASSWORD
);

const missing = [];
if (!smtpUser) missing.push('EMAIL_USERNAME (or SMTP_USER/MAIL_USER/GMAIL_USER)');
if (!smtpPass) missing.push('EMAIL_PASSWORD (or SMTP_PASS/MAIL_PASS/GMAIL_APP_PASSWORD)');

// If creds are missing, export a transporter that fails clearly on send
// (so the rest of the API can continue working).
export const mailTransporter = missing.length
  ? {
      sendMail: async () => {
        const err = new Error(
          `Email transporter is not configured: missing ${missing.join(', ')}`
        );
        err.code = 'EMAIL_NOT_CONFIGURED';
        throw err;
      },
    }
  : nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      debug: !isProd,
      logger: !isProd,
    });

if (!isProd && missing.length) {
  console.warn(`[mail] Disabled email sending: ${missing.join(', ')}`);
}

