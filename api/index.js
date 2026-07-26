const app = require('../server/app');
const connectDB = require('../server/config/db');

// Initialize database connection for Vercel serverless function invocation
connectDB();

module.exports = app;
