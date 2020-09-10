const mongoose = require("mongoose");

//const uri = process.env.ATLAS_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://whenner:agoodpass505@whennerappcluster.n5tz7.mongodb.net/test",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
