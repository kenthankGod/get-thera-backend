const mongoose = require("mongoose");
 
const bookingsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },
});

const Bookings = mongoose.model("Booking", bookingsSchema);

module.exports = { Bookings };
       