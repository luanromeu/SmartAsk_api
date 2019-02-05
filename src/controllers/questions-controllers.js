'use strict'

const Repository = require('../repository/questions-repository')


exports.addNewQuestion = async (req, res, next) => {

    try {
        let object = req.body
       
        let error =
            await Repository.addNewQuestion(object)
    
            if (error != true)
       
            res.status(200).send({
                message:"Pergunta cadastrada com sucesso"
            })

        throw new Error("Essa pergunta já existe..")
        
    } catch (e) {

        console.log(e)
        res.status(500).send({
            message: e.message
        })
    }

};

exports.removeQuestion = async (req, res, next) => {
    
    try {

        let object = req.body || req.params
        let data =
            await Repository.removeQuestion(object)

            res.status(200).send({
                message:" Pergunta removida com sucesso"
            })

    } catch (e) {
        
        console.log(e)
        res.status(500).send({
            message: e.message
        })
    }
}

