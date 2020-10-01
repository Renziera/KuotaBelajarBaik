import dotenv from 'dotenv';

// Aktivasi dotenv
dotenv.config();

// Export semua environment variables
export default {
    chromePath: process.env.CHROME_PATH,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
};