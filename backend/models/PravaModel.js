const mongoose = require("mongoose");

const pravaGetTemplate = new mongoose.Schema({
  nazov: {
    type: String,
    required: true,
  },
  kod: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("prava", pravaGetTemplate);
