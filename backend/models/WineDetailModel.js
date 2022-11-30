const mongoose = require("mongoose");

const wineDetailTemplate = new mongoose.Schema({
  vzorka_id: {
    type: String,
    required: true,
  },
  hodnotitel_id: {
    type: String,
    required: true,
  },
  potvrdene: {
    type: Boolean,
    default: false,
  },
  cirost: {
    type: String,
    required: true,
  },
  farba: {
    type: String,
    required: true,
  },
  intenzita: {
    type: String,
    required: true,
  },
  cistota: {
    type: String,
    required: true,
  },
  harmonia: {
    type: String,
    required: true,
  },
  intenzitaChut: {
    type: String,
    required: true,
  },
  cistotaChut: {
    type: String,
    required: true,
  },
  harmoniaChut: {
    type: String,
    required: true,
  },
  perzistencia: {
    type: String,
    required: true,
  },
  cirostNotes: {
    type: String,
  },
  farbaNotes: {
    type: String,
  },
  intenzitaNotes: {
    type: String,
  },
  cistotaNotes: {
    type: String,
  },
  harmoniaNotes: {
    type: String,
  },
  intenzitaChutNotes: {
    type: String,
  },
  cistotaChutNotes: {
    type: String,
  },
  harmoniaChutNotes: {
    type: String,
  },
  perzistenciaNotes: {
    type: String,
  },
  hodnotenie_celkove: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("vzorky_hodnotenie", wineDetailTemplate);
