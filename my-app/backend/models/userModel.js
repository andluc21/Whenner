const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  bio: String,
  googleId: String,
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
