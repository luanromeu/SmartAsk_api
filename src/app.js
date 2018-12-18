'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const global = require('../config')
const Sequelize = require('sequelize');



// Define tamnaho maximo JSON 
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header ('Access-Control-Allow-Credentials'), true
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

//Carrega Models
const dblogin = require ('../src/db')
const mlogin = require ('../src/models/login-model')
const SaidasMaquinasCheckList = require ('../src/models/saidasmaquinaschecklist-model')
const SaidasMaquinasItensCheckList = require ('../src/models/SaidasMaquinasItensCheckList-models')
const SaidasMaquinasItensFotosCheckList = require ('../src/models/SaidasMaquinasItensFotosCheckList-models')
const SaidasMaquinasFotosCheckList = require ('../src/models/SaidasMaquinasFotosCheckList-models')
const StatusCheckList = require ('../src/models/StatusCheckList-models')
const GruposStatusCheckList = require ('../src/models/GruposStatusCheckList-models')
const CheckListModelos = require ('../src/models/CheckListModelos-models')
const ItensCheckListModelos = require ('../src/models/ItensCheckListModelos-models')
const FotosCheckListModelos = require ('../src/models/FotosCheckListModelos-models')
const EntradasMaquinasCheckList = require ('../src/models/EntradasMaquinasCheckList-models')
const EntradasMaquinasItensCheckList = require ('../src/models/EntradasMaquinasItensCheckList-models')
const EntradasMaquinasFotosCheckList = require ('../src/models/EntradasMaquinasFotosCheckList-models')
const EntradasMaquinasItensFotosCheckList = require ('../src/models/EntradasMaquinasItensFotosCheckList-models')
const Maquinas = require ('../src/models/Maquinas-models')
const Modelos = require ('../src/models/Modelos-models')
const TiposModelos = require ('../src/models/TiposModelos-models')

//Carrega Rotas
const loginroute = require ('../src/routes/login-routes')
app.use('/login', loginroute)

module.exports = app;