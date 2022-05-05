const mongoose = require("mongoose");

const hodnotitelGetTemplate = new mongoose.Schema({
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
  komisia: {
    type: String,
    required: true,
  },
  prava: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("hodnotitel", hodnotitelGetTemplate);
