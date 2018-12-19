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
