'use strict'



exports.create = async (req, res, next) => {

    try {
        let res =
            await Repository.create()
        res.status(200).send({
            message: "Descrição Cadastrada com Sucesso"
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Falha ao cadastrar descrição... Tente novamente"
        })
    }
}

exports.listmodels = async (req, res, next) => {
    try {
        let data =
            await Repository.listmodels()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Erro ao listar modelos"
        })
        console.log(e)
        throw new Error(e)
    }
}

