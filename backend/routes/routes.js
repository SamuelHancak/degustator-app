const express = require("express");
const router = express.Router();
const wineCreateTemplate = require("../models/WineModel");
const wineDetailTemplate = require("../models/WineDetailModel");
const configuration = require("../models/ConfigurationModel");
const configurationVystavovatel = require("../models/ConfigurationvystavovatelModel");
const configurationHodnotitel = require("../models/ConfigurationHodnotitelModel");
const configurationHodnotenia = require("../models/HodnoteniaModel");
const configurationKomisia = require("../models/ConfigurationKomisiaModel");
const configurationPrava = require("../models/PravaModel");
const userTemplate = require("../models/UserModel");

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
    hodnotitel_id: request.body.hodnotitel_id,
    potvrdene: false,
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

router.post("/wines/rating/update/:id/:hodnotitel_id", (request, response) => {
  const updateRating = wineDetailTemplate.updateOne(
    { _id: request.params.id, hodnotitel_id: request.params.hodnotitel_id },
    {
      $set: {
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

router.get("/wines/rating/:id/:hodnotitel_id", (request, response) => {
  const getRating = wineDetailTemplate.findOne({
    vzorka_id: request.params.id,
    hodnotitel_id: request.params.hodnotitel_id,
  });

  getRating
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

// router.post("/configuration/create", (request, response) => {
//   const createConfiguartion = new configuration({
//     vzhladCirostVynikajuce: request.body.vzhladCirostVynikajuce,
//     vzhladCirostVelmiDobre: request.body.vzhladCirostVelmiDobre,
//     vzhladCirostDobre: request.body.vzhladCirostDobre,
//     vzhladCirostUspokojive: request.body.vzhladCirostUspokojive,
//     vzhladCirostNedostatocne: request.body.vzhladCirostNedostatocne,

//     vzhladFarbaVynikajuce: request.body.vzhladFarbaVynikajuce,
//     vzhladFarbaVelmiDobre: request.body.vzhladFarbaVelmiDobre,
//     vzhladFarbaDobre: request.body.vzhladFarbaDobre,
//     vzhladFarbaUspokojive: request.body.vzhladFarbaUspokojive,
//     vzhladFarbaNedostatocne: request.body.vzhladFarbaNedostatocne,

//     vonaIntenzitaVynikajuce: request.body.vonaIntenzitaVynikajuce,
//     vonaIntenzitaVelmiDobre: request.body.vonaIntenzitaVelmiDobre,
//     vonaIntenzitaDobre: request.body.vonaIntenzitaDobre,
//     vonaIntenzitaUspokojive: request.body.vonaIntenzitaUspokojive,
//     vonaIntenzitaNedostatocne: request.body.vonaIntenzitaNedostatocne,

//     vonaCistotaVynikajuce: request.body.vonaCistotaVynikajuce,
//     vonaCistotaVelmiDobre: request.body.vonaCistotaVelmiDobre,
//     vonaCistotaDobre: request.body.vonaCistotaDobre,
//     vonaCistotaUspokojive: request.body.vonaCistotaUspokojive,
//     vonaCistotaNedostatocne: request.body.vonaCistotaNedostatocne,

//     vonaHarmoniaVynikajuce: request.body.vonaHarmoniaVynikajuce,
//     vonaHarmoniaVelmiDobre: request.body.vonaHarmoniaVelmiDobre,
//     vonaHarmoniaDobre: request.body.vonaHarmoniaDobre,
//     vonaHarmoniaUspokojive: request.body.vonaHarmoniaUspokojive,
//     vonaHarmoniaNedostatocne: request.body.vonaHarmoniaNedostatocne,

//     chutIntenzitaVynikajuce: request.body.chutIntenzitaVynikajuce,
//     chutIntenzitaVelmiDobre: request.body.chutIntenzitaVelmiDobre,
//     chutIntenzitaDobre: request.body.chutIntenzitaDobre,
//     chutIntenzitaUspokojive: request.body.chutIntenzitaUspokojive,
//     chutIntenzitaNedostatocne: request.body.chutIntenzitaNedostatocne,

//     chutCistotaVynikajuce: request.body.chutCistotaVynikajuce,
//     chutCistotaVelmiDobre: request.body.chutCistotaVelmiDobre,
//     chutCistotaDobre: request.body.chutCistotaDobre,
//     chutCistotaUspokojive: request.body.chutCistotaUspokojive,
//     chutCistotaNedostatocne: request.body.chutCistotaNedostatocne,

//     chutHarmoniaVynikajuce: request.body.chutHarmoniaVynikajuce,
//     chutHarmoniaVelmiDobre: request.body.chutHarmoniaVelmiDobre,
//     chutHarmoniaDobre: request.body.chutHarmoniaDobre,
//     chutHarmoniaUspokojive: request.body.chutHarmoniaUspokojive,
//     chutHarmoniaNedostatocne: request.body.chutHarmoniaNedostatocne,

//     chutPerzistenciaVynikajuce: request.body.chutPerzistenciaVynikajuce,
//     chutPerzistenciaVelmiDobre: request.body.chutPerzistenciaVelmiDobre,
//     chutPerzistenciaDobre: request.body.chutPerzistenciaDobre,
//     chutPerzistenciaUspokojive: request.body.chutPerzistenciaUspokojive,
//     chutPerzistenciaNedostatocne: request.body.chutPerzistenciaNedostatocne,
//   });

//   createConfiguartion
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => response.json(err));
// });

router.get("/configuration/all", (_, response) => {
  const getConfigurationValues = configuration.find({});

  getConfigurationValues
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/configuration/update", (request, response) => {
  const updateConfiguration = configuration.updateOne(
    { _id: process.env.CONFIGURATION_ID },
    {
      $set: {
        vzhladCirostVynikajuce: request.body.vzhladCirostVynikajuce,
        vzhladCirostVelmiDobre: request.body.vzhladCirostVelmiDobre,
        vzhladCirostDobre: request.body.vzhladCirostDobre,
        vzhladCirostUspokojive: request.body.vzhladCirostUspokojive,
        vzhladCirostNedostatocne: request.body.vzhladCirostNedostatocne,

        vzhladFarbaVynikajuce: request.body.vzhladFarbaVynikajuce,
        vzhladFarbaVelmiDobre: request.body.vzhladFarbaVelmiDobre,
        vzhladFarbaDobre: request.body.vzhladFarbaDobre,
        vzhladFarbaUspokojive: request.body.vzhladFarbaUspokojive,
        vzhladFarbaNedostatocne: request.body.vzhladFarbaNedostatocne,

        vonaIntenzitaVynikajuce: request.body.vonaIntenzitaVynikajuce,
        vonaIntenzitaVelmiDobre: request.body.vonaIntenzitaVelmiDobre,
        vonaIntenzitaDobre: request.body.vonaIntenzitaDobre,
        vonaIntenzitaUspokojive: request.body.vonaIntenzitaUspokojive,
        vonaIntenzitaNedostatocne: request.body.vonaIntenzitaNedostatocne,

        vonaCistotaVynikajuce: request.body.vonaCistotaVynikajuce,
        vonaCistotaVelmiDobre: request.body.vonaCistotaVelmiDobre,
        vonaCistotaDobre: request.body.vonaCistotaDobre,
        vonaCistotaUspokojive: request.body.vonaCistotaUspokojive,
        vonaCistotaNedostatocne: request.body.vonaCistotaNedostatocne,

        vonaHarmoniaVynikajuce: request.body.vonaHarmoniaVynikajuce,
        vonaHarmoniaVelmiDobre: request.body.vonaHarmoniaVelmiDobre,
        vonaHarmoniaDobre: request.body.vonaHarmoniaDobre,
        vonaHarmoniaUspokojive: request.body.vonaHarmoniaUspokojive,
        vonaHarmoniaNedostatocne: request.body.vonaHarmoniaNedostatocne,

        chutIntenzitaVynikajuce: request.body.chutIntenzitaVynikajuce,
        chutIntenzitaVelmiDobre: request.body.chutIntenzitaVelmiDobre,
        chutIntenzitaDobre: request.body.chutIntenzitaDobre,
        chutIntenzitaUspokojive: request.body.chutIntenzitaUspokojive,
        chutIntenzitaNedostatocne: request.body.chutIntenzitaNedostatocne,

        chutCistotaVynikajuce: request.body.chutCistotaVynikajuce,
        chutCistotaVelmiDobre: request.body.chutCistotaVelmiDobre,
        chutCistotaDobre: request.body.chutCistotaDobre,
        chutCistotaUspokojive: request.body.chutCistotaUspokojive,
        chutCistotaNedostatocne: request.body.chutCistotaNedostatocne,

        chutHarmoniaVynikajuce: request.body.chutHarmoniaVynikajuce,
        chutHarmoniaVelmiDobre: request.body.chutHarmoniaVelmiDobre,
        chutHarmoniaDobre: request.body.chutHarmoniaDobre,
        chutHarmoniaUspokojive: request.body.chutHarmoniaUspokojive,
        chutHarmoniaNedostatocne: request.body.chutHarmoniaNedostatocne,

        chutPerzistenciaVynikajuce: request.body.chutPerzistenciaVynikajuce,
        chutPerzistenciaVelmiDobre: request.body.chutPerzistenciaVelmiDobre,
        chutPerzistenciaDobre: request.body.chutPerzistenciaDobre,
        chutPerzistenciaUspokojive: request.body.chutPerzistenciaUspokojive,
        chutPerzistenciaNedostatocne: request.body.chutPerzistenciaNedostatocne,
      },
    }
  );

  updateConfiguration
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/configuration/vystavovatel", (request, response) => {
  const createVystavovatel = new configurationVystavovatel({
    meno: request.body.meno,
    priezvisko: request.body.priezvisko,
    adresa: request.body.adresa,
    telefon: request.body.telefon,
    email: request.body.email,
  });

  createVystavovatel
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/configuration/vystavovatel/:id", (request, response) => {
  const updateVystavovatel = configurationVystavovatel.updateOne(
    { _id: request.params.id },
    {
      $set: {
        meno: request.body.meno,
        priezvisko: request.body.priezvisko,
        adresa: request.body.adresa,
        telefon: request.body.telefon,
        email: request.body.email,
      },
    }
  );

  updateVystavovatel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/configuration/vystavovatel/all", (_, response) => {
  const getVystavovatel = configurationVystavovatel.find({});

  getVystavovatel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/configuration/vystavovatel/:id", (request, response) => {
  const getVystavovatel = configurationVystavovatel.findOne({
    _id: request.params.id,
  });

  getVystavovatel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/configuration/hodnotitel", (request, response) => {
  const createHodnotitel = new configurationHodnotitel({
    meno: request.body.meno,
    priezvisko: request.body.priezvisko,
    telefon: request.body.telefon,
    email: request.body.email,
    komisia: request.body.komisia,
    prava: request.body.prava,
  });

  createHodnotitel
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/configuration/hodnotitel/all", (_, response) => {
  const getHodnotitel = configurationHodnotitel.find({});

  getHodnotitel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/configuration/hodnotitel/:id", (request, response) => {
  const getHodnotitel = configurationHodnotitel.findOne({
    _id: request.params.id,
  });

  getHodnotitel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/configuration/hodnotitel/:id", (request, response) => {
  const updateHodnotitel = configurationHodnotitel.updateOne(
    { _id: request.params.id },
    {
      $set: {
        meno: request.body.meno,
        priezvisko: request.body.priezvisko,
        telefon: request.body.telefon,
        email: request.body.email,
        komisia: request.body.komisia,
        prava: request.body.prava,
      },
    }
  );

  updateHodnotitel
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

// router.post("/wines/hodnotenie", (request, response) => {
//   const createHodnotenie = new configurationHodnotenia({
//     nazov: request.body.nazov,
//   });

//   createHodnotenie
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => response.json(err));
// });

router.get("/wines/hodnotenie/all", (_, response) => {
  const getHodnotenia = configurationHodnotenia.find({});

  getHodnotenia
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/hodnotenie/:id", (request, response) => {
  const getHodnotenie = configurationHodnotenia.findOne({
    _id: request.params.id,
  });

  getHodnotenie
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/komisia", (request, response) => {
  const createKomisia = new configurationKomisia({
    meno: request.body.meno,
    hodnotenie: request.body.hodnotenie,
  });

  createKomisia
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/komisia/:id", (request, response) => {
  const updateKomisia = configurationKomisia.updateOne(
    { _id: request.params.id },
    {
      $set: {
        meno: request.body.meno,
        hodnotenie: request.body.hodnotenie,
      },
    }
  );

  updateKomisia
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/komisia/all", (_, response) => {
  const getKomisie = configurationKomisia.find({});

  getKomisie
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/komisia/:id", (request, response) => {
  const getKomisia = configurationKomisia.findOne({
    _id: request.params.id,
  });

  getKomisia
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/prava", (request, response) => {
  const createPrava = new configurationPrava({
    nazov: request.body.nazov,
    kod: request.body.kod,
  });

  createPrava
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/prava/all", (_, response) => {
  const getPrava = configurationPrava.find({});

  getPrava
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.post("/wines/user", (request, response) => {
  const createUser = new userTemplate({
    email: request.body.email,
    heslo: request.body.heslo,
    meno: request.body.meno,
    priezvisko: request.body.priezvisko,
    prava: "3",
  });

  createUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/user/:email/", (request, response) => {
  const getUser = userTemplate.findOne({
    email: request.params.email,
  });

  getUser
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/userId/:id", (request, response) => {
  const getUser = userTemplate.findOne({
    _id: request.params.id,
  });

  getUser
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/users", (_, response) => {
  const getUser = userTemplate.find({});

  getUser
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

router.get("/wines/users/:prava", (request, response) => {
  const getUser = userTemplate.find({});

  getUser
    .then((data) => {
      response.json(
        data.filter((val) => Number(val.prava) >= Number(request.params.prava))
      );
    })
    .catch((err) => response.json(err));
});

router.post("/wines/user/:id", (request, response) => {
  const updateUser = userTemplate.updateOne(
    { _id: request.params.id },
    {
      $set: {
        meno: request.body.meno,
        priezvisko: request.body.priezvisko,
        heslo: request.body.newPassword,
      },
    }
  );

  updateUser
    .then((data) => {
      response.json(data);
    })
    .catch((err) => response.json(err));
});

module.exports = router;
