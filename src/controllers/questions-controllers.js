'use strict'

const Repository = require('../repository/questions-repository');
const Responses = require('../controllers/responses-controllers')

exports.listQuestions = async (req, res, next) => {

    try {

        let perguntas = []
        let data =
            await Repository.listQuestions()
        JSON.stringify(data)
        data.forEach(res => {

            let index = data.indexOf(res.Descricao)

            if (index == -1) {

                data.forEach(res2 => {

                    if (res.Descricao == res2.Descricao) {

                        if (perguntas.indexOf(res2.Descricao) == -1) {

                            perguntas.push({
                                Perguntas: res2.Descricao,
                                id: res2.id
                            })
                        }
                    }
                })
            }
        })
        res.status(200).send(perguntas)
    } catch (e) {
        res.status(400).send({
            message: "Erro ao listar Perguntas"
        })
        console.log(e)
        throw new Error(e)
    }
}





exports.listTasksAndResponses = async (req, res, next) => {

    try {
        let respostas = []
        let idquestion = req.query.id
        let data =
            await Repository.listTasksAndResponses(idquestion)
     
        data.forEach(res => {

            let index = data.indexOf(res.Respostas)
            if (index === -1) {

                data.forEach(res2 => {
                    if (res.Respostas === res2.Respostas) {
                        let index2 = respostas.indexOf(res2.Respostas)
                        if (index2 === -1) {
                            respostas.push(res2.Respostas)
                        }
                    }
                })
            }
        })
        res.status(200).send(respostas)

    } catch (e) {

        console.log(e)
        res.status(500).send({
            message: e.message
        })
    }
}

exports.addNewQuestion = async (req, res, next) => {

    try {
        let object = req.query
        let array = JSON.parse(req.query.responses)
        
        let error =
            await Repository.addNewQuestion(object)


        if (error === true) {
           
        let update =
         await Responses.update(object, array)

         res.status(200).send({
             message:"Respostas atualizadas com sucesso",
             error,
             update
            })

        } else {

            res.status(200).send({
                message: "Pergunta cadastrada com sucesso",
                error

            })
       }



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
            message: " Pergunta removida com sucesso"
        })

    } catch (e) {

        console.log(e)
        res.status(500).send({
            message: e.message
        })
    }
}

