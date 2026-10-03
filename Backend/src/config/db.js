const mongoose = require("mongoose");
const dns = require("dns");

// Use reliable public DNS servers for MongoDB SRV resolution
dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const connectDB = async () => {
  try {
    // Check whether MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not defined in .env file"
      );
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );

    // Connection successful
    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    // Connection failed
    console.error(
      `❌ MongoDB Connection Error: ${error.message}`
    );

    throw error;
  }
};

module.exports = connectDB;