const express = require("express");
const router = express.Router();
const wineCreateTemplateCopy = require("../models/WineCreateModels");

router.post("/create", (request, response) => {
  const createVzorka = new wineCreateTemplateCopy({
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

module.exports = router;
