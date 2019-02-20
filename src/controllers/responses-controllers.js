'use strict'

const Repository = require('../repository/responses-repository')


exports.addNewResponse = async (req, res, next) => {

    try {

        let object = req.query || req.body || req.params
        let idquestion = req.query.idquestion
        object = JSON.parse(req.query.response)
        
        
        let data =
            await Repository.addNewReponse(object,idquestion)
        res.status(200).send(data)

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}


exports.update = async (req, res, next) => {

    try {
        let object = req;
        let responses = req.responses;
       
        
        let data =
            await Repository.update(object,responses)
           return data;
    
    } catch (e) {
        
        console.log(e)
        throw new Error(e)
     }

}