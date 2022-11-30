const mongoose = require("mongoose");

const vystavovatelGetTemplate = new mongoose.Schema({
  nazov: {
    type: String,
    required: true,
  },
  adresa: {
    type: Number,
    required: true,
  },
  telefon: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("vystavovatel", vystavovatelGetTemplate);
