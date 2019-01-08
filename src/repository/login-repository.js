'use strict'

const user = require('../../src/models/login-model')


exports.create = async (data) => {

    
    let User = user.build(data);

    const res = await User.save();

    return res;

}

exports.update = async (id,data) => {

    const res = await


    user.update({

        user: data.user,
        email: data.email,
        password: data.password,
        role: data.role,
        inativo: data.inativo,
        autorizado: data.autorizado,
        unidade: data.unidade,
    } , {
        where:{
            id:id
        }
    })
        return res;
}


exports.authenticate = async (data) => {

    const res = await
        user.findOne({

            where: {
                user: data.user,
                password: data.password,

            }

        })

    return res;

}


exports.get = async () => {
    const res = await
    user.findAll()
    return res;
}