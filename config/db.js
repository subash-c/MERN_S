const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Mongoose connected");
  } catch (err) {
    console.error("Cannot connect db", err);

    // Exit application
    process.exit(1);
  }
};

module.exports = connectDB;
