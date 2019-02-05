'use strict'

const Questions = require('../../src/models/ItensCheckListModelos-models')


exports.addNewQuestion = async (object) => {

    let error = false;

    let question = object.Question

    let veryfy =
        await Questions.findAll({
            raw: true,
            where: {
                Descricao: question
            }
        })

    await veryfy.forEach(res => {

        if (question != res.Descricao) {

            let saveQuestion =
                Questions.build({

                    Descricao: question,
                })

            error = false;

            let res =
                saveQuestion.save()

            return error;

        } else {

            error = true;
            return new Error(error);
        }
    })

    return error;

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
                {where: {id: res.id} }
                )
        return update;

    } catch (e) {

        console.log(e)
        return new Error(e);
    }
}
