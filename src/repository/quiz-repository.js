'use strict'

const sequelize = require('sequelize')
const Sequelize = require('../db')
const Quiz = require('../../src/models/Questionarios-models')
const Questions = require('../../src/models/ItensCheckListModelos-models')
const QuestionQuiz = require('../../src/models/PerguntasQuestionarios-models')
const ModelQuiz = require('../models/ModelosQuestionarios-models')
const Models = require('../models/Modelos-models')

exports.listQuiz = async () => {

    try {

        let res =
            await Quiz.findAll({

                attributes: ['id', 'nome'],
                where: Sequelize.or(
                    { Inativo: 0 },
                    { Inativo: null }
                )
            })


        return res

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }

}

exports.QuizDetails = async (idQuiz) => {

    try {

        let res =
            await Sequelize.query(

                ' SELECT Mo.Modelo , ICM.Descricao AS Perguntas FROM ModelosQuestionarios MQ' + "\n"
                + ' INNER JOIN Modelos Mo ON  MQ.idModelos = Mo.id' + "\n"
                + ' INNER JOIN Questionarios Q ON MQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN PerguntasQuestionarios PQ ON PQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON PQ.idItensCheckListModelos = ICM.id'
                + ' WHERE (Q.id = ' + idQuiz + ' AND Q.Inativo = 0 OR Q.Inativo IS NULL)'

                , { type: Sequelize.QueryTypes.SELECT })

        return res;

    } catch (e) {

    }
}

exports.NewQuiz = async (object) => {

    try {

        let SaveName =
            await Quiz.build({
                nome: object.Name
            })

        let res =
            await SaveName.save()

        return res;

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


exports.listQuestions = async () => {

    try {

        let res =
            await Questions.findAll({
                attributes: ['Descricao'],
                group:['Descricao']
                
            })

        return res;

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


exports.deleteQuiz = async (id) => {

    try {

        let res =
            await Quiz.update(
                { Inativo: 1 },
                { where: { id: id } }
            )
        console.log(res)
        return res;
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


exports.addQuestionQuiz = async (object) => {

    try {



        let Question = String(object.Question)
        let idQuestion =
            await Questions.findOne({
                raw: true,
                attributes: ['id', 'Descricao'],
                where: {
                    Descricao: Question
                }
            })

        idQuestion = idQuestion.id

        let NewQuestionQuiz =
            await QuestionQuiz.build({

                idQuestionario: object.idQuiz,
                idItensCheckListModelos: idQuestion
            })

        let res = await
            NewQuestionQuiz.save();

            return res

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


exports.addNewModel = async (object) => {

    try {

        let Model = 
            await ModelQuiz.build({
            
                idQuestionario: object.idQuestionario,
                idModelos: object.idModelo
            })

        let res =
            await Model.save()   
    return res

    } catch (e) {

        console.log(e)
        throw new Error(e)

    }
}

exports.removeQuestion = async(object) => {

    try {   
        let Question = String(object.Question)
         let res =
            await Questions.findOne({
                raw: true,
                attributes:['Descricao' , 'id'],
                where: {
                    Descricao: Question
                }
            })
        let id = res.id
        let remove = 
            await QuestionQuiz.destroy({
                where:{
                    idItensCheckListModelos: id
                }
            })

         
        return remove;

    } catch (e) {
     
        console.log(e)
        throw new Error(e)
        
    }
}

exports.removeModel = async(object) => {

    try {   
        let Model = String(object.Model)
         let res =
            await Models.findOne({
                raw: true,
                attributes:['id','Modelo'],
                where: {
                    Modelo: Model
                }
            })
        let id = res.id
        let remove = 
            await ModelQuiz.destroy({
                where:{
                    idModelos: id
                }
            })

         
        return remove;

    } catch (e) {
     
        console.log(e)
        throw new Error(e)
        
    }
}