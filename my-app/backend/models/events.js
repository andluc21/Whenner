const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  // userName: String,
  // email: String,
  // bio: String,
  // googleId: String


  Subject: {
    type: String,
    default: "Explosion of Betelgeuse Star"
  },
  Location: {
    type: String,
    default: "Anytown, USA"
  },
  StartTime: {
    type: Date,
    default: Date.now
  },
  EndTime: {
    type: Date,
    default: Date.now
  },
  CategoryColor: {
    type: String,
    default: "#357cd2"
  }


});
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
