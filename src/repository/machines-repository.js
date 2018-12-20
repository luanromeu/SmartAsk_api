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


exports.getByAf = async (AF) => {
    const sql = 
        'SELECT Ma.CodigoExibicao, Mo.Modelo, Mo.Observacao, ICM.Descricao AS Perguntas, '
     + ' AM.Apelido, SC.Descricao AS Respostas, Substring(Mo.ApelidoOLD, 4, 2) AS Altura ' + "\n"
     + ' FROM CheckListModelos CM ' + "\n"
     + ' INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id ' + "\n"
	 + ' INNER JOIN ApelidosModelos AM ON idCheckListModelos = AM.id '  + "\n"
	 + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = ICM.idGruposStatusCheckList ' + "\n"
	 + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
	 + ' INNER JOIN Modelos Mo ON CM.idModelos = Mo.id ' + "\n"
	 + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
	 + ' WHERE Ma.CodigoExibicao = ' + AF 

    const res = await
    Sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
    return res;
}

exports.PostOut = async (req, res, next) => {

}