import basicAuth from 'basic-auth';
import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Explicitly specify the path to your .env file


// Replace these credentials with secure admin credentials
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME, // Set your admin username
  password: process.env.ADMIN_PASSWORD,// Set your admin password
};

// Middleware function for HTTP Basic Authentication
export function adminAuth(req, res, next) {
  const user = basicAuth(req);

  if (!user || user.name !== ADMIN_CREDENTIALS.username || user.pass !== ADMIN_CREDENTIALS.password) {
    // Prompt for credentials if unauthorized
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Unauthorized');
  }

  // If authenticated, proceed to the next middleware or route handler
  next();
}
