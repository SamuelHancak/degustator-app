const mongoose = require("mongoose");

const vystavovatelGetTemplate = new mongoose.Schema({
  meno: {
    type: String,
    required: true,
  },
  priezvisko: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefon: {
    type: String,
    required: true,
  },
  adresa: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("vystavovatel", vystavovatelGetTemplate);
