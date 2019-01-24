'use strict'

const Repository = require('../repository/quiz-repository')
const authService = require('../services/auth-service')


exports.listQuiz = async (req, res, next) => {

    try {   

       let data = 
        await Repository.listQuiz()
        res.status(200).send(data)

    } catch (e) {

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
        await  Repository.QuizDetails(idQuiz)

            data.forEach(result => {

                questions.push(result.Perguntas)

                let index = data.indexOf(result.Modelo)

                        if (index == -1){

                             data.forEach(result2 =>{
                                  
                               if ( result.Modelo == result2.Modelo){
                                     
                                    if (models.indexOf(result2.Modelo) == -1){
                                        
                                        models.push(result2.Modelo)
                                    }
                                }
                             })
                            
                        }
                 });

                 array.push(models)
                 array.push(questions)

        res.status(200).send(array)

    } catch (e) {

        console.log(e)
        throw new Error(e)
        
    }
}


exports.NewQuiz = async(req, res, next) => {

    try {
        
        let object = req.body;
        let data =
            await Repository.NewQuiz(object)

            res.status(200).send(data);

    } catch (e) {
        
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
            message:"Questionario Deletado com Sucessos"
        })
    } catch (e) {
       
        console.log(e)
        throw new Error(e)
    }
}