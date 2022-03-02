const mongoose = require("mongoose");

const wineCreateTemplate = new mongoose.Schema({
  komisia: {
    type: String,
    required: true,
  },
  vzorka: {
    type: Number,
    required: true,
  },
  rocnik: {
    type: Number,
    required: true,
  },
  kategoria: {
    type: String,
    required: true,
  },
  vystavovatel: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("test_create_vzorka", wineCreateTemplate);
