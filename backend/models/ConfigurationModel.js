const mongoose = require("mongoose");

const configurationGetTemplate = new mongoose.Schema({
  //Vzhlad cirost values
  vzhladCirostVynikajuce: {
    type: String,
    required: true,
  },
  vzhladCirostVelmiDobre: {
    type: String,
    required: true,
  },
  vzhladCirostDobre: {
    type: String,
    required: true,
  },
  vzhladCirostUspokojive: {
    type: String,
    required: true,
  },
  vzhladCirostNedostatocne: {
    type: String,
    required: true,
  },

  //Vzhlad farba values
  vzhladFarbaVynikajuce: {
    type: String,
    required: true,
  },
  vzhladFarbaVelmiDobre: {
    type: String,
    required: true,
  },
  vzhladFarbaDobre: {
    type: String,
    required: true,
  },
  vzhladFarbaUspokojive: {
    type: String,
    required: true,
  },
  vzhladFarbaNedostatocne: {
    type: String,
    required: true,
  },

  //Vona intenzita values
  vonaIntenzitaVynikajuce: {
    type: String,
    required: true,
  },
  vonaIntenzitaVelmiDobre: {
    type: String,
    required: true,
  },
  vonaIntenzitaDobre: {
    type: String,
    required: true,
  },
  vonaIntenzitaUspokojive: {
    type: String,
    required: true,
  },
  vonaIntenzitaNedostatocne: {
    type: String,
    required: true,
  },

  //Vona cistota values
  vonaCistotaVynikajuce: {
    type: String,
    required: true,
  },
  vonaCistotaVelmiDobre: {
    type: String,
    required: true,
  },
  vonaCistotaDobre: {
    type: String,
    required: true,
  },
  vonaCistotaUspokojive: {
    type: String,
    required: true,
  },
  vonaCistotaNedostatocne: {
    type: String,
    required: true,
  },

  //Vona harmonia values
  vonaHarmoniaVynikajuce: {
    type: String,
    required: true,
  },
  vonaHarmoniaVelmiDobre: {
    type: String,
    required: true,
  },
  vonaHarmoniaDobre: {
    type: String,
    required: true,
  },
  vonaHarmoniaUspokojive: {
    type: String,
    required: true,
  },
  vonaHarmoniaNedostatocne: {
    type: String,
    required: true,
  },

  //Chut intenzita values
  chutIntenzitaVynikajuce: {
    type: String,
    required: true,
  },
  chutIntenzitaVelmiDobre: {
    type: String,
    required: true,
  },
  chutIntenzitaDobre: {
    type: String,
    required: true,
  },
  chutIntenzitaUspokojive: {
    type: String,
    required: true,
  },
  chutIntenzitaNedostatocne: {
    type: String,
    required: true,
  },

  //Chut cistota values
  chutCistotaVynikajuce: {
    type: String,
    required: true,
  },
  chutCistotaVelmiDobre: {
    type: String,
    required: true,
  },
  chutCistotaDobre: {
    type: String,
    required: true,
  },
  chutCistotaUspokojive: {
    type: String,
    required: true,
  },
  chutCistotaNedostatocne: {
    type: String,
    required: true,
  },

  //Chut harmonia values
  chutHarmoniaVynikajuce: {
    type: String,
    required: true,
  },
  chutHarmoniaVelmiDobre: {
    type: String,
    required: true,
  },
  chutHarmoniaDobre: {
    type: String,
    required: true,
  },
  chutHarmoniaUspokojive: {
    type: String,
    required: true,
  },
  chutHarmoniaNedostatocne: {
    type: String,
    required: true,
  },

  //Chut perzistencia values
  chutPerzistenciaVynikajuce: {
    type: String,
    required: true,
  },
  chutPerzistenciaVelmiDobre: {
    type: String,
    required: true,
  },
  chutPerzistenciaDobre: {
    type: String,
    required: true,
  },
  chutPerzistenciaUspokojive: {
    type: String,
    required: true,
  },
  chutPerzistenciaNedostatocne: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("configuration", configurationGetTemplate);
