'use strict'


const authService = require('../services/auth-service')


exports.listQuiz = async (req, res, next) => {

    try {

        let data =
            await Repository.listQuiz()
        res.status(200).send(data)

    } catch (e) {
        res.status(400).send({
            message:"Erro ao listar questionarios"
        })
        console.log(e)
        throw new Error(e)

    }
}

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
                                Perguntas:res2.Descricao,
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
            message:"Erro ao listar Perguntas"
        })
        console.log(e)
        throw new Error(e)
    }
}


exports.QuizDetails = async (req, res, next) => {

    try {

        let array = []
        let questions = []
        let models = []
        let idQuiz = req.params.id;

        let data =
            await Repository.QuizDetails(idQuiz)
       
        data.forEach(result => {
          

            let index = data.findIndex(resultfind =>  resultfind.Modelo === result.Modelos)
                
           if (index === -1) {

                data.forEach(result2 => {
                    
                    if (result.Modelo === result2.Modelo) {
                    
                    let index2 = models.findIndex(resultf2 => resultf2.Modelo === result2.Modelo )
                        
                        if ( index2 === -1) {
                   
                            models.push({Modelo:result2.Modelo, id:result2.id})

                        }

                    }
                   
                    if (result.Perguntas === result2.Perguntas) {

                        let index3 = questions.findIndex(resultf3 => resultf3.Perguntas === result2.Perguntas )
                    
                        if ( index3 === -1) {
                            
                            questions.push({Perguntas:result2.Perguntas, id:result2.idPergunta})
                        }
                    }
                })

            }
        });
              
        array.push(models,questions)
       res.status(200).send(array)

    } catch (e) {
        res.status(400).send({
            message:"Erro ao listar detalhes dos questionarios"
        })
        console.log(e)
        throw new Error(e)
        

    }
}


exports.NewQuiz = async (req, res, next) => {

    try {

        let object = req.body;
        let data =
            await Repository.NewQuiz(object)

        res.status(200).send(data);

    } catch (e) {
        res.status(400).send({
            message:"Erro ao criar questionario"
        })
        console.log(e)
        throw new Error(e)
    }
}


exports.deleteQuiz = async (req, res, next) => {

    try {

        let id = req.body.id || req.params.id
        let data =
            await Repository.deleteQuiz(id)
        res.status(200).send({
            message: "Questionario Deletado com Sucessos"
        })
    } catch (e) {
        res.status(400).send({
            message:"Erro ao excluir questionario"
        })
        console.log(e)
        throw new Error(e)
    }
}

exports.addQuestionQuiz = async (req, res, next) => {

    try {
        let object = req.body
        let data =
            await Repository.addQuestionQuiz(object)
        res.status(200).send({
            message: "Pergunta adicionada com sucesso"
        })
    } catch (e) {
        res.status(400).send({
            message:"Erro ao adicionar Pergunta ao questionario"
        })
        console.log(e)
        throw new Error(e)
    }
}


exports.addNewModel = async (req, res, next) => {

    try {
        let object = req.body || req.params
        let data =
            await Repository.addNewModel(object)
        res.status(200).send({
            message:"Modelo Adicionado com Sucesso"
        })
    } catch (e) {
        res.status(400).send({
            message:"Erro ao adicionar Modelo"
        })
        console.log(e)
        throw new Error(e)
    }
}




exports.removeQuestion = async(req, res, next) => {

    try {
        let object = req.query
        console.log(object)
        let data =
            await Repository.removeQuestion(object)
            res.status(200).send({
                message:"Pergunta removida com sucesso"
            })
    } catch (e) {
        res.status(400).send({
            message:"Erro ao remover pergunta"
        })
        console.log(e)
        throw new Error(e)
    }
}

exports.removeModel = async(req, res, next) => {

    try {
        let object = req.query
            console.log(object)
        let data =
            await Repository.removeModel(object)
            res.status(200).send({
                message:"Modelo removido com sucesso"
            })
    } catch (e) {
        res.status(400).send({
            message:"Erro ao remover Modelo"
        })
        console.log(e)
        throw new Error(e)
    }
}

exports.listQuizByAf = async (req, res, next) => {
    
    try {
        
        let id = req.body.id || req.params.id
        
        let data = 
            await Repository.listQuizByAF(id)
        
            res.status(200).send(data)

    } catch (e) {
        
        console.log(e)
        res.status(500).send({
            message: e.message
        })
    }
}