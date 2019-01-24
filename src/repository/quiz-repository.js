'use strict'

const sequelize = require('sequelize')
const Sequelize = require('../db')

const Quiz = require('../../src/models/Questionarios-models')

exports.listQuiz = async () => {

    try {

        let res =
            await Quiz.findAll({ 
                    
                attributes: ['id', 'nome'],
                where: Sequelize.or(
                    {Inativo: 0},
                    {Inativo: null}
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
                + ' WHERE Q.id = ' + idQuiz + ''

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

