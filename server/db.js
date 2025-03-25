require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

mongoose.set('debug', true); // Enable Mongoose debugging

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Use MONGO_URI from .env
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;