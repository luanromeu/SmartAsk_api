'use strict'

const Repository = require('../repository/users-repository')
const md5 = require('md5');
const authService = require('../services/auth-service')


exports.new = async (req, res, next) => {

    try {
        let user = req.body;
        user.password = md5(user.password);
        let data =
            await Repository.new(user)
        res.status(200).send({
            message: 'Usuario Cadastrado com sucesso'
        })

    } catch (e) {

        res.status(500).send({ message: 'Erro ao criar usuario', e },
            console.log(e))
        throw new Error(e)
    }
}

exports.list = async (req, res, next) => {

    try {

        let data =
            await Repository.list()
        res.status(200).send(data)

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}

exports.authenticate = async (req, res, next) => {

    try {
       
        const user = await
         Repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password)
        });

        console.log(user)
        if (!user) {
            res.status(401).send({
                message: 'Usuário ou senha inválidos'
            });

            throw new Error;
        }

        if (user.role == 'admin')
            user.role = md5(user.role)

        const token = await authService.generateToken({
            id: user.id,
            user: user.user,
            role: user.role,
            email: user.email,

        });
        res.status(201).send({
            token: token,
            data: {
                user: user.user,
                password: user.password,
                role: user.role,
                email: user.email

            }
        });

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }

}