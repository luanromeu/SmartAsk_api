'use strict'

const Repository = require ('../repository/machines-repository')


exports.list = async (req, res, next) => {

    try {
        var data = await
        Repository.get()
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({
            message:"Falha ao processar requisição"
        })
        console.log(error)
    }

}

exports.listByAF = async (req, res ,next) => {

    try {

        let AF = req.params.AF
        console.log(AF)
        var data = await
        Repository.getByAf(AF)  
        res.status(200).send(data)            
    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Falha ao processar requisição"
        })
    }
}

exports.PostOut = async (req, res) => {

    try {

        var data = req.body
        Repository.PostOut(data)
        res.status(200).send({
            message:"Saida cadastrada com sucesso"
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Falha ao pŕocessar requisição"
        })
    }
}
