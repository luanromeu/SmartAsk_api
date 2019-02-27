'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const global = require('../config')




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

const dblogin = require ('../src/db')
const usersmodel = require ('../src/models/users-models')


//Rotas
const users = require('../src/routes/users-routes')
app.use('/users', users)

module.exports = app;