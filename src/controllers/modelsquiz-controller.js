'use strict'

const Repository = require('../repository/modelsquiz-repository')
const authService = require('../services/auth-service')


exports.addNewModel = async (req, res, next) => {

    try {
        let object = req.body || req.params
        let data =
            await Repository.addNewModel(object)
        res.status(200).send({
            message:"Modelo Adicionado com Sucesso"
        })
    } catch (e) {
        
    }
}