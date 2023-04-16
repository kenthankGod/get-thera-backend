const mongoose = require("mongoose");

const therapistsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  badge: {
    type: String,
  },

  amount: {
    type: Number,
  },

  exp: {
    type: String
  }, 

  duration: {
    type: String
  }, 

  gender: {
    type: String
  }, 

  image: {
    type: String
  }, 

});

const Therapists = mongoose.model("therapists", therapistsSchema);

module.exports = { Therapists };

