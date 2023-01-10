const bodyParser = require("body-parser");
const lancamentos = require("./lancamentosRoute.js");
const niveis = require("./niveisRoute.js");
const colaboradores = require("./colaboradoresRoute.js");
const bicicletas = require("./bicicletasRoute.js");



module.exports = (app) => {
  app.use(bodyParser.json(), lancamentos, niveis, colaboradores, bicicletas);
};
