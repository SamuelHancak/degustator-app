const express = require("express");
const router = express.Router();
const wineCreateTemplate = require("../models/WineModel");
const wineDetailTemplate = require("../models/WineDetailModel");
const configuration = require("../models/ConfigurationModel");

router.post("/wines/create", (request, response) => {
  const createVzorka = new wineCreateTemplate({
    komisia: request.body.komisia,
    vzorka: request.body.vzorka,
    rocnik: request.body.rocnik,
    kategoria: request.body.kategoria,
    vystavovatel: request.body.vystavovatel,
  });

  createVzorka
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/delete/:id", (request, response) => {
  const deleteVzorka = wineCreateTemplate.deleteOne({
    _id: request.params.id,
  });

  deleteVzorka
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/all", (_, response) => {
  const getVzorka = wineCreateTemplate.find({});

  getVzorka
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/one/:id", (request, response) => {
  const getVzorka = wineCreateTemplate.findOne({ _id: request.params.id });

  getVzorka
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/rating/create", (request, response) => {
  const createRating = new wineDetailTemplate({
    vzorka_id: request.body.vzorka_id,
    cirost: request.body.cirost,
    farba: request.body.farba,
    intenzita: request.body.intenzita,
    cistota: request.body.cistota,
    harmonia: request.body.harmonia,
    intenzitaChut: request.body.intenzitaChut,
    cistotaChut: request.body.cistotaChut,
    harmoniaChut: request.body.harmoniaChut,
    perzistencia: request.body.perzistencia,
    cirostNotes: request.body.cirostNotes,
    farbaNotes: request.body.farbaNotes,
    intenzitaNotes: request.body.intenzitaNotes,
    cistotaNotes: request.body.cistotaNotes,
    harmoniaNotes: request.body.harmoniaNotes,
    intenzitaChutNotes: request.body.intenzitaChutNotes,
    cistotaChutNotes: request.body.cistotaChutNotes,
    harmoniaChutNotes: request.body.harmoniaChutNotes,
    perzistenciaNotes: request.body.perzistenciaNotes,
  });

  createRating
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/rating/update/:id", (request, response) => {
  const updateRating = wineDetailTemplate.updateOne(
    { _id: request.params.id },
    {
      $set: {
        vzorka_id: request.body.vzorka_id,
        cirost: request.body.cirost,
        farba: request.body.farba,
        intenzita: request.body.intenzita,
        cistota: request.body.cistota,
        harmonia: request.body.harmonia,
        intenzitaChut: request.body.intenzitaChut,
        cistotaChut: request.body.cistotaChut,
        harmoniaChut: request.body.harmoniaChut,
        perzistencia: request.body.perzistencia,
        cirostNotes: request.body.cirostNotes,
        farbaNotes: request.body.farbaNotes,
        intenzitaNotes: request.body.intenzitaNotes,
        cistotaNotes: request.body.cistotaNotes,
        harmoniaNotes: request.body.harmoniaNotes,
        intenzitaChutNotes: request.body.intenzitaChutNotes,
        cistotaChutNotes: request.body.cistotaChutNotes,
        harmoniaChutNotes: request.body.harmoniaChutNotes,
        perzistenciaNotes: request.body.perzistenciaNotes,
      },
    }
  );

  updateRating
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/rating/delete/:id", (request, response) => {
  const deleteRating = wineDetailTemplate.deleteOne({
    vzorka_id: request.params.id,
  });

  deleteRating
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/rating/:id", (request, response) => {
  const getRating = wineDetailTemplate.findOne({
    vzorka_id: request.params.id,
  });

  getRating
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

module.exports = router;
