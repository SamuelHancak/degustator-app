const mongoose = require("mongoose");

const wineTemplate = new mongoose.Schema({
  komisia: {
    type: String,
    required: true,
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
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("vzorka", wineTemplate);
