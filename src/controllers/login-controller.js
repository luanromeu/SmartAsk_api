'use strict'

const Repository = require('../repository/login-repository')
const authService = require('../services/auth-service')
const md5 = require('md5');

exports.post = async(req, res, next) => {
    try {
            await Repository.create({
            user: req.body.user,
            password: md5(req.body.password),
            email:req.body.email,
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
};

exports.authenticate = async(req, res, next) => {
    try {
        const user = await Repository.authenticate({
            user: req.body.user,
            password: md5(req.body.password)
        });

        if (!user) {
            res.status(401).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        
        const token = await authService.generateToken({
            id: user.id,
            user: user.user,
            role: user.role,
            email:user.email,
            Autorizado:user.Autorizado
        });
            res.status(201).send({
            token: token,
            data: {
                user: user.user,
                password: user.password,
                role: user.role,
                email:user.email,
                Autorizado:user.Autorizado
                
            }
        });
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
        var data = await Repository.get()
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    };
};
