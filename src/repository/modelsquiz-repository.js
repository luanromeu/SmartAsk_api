'use strict'

const sequelize = require('sequelize')
const Sequelize = require('../db')

const QuestionQuestionnaire = require('../models/ModelosQuestionarios-models')

exports.addNewModel = async (object) => {

    try {

        let Model = 
            await QuestionQuestionnaire.build({
            
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