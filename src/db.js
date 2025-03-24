const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Using existing database connection.");
      return;
    }
    await mongoose.connect(process.env.DB_STRING
    ).then(()=>{
        console.warn("db connection done again")
    })
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
