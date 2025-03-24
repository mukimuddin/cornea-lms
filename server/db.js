const mongoose = require('mongoose');

mongoose.set('debug', true); // Enable Mongoose debugging

const connectDB = async () => {
       try {
              const conn = await mongoose.connect("mongodb+srv://mukim_uddin:mukimuddin@cluster0.mesxr.mongodb.net/mukim_uddin?retryWrites=true&w=majority");
              console.log(`MongoDB Connected: ${conn.connection.host}`);
       } catch (error) {
              console.error(`MongoDB Connection Error: ${error.message}`);
              console.error(error); // Log the full error object for debugging
              process.exit(1);
       }
};

module.exports = connectDB;