'use strict'




exports.create = async(req, res, next) => {
    try {
            await Repository.create({
            nome: req.body.nome
          
            
        });
        
        res.status(201).send({
        
            message: 'Empresa cadastrada com sucesso!'
        });
    } catch (e) {
        console.log(e)
        
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

