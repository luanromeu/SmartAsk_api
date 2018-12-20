'use strict'

const machines = require('../models/Maquinas-models')
const machinesmodels = require('../models/Modelos-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')


exports.get = async () => {
    const sql =
        'SELECT Ma.CodigoExibicao as AF, TM.TipoModelo, Substring(Mo.ApelidoOLD, 4, 2) as Altura ' + "\n"
        + 'FROM Modelos Mo ' + "\n"
        + 'INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
        + 'INNER JOIN TiposModelos TM ON Mo.idTiposModelos = TM.id ' + "\n"
        + 'WHERE COALESCE(Mo.Inativo, 0) = 0 AND COALESCE(Ma.Inativo, 0) = 0 ' + "\n"
        + 'AND COALESCE(TM.Inativo, 0) = 0 '
    const result = await
        Sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
    return result;
}


exports.getByAf = async (AF) => {
    const sql =
        'SELECT Ma.CodigoExibicao, Mo.Modelo, Mo.id AS idModelo, Mo.Observacao, ICM.Descricao AS Perguntas, '
        + ' AM.Apelido, SC.Descricao AS Respostas, Substring(Mo.ApelidoOLD, 4, 2) AS Altura, ' + "\n"
        + ' Ma.id' + "\n"
        + ' FROM CheckListModelos CM ' + "\n"
        + ' INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id ' + "\n"
        + ' INNER JOIN ApelidosModelos AM ON idCheckListModelos = AM.id ' + "\n"
        + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = ICM.idGruposStatusCheckList ' + "\n"
        + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
        + ' INNER JOIN Modelos Mo ON CM.idModelos = Mo.id ' + "\n"
        + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
        + ' WHERE Ma.CodigoExibicao = ' + AF

    const result = await
        Sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
    return result;
}


exports.PostOut = async (data) => {
    

    const InsertSaidasMaquinasChecklists =
        'INSERT INTO SaidasMaquinasCheckLists ' + "\n"
        + ' (idMaquinas , Horimetro, Observacao) ' + "\n"
        + ' VALUES (' + data.id + ',' + data.Horimetro + ',' + "'" + data.Observacao + "'" + ')';

    const UltimoItemInseridoSaidasMaquinas = 
        'SELECT id FROM SaidasMaquinasCheckLists ORDER BY id DESC LIMIT 1 '

    const InsertCheckListModelos = 
        'INSERT INTO CheckListModelos (idModelos) VALUES ('+ data.idModelo+')'

    const UltimoItemInseridoCheckListModelos = 
        'SELECT id FROM CheckListModelos ORDER BY id DESC LIMIT 1 ' 

     const result =

    //await Sequelize.query(InsertSaidasMaquinasChecklists, { type: sequelize.QueryTypes.INSERT })
   
    await Sequelize.query(UltimoItemInseridoSaidasMaquinas, {type:sequelize.QueryTypes.SELECT})
      
   // await Sequelize.query(InsertCheckListModelos, {type:sequelize.QueryTypes.INSERT})
   
    await Sequelize.query(UltimoItemInseridoCheckListModelos, {type:sequelize.QueryTypes.SELECT})   
    console.log(result)
    return;


}