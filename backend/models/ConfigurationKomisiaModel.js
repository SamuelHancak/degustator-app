const mongoose = require("mongoose");

const komisiaGetTemplate = new mongoose.Schema({
  meno: {
    type: String,
    required: true,
  },
  hodnotenie: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("komisia", komisiaGetTemplate);