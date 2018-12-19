'use strict'

const machines = require ('../models/Maquinas-models')
const machinesmodels = require ('../models/Modelos-models')
const sequelize = require ('sequelize')
const Sequelize = require ('../db')


exports.get = async () =>{
    const sql = 
       'SELECT Ma.CodigoExibicao as AF, TM.TipoModelo, Substring(Mo.ApelidoOLD, 4, 2) as Altura ' + "\n"
     + 'FROM Modelos Mo ' + "\n"
     + 'INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
     + 'INNER JOIN TiposModelos TM ON Mo.idTiposModelos = TM.id '+ "\n"
     + 'WHERE COALESCE(Mo.Inativo, 0) = 0 AND COALESCE(Ma.Inativo, 0) = 0 '+ "\n"
     + 'AND COALESCE(TM.Inativo, 0) = 0 '
    const res = await
    Sequelize.query(sql , {type: sequelize.QueryTypes.SELECT})
    return res;
}