'use strict'

const Repository = require('../repository/responses-repository')


exports.addNewResponse = async (req, res, next) => {

    try {

        let object = req.query || req.body || req.params
        console.log(object)
        let data =
            await Repository.addNewReponse(object)
        res.status(200).send(data)

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}


exports.update = async (req, res, next) => {

    try {

        let object = req;
        
        let data =
            await Repository.update(object)
           return data;
    
    } catch (e) {
        
        console.log(e)
        throw new Error(e)
     }

}