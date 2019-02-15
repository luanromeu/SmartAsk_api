'use strict'
const sequelize = require('sequelize')
const Sequelize = require('../db')
const model = require('../models/TiposModelos-models') 

exports.create = async() => {
    try {
        let res =
         await  Sequelize.query(' ',{type:sequelize.QueryTypes.INSERT})
         return res;
    } catch (e) {
        console.log(e)
        throw new Error (e)
    }
}


exports.listmodels = async () => {
    try {
        let res =
         await model.findAll()
         return res;         
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}