const mongoose = require('mongoose');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || '';
  
  // Quick check for placeholder URI
  if (!connStr || connStr.includes('password123') || connStr.includes('cluster0.mongodb.net')) {
    console.log('[MongoDB] Using high-performance in-memory dataset (Placeholder MONGODB_URI detected).');
    return;
  }

  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500, // 2.5s fast timeout instead of 30s
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Atlas connection unavailable (${error.message}). Running in instant fallback mode.`);
  }
};

module.exports = connectDB;
