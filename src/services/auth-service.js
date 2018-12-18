'use strict';
const jwt = require('jsonwebtoken');
global = require ('../../config')


exports.generateToken = async (data) => {
   
    const result = await
     jwt.sign(data ,global.SALT_KEY,{ expiresIn: '365d' });
     
     return result;
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(req.headers['x-access-token'])
    
    if (!token) {
        res.status(401).json({
            message: 'Access Denied'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    }
};

exports.verifyToken = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    console.log(req.headers['x-access-token'])
    
    if (!token) {
        res.status(401).json({
            message: 'Access Denied'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};