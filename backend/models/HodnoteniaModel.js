const mongoose = require("mongoose");

const hodnoteniaGetTemplate = new mongoose.Schema({
  nazov: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("hodnotenia", hodnoteniaGetTemplate);
