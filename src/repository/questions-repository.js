'use strict'

const Questions = require('../../src/models/ItensCheckListModelos-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')


exports.listQuestions = async () => {

    try {

        let res =
            await Questions.findAll({
                attributes: ['Descricao', 'id'],
                group: ['Descricao'],
                order: [['id', 'ASC']]

            })

        return res;

    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

exports.listTasksAndResponses = async (idquestion) => {

    try {

        let res =
            await Sequelize.query(
                
                 ' SELECT ICM.Descricao AS Perguntas, GSC.Grupo, SC.Descricao AS Respostas, ICM.id AS idPergunta ' + "\n"
                +' FROM StatusCheckLists SC ' + "\n"
                +' INNER JOIN GruposStatusCheckLists GSC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
                +' INNER JOIN ItensCheckListModelos ICM ON ICM.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' WHERE ICM.id = ' + idquestion + ''
                

                , { type: sequelize.QueryTypes.SELECT })
        return res;
    } catch (e) {

    }
}

exports.addNewQuestion = async (object) => {

    let error = false;

    let veryfy =
        await Questions.findOne({
            raw: true,
            where: {
                Descricao: object.question
            }
        })

    

    if (veryfy === null) {

        error = false;

        let saveQuestion =
           await Questions.build({

                Descricao: object.question,
            })


        let res =
           await  saveQuestion.save()

        return error , res;

    } else {
        
        error = true;
        return error;


    }

}


exports.removeQuestion = async (object) => {

    try {

        let res =
            await Questions.find({

                raw: true,
                where: {

                    Descricao: object.Question
                }
            })


        let update =
            await Questions.update(

                { Inativo: 1 },
                { where: { id: res.id } }
            )
        return update;

    } catch (e) {

        console.log(e)
        return new Error(e);
    }
}
