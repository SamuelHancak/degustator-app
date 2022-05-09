const mongoose = require("mongoose");

const wineTemplate = new mongoose.Schema({
  komisia: {
    type: String,
    required: true,
    ref: "komisia",
  },
  vzorka: {
    type: String,
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
    ref: "vystavovatel",
  },
  hodnotenie_celkove: {
    type: Number,
    default: 0,
  },
  hodnotenie_priemerne: {
    type: Number,
    default: 0,
  },
  potvrdene: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("vzorka", wineTemplate);
