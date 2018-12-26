'use strict'

const Repository = require('../repository/machines-repository')


exports.list = async (req, res, next) => {

    try {
        var data = await
            Repository.get()
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
        
                    array.push({ perguntas: res.Perguntas, respostas: respostas })
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

exports.PostOut = async (req, res) => {

    try {

        var data = req.body
        console.log(data)
        Repository.PostOut(data)
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
