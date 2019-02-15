'use strict'

const empresa = require('../../src/models/Empresa-models')

exports.create = async (data) => {

    let Empresa = empresa.build(data);

    const res = await Empresa.save();

    return res;

}