'use strict'

const sequelize = require('sequelize')
const Sequelize = require('../db')
const Quiz = require('../../src/models/Questionarios-models')
const Questions = require('../../src/models/ItensCheckListModelos-models')
const QuestionQuiz = require('../../src/models/PerguntasQuestionarios-models')
const ModelQuiz = require('../models/ModelosQuestionarios-models')
const Models = require('../models/Modelos-models')
const Machines = require('../../src/models/Maquinas-models')

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

                  ' SELECT Concat(Mo.Modelo," - ",Ma.CodigoExibicao) AS Modelo, Mo.id, ICM.Descricao AS Perguntas, ICM.id AS idPergunta FROM ModelosQuestionarios MQ ' + "\n"
                + ' INNER JOIN Modelos Mo ON  MQ.idModelos = Mo.id' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id'
                + ' INNER JOIN Questionarios Q ON MQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN PerguntasQuestionarios PQ ON PQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON PQ.idItensCheckListModelos = ICM.id' + "\n"
                + ' WHERE Q.id = ' + idQuiz + ' AND (Q.Inativo = 0 OR Q.Inativo IS NULL) ' + "\n"
                + ' AND (PQ.Inativo = 0 OR PQ.Inativo IS NULL) AND (MQ.Inativo = 0 OR MQ.Inativo IS NULL )' + "\n"
                + ' ORDER BY PQ.id ASC'

                , { type: Sequelize.QueryTypes.SELECT })

        return res;

    } catch (e) {
        console.log(e)
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

        let question =
            await QuestionQuiz.find({
                raw: true,
                where: sequelize.and(
                    { idItensCheckListModelos: object.idQuestion },
                    { idQuestionario: object.idQuiz}
                )
            })
          

         if (!question) {
        

            let NewQuestionQuiz =
                await QuestionQuiz.build({

                    idQuestionario: object.idQuiz,
                    idItensCheckListModelos: object.idQuestion
                })

            let res = await
                NewQuestionQuiz.save();

            return res;

         } else {
          
            let update =
                await QuestionQuiz.update(
                    { Inativo: 0 },
                    { where: sequelize.and(

                        { idQuestionario: object.idQuiz },
                        { idItensCheckListModelos: object.idQuestion }
                    )}
                )
            return update;
         }



    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}






exports.addNewModel = async (object) => {

    try {

        let model =
            await ModelQuiz.find({
                raw: true,
                where: sequelize.and(
                    
                    { idModelos: object.idModelo },
                    { idQuestionario: object.idQuestionario }
                    
                    
                    )
            })

        if (!model) {


            let Model =
                await ModelQuiz.build({

                    idQuestionario: object.idQuestionario,
                    idModelos: object.idModelo
                })

            let res =
                await Model.save()
            return res

        } else {

            let update =
                await ModelQuiz.update(
                    { Inativo: 0 },
                    { where: sequelize.and(
                        { idQuestionario: object.idQuestionario },
                        { idModelos: object.idModelo }
                    )}
                )
            return update;
        }


    } catch (e) {

        console.log(e)
        throw new Error(e)

    }
}

exports.removeQuestion = async (object) => {

    try {
        
        

        let remove =
            await QuestionQuiz.update(
                { Inativo: 1 },
                { where: sequelize.and(

                    { idItensCheckListModelos: object.idquestion },
                    { idQuestionario: object.idquiz} 
                ) 
            })


        return remove;

    } catch (e) {

        console.log(e)
        throw new Error(e)

    }
}

exports.removeModel = async (object) => {

    try {

        
        let remove =
            await ModelQuiz.update(
                { Inativo: 1 },
                { where: sequelize.and(

                    { idModelos: object.idmodel },
                    { idQuestionario: object.idquiz} 
                 ) 
                })
        return remove;

    } catch (e) {

        console.log(e)
        throw new Error(e)

    }
}



exports.listQuizByAF = async (id) => {
    try {

        let res =  
            await Sequelize.query(
                 ' SELECT Q.nome, Q.id, Ma.id AS idMaquina ' + "\n"
                +' FROM PerguntasQuestionarios PQ '  + "\n"
                +' INNER JOIN Questionarios Q ON PQ.idQuestionario = Q.id ' + "\n"
                +' INNER JOIN ModelosQuestionarios MQ ON MQ.idQuestionario = Q.id ' + "\n"
                +' INNER JOIN Modelos Mo ON MQ.idModelos = Mo.id ' + "\n"
                +' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                +' WHERE Ma.CodigoExibicao = '+id+' AND (MQ.Inativo = 0 OR MQ.Inativo IS NULL ) ' + "\n"
                +' AND ( Q.Inativo = 0 OR Q.Inativo IS NULL)'
                +' GROUP BY Q.nome '
            ,{type:sequelize.QueryTypes.SELECT})

    
        return res

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}




