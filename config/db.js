const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    // await mongoose.connect(db);
    await mongoose.connect(db, {
      // useNewUrlParser: false,
      // useCreateIndex: true,
    });
    console.log("Mongoose connected");
  } catch (err) {
    console.error("Cannot connect db", err);

    // Exit application
    process.exit(1);
  }
};

module.exports = connectDB;
