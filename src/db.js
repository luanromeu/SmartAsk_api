'use strict'


const Sequelize = require('sequelize');
const sequelize = new Sequelize('tetsiste_checklist', 'tetsistemas_t', 'T&TSistemas2007', {
  host: '189.7.97.7',
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: '-03:00', // for writing to database

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
