'use strict'

const Repository = require('../repository/login-repository')
const authService = require('../services/auth-service')
const md5 = require('md5');

exports.post = async (req, res, next) => {

    if (req.body.user) {
        
        try {

            await Repository.create({
                user: req.body.user,
                password: md5(req.body.password),
                autorizado: req.body.autorizado,
                unidade: req.body.unidade,
                email: req.body.email,
                role: req.body.role

            });

            res.status(201).send({

                message: 'Usuario cadastrado com sucesso!'
            });

        } catch (e) {
            console.log(e)

            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    } else {


        res.status(400).send({
            message: 'Insira um usuario Valido'
        })

    }

};


exports.authenticate = async (req, res, next) => {

    try {

        const user = await Repository.authenticate({
            user: req.body.user,
            password: md5(req.body.password)
        });

        if (!user) {
            res.status(401).send({
                message: 'Usuário ou senha inválidos'
            });
            throw new Error(e);
        }

        else if (user.autorizado != 0 && user.inativo == 0) {

            if(user.role == 'admin')
            user.role = md5(user.role)
            
            const token = await authService.generateToken({
                id: user.id,
                user: user.user,
                role: user.role,
                email: user.email,
                autorizado: user.autorizado
            });
            res.status(201).send({
                token: token,
                data: {
                    user: user.user,
                    password: user.password,
                    role: user.role,
                    email: user.email,
                    autorizado: user.autorizado

                }
            });


        } else {
            res.status(401).send({
                message: "Usuario não aprovado ou Inativo"
            })
            return;
        }


    } catch (e) {
        console.log(e);
        console.log(user);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        var data = await
            Repository.get()
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    };
};

exports.UserUpdate = async (req, res, next) => {
    try {
        var id = req.params.id
        var data = req.body
        console.log('CAMPOS ', data)
        console.log('ID USUARIO ', id)
        await Repository.update(id, data)
        res.status(200).send({
            message: "Usuario atualizado com sucesso"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}