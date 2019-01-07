'use strict'

const Repository = require('../repository/machines-repository')
const ftp = require('../services/ftp-service')


exports.list = async (req, res, next) => {

    try {
        var data =
            await Repository.get()
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
        console.log(error)
    }

}

exports.listByAF = async (req, res, next) => {

    try {

        let AF = req.params.AF
        console.log(AF)
        let data = await
            Repository.getByAf(AF)

        let array = [];
        let rearangeArray = [];

        console.log(data)
        data.forEach(res => {

            let index = rearangeArray.indexOf(res.Perguntas)

            if (index == -1) {

                let respostas = [];

                data.forEach(res2 => {

                    if (res.Perguntas == res2.Perguntas) {

                        if (respostas.indexOf(res2.Respostas) == -1)
                            respostas.push(res2.Respostas)

                    }
                })

                array.push({
                    perguntas: res.Perguntas, idModelo: res.idModelo, Altura:res.Altura, AF:res.CodigoExibicao,
                    TipoModelo:res.TipoModelo, idMaquinas: res.idMaquinas, observacao: res.Observacao, resposta: "", horimetro: "",
                    respostas: respostas,
                })

                rearangeArray.push(res.Perguntas);

            }
        })
        res.status(200).send(array)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}

exports.listByModel = async (req, res, next) => {

    try {
        var Modelo = req.params.Modelo;
        console.log(Modelo)
        var data =
            await Repository.listByModel(Modelo)

        let perguntas = [];
        let modelo;
        let array = [];


        await data.forEach(res => {

            if (data.indexOf(res.Descricao) == -1) {
                modelo = res.Modelo;
                data.forEach(res2 => {

                    if (res.Descricao == res2.Descricao) {

                        if (perguntas.indexOf(res2.Descricao) == -1) {

                            perguntas.push(res2.Descricao)
                            
                        }
                    }
                    
                })
              
            }
          
        })  
        array.push({ Modelo:modelo, Perguntas: perguntas })

        res.status(200).send(array)
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}

exports.PostOut = async (req, res) => {

    try {

        let data = req.body

        await Repository.PostOutmachines(data)
            .catch((e) => { throw new Error(e) })
        res.status(200).send({
            message: "Saida cadastrada com sucesso"

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao pŕocessar requisição"
        })
    }
}

exports.listMachinesOut = async (req, res, next) => {
    try {
        let AF = req.params.AF
        let data =
            await Repository.listMachinesOut(AF)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Erro ao listar Saida de Maquinas"
        })
        console.log(e)
        throw new Error(e)
    }
}