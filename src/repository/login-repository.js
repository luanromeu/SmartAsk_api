'use strict'
const user = require('../../src/models/login-model')


exports.create = async (data) => {

    let User = user.build(data);

    const res = await User.save();

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