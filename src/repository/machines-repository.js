'use strict'

const machines = require('../models/Maquinas-models')
const machinesmodels = require('../models/Modelos-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')

var aux;
var resultUltimoIdGrupoStatusChecklist;
var resultUltimoItemInseridoSaidasMaquinas;
var resultUltimoItemInseridoCheckListModelos;
var bosta;
var resultUltimoIdItensCheckListModelos;
var resultUltimoIdStatusCheckList;





exports.get = async () => {

    const result =
        await
            Sequelize.query(
                'SELECT Ma.CodigoExibicao as AF, TM.TipoModelo, Substring(Mo.ApelidoOLD, 4, 2) as Altura ' + "\n"
                + 'FROM Modelos Mo ' + "\n"
                + 'INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                + 'INNER JOIN TiposModelos TM ON Mo.idTiposModelos = TM.id ' + "\n"
                + 'WHERE COALESCE(Mo.Inativo, 0) = 0 AND COALESCE(Ma.Inativo, 0) = 0 ' + "\n"
                + 'AND COALESCE(TM.Inativo, 0) = 0 '

                , { type: sequelize.QueryTypes.SELECT })
                .catch((e) => {
                    console.log('ERRO AO LISTAR MAQUINAS POR AF ', e)
                    throw new Error(e);
                })
    return result;
}


exports.getByAf = async (AF) => {


    const result =
        await
            Sequelize.query(
                'SELECT Ma.CodigoExibicao, Mo.Modelo, Mo.id AS idModelo, Mo.Observacao, ICM.Descricao AS Perguntas, '
                + ' AM.Apelido, SC.Descricao AS Respostas, Substring(Mo.ApelidoOLD, 4, 2) AS Altura, ' + "\n"
                + ' Ma.id AS idMaquinas , TM.TipoModelo' + "\n"
                + ' FROM CheckListModelos CM ' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id ' + "\n"
                + ' INNER JOIN ApelidosModelos AM ON idCheckListModelos = AM.id ' + "\n"
                + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = ICM.idGruposStatusCheckList ' + "\n"
                + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' INNER JOIN Modelos Mo ON CM.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN TiposModelos TM ON TM.id = Mo.idTiposModelos ' + "\n"
                + ' WHERE Ma.CodigoExibicao = ' + AF

                , { type: sequelize.QueryTypes.SELECT })

                .catch((e) => {
                    console.log('ERRO AO PESQUISAR MAQUINA POR AF ', e)
                    throw new Error(e);
                })

    return result;
}



const InsertSaidasMaquinasChecklist = async (data) => {

    try {
        await
            Sequelize.query(
                ' INSERT INTO SaidasMaquinasCheckLists ' + "\n"
                + ' (idMaquinas , Horimetro, Observacao) ' + "\n"
                + ' VALUES (' + data[0].idMaquinas + ',' + data[0].horimetro + ',' + "'" + data[0].observacao + "'" + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((e) => {
                    console.log('ERRO AO INSERIR SaidasMaquinasCheckLists ', e)
                    throw new Error(e);
                })
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

const SelectSaidasMaquinasChecklist = async () => {

    try {

        resultUltimoItemInseridoSaidasMaquinas =
            await
                Sequelize.query('SELECT id FROM SaidasMaquinasCheckLists ORDER BY id DESC LIMIT 1 '

                    , { type: sequelize.QueryTypes.SELECT })

                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoItemInseridoSaidasMaquinas ', e)
                        throw new Error(e);
                    })

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }

}

const InsertCheklistModelos = async (data) => {

    try {

        await
            Sequelize.query('INSERT INTO CheckListModelos (idModelos) VALUES (' + data[0].idModelo + ')'

                , { type: sequelize.QueryTypes.INSERT })

                .catch((e) => {
                    console.log('ERRO AO INSERIR InsertCheckListModelos ', e)
                    throw new Error(e);
                })

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }

}

const SelectChecklistModelos = async () => {
    try {

        resultUltimoItemInseridoCheckListModelos =
            await
                Sequelize.query('SELECT id FROM CheckListModelos ORDER BY id DESC LIMIT 1 '

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoItemInseridoCheckListModelos ', e)
                        throw new Error(e);
                    })

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const SelectGrupoStatusChecklist = async () => {
    try {
        resultUltimoIdGrupoStatusChecklist =
            await
                Sequelize.query('SELECT Grupo FROM GruposStatusCheckLists ORDER BY Grupo DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoIdGrupoStatusChecklist ', e)
                        throw new Error(e);
                    })

        aux = parseInt(resultUltimoIdGrupoStatusChecklist[0].Grupo) + 1
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

const SelectGrupoStatusChecklistId = async () => {
    try {
        bosta =
            await
                Sequelize.query('SELECT id FROM GruposStatusCheckLists ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoIdGrupoStatusChecklistId ', e)
                        throw new Error(e);
                    })

        aux = parseInt(resultUltimoIdGrupoStatusChecklist[0].Grupo) + 1
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertGruposStatusChecklist = async () => {
    try {
        await
            Sequelize.query('INSERT INTO GruposStatusCheckLists (Grupo) VALUES (' + aux + ')'

                , { type: sequelize.QueryTypes.INSERT })

                .catch((e) => {
                    console.log('ERRO AO INSERIR InsertGrupoStatusChecklist ', e)
                    throw new Error(e);
                })

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertItensChecklistModelos = async (data) => {

    try {

        for (let i = 0; i < data.length; i++) {

            await

                Sequelize.query(
                    'INSERT INTO ItensCheckListModelos (Descricao, idGruposStatusCheckList ) VALUES (' + "'" + data[i].perguntas + "'" + ',' + aux + ')'

                    , { type: sequelize.QueryTypes.INSERT })
                    .catch((e) => {
                        console.log('ERRO AO INSERIR InsertItensCheckListModelos ', e)
                        throw new Error(e);
                    })

        }

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertStatusChecklists = async (data) => {
    try {
        for (let i = 0; i < data.length - 1; i++) {
            await
                Sequelize.query('INSERT INTO StatusCheckLists (Descricao, idGruposStatusCheckList) VALUES '
                    + ' (' + "'" + data[i].resposta + "'" + ',' + aux + ')', { type: sequelize.QueryTypes.INSERT })
                    .catch((e) => {
                        console.log('ERRO AO INSERIR InsertStatusCheckList ', e)
                        throw new Error(e);
                    })
        }
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}



const SelectItensChecklistModelos = async () => {
    try {
        resultUltimoIdItensCheckListModelos =
            await
                Sequelize.query('SELECT id FROM ItensCheckListModelos ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoIdItensCheckListModelos ', e)
                        throw new Error(e);
                    })
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

const SelectStatusChecklist = async () => {
    try {

        resultUltimoIdStatusCheckList =
            await
                Sequelize.query('SELECT id FROM StatusCheckLists ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((e) => {
                        console.log('ERRO AO CONSULTAR UltimoIdStatusCheckList ', e)
                        throw new Error(e);
                    })


    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertSaidasMaquinasItensChecklists = async () => {
    try {

        await
            Sequelize.query(
                'INSERT INTO SaidasMaquinasItensCheckLists (idSaidasMaquinasCheckList, idItensCheckListModelos,' + "\n"
                + ' idStatusCheckList, idGruposStatusCheckList ) ' + "\n"
                + ' VALUES (' + resultUltimoItemInseridoSaidasMaquinas[0].id + ',' + resultUltimoIdItensCheckListModelos[0].id + ',' + resultUltimoIdStatusCheckList[0].id + ',' + bosta[0].id + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((e) => {
                    console.log('ERRO AO INSERIR InsertSaidasMaquinasItensChecklist ', e)
                    throw new Error(e);
                })
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

exports.PostOutmachines = async (data) => {
    try {

        await Sequelize.transaction({ autocommit: true }, async (t) => {

            await InsertSaidasMaquinasChecklist(data).catch((e) => { return t.rollback() })

            await SelectSaidasMaquinasChecklist().catch((e) => { return t.rollback() })

            await InsertCheklistModelos(data).catch((e) => { return t.rollback() })

            await SelectGrupoStatusChecklist().catch((e) => { return t.rollback() })

            await InsertGruposStatusChecklist().catch((e) => { return t.rollback() })

            await InsertItensChecklistModelos(data).catch((e) => { return t.rollback() })

            await SelectItensChecklistModelos().catch((e) => { return t.rollback() })

            await InsertStatusChecklists(data).catch((e) => { return t.rollback() })

            await SelectStatusChecklist().catch((e) => { return t.rollback() })

            await SelectChecklistModelos().catch((e) => { return t.rollback() })

            await SelectGrupoStatusChecklistId().catch((e) => { return t.rollback() })

            await InsertSaidasMaquinasItensChecklists().catch((e) => { return t.rollback() })
        })


    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


exports.listMachinesOut = async (AF) => {
    try {
        let res =
            await Sequelize.query(' SELECT * FROM  SaidasMaquinasCheckLists SMC ' + "\n"
                + 'INNER JOIN SaidasMaquinasItensCheckLists SMIC ON SMIC.idSaidasMaquinasCheckList = SMC.id' + "\n"
                + 'INNER JOIN StatusCheckLists SCL ON SMIC.idStatusCheckList = SCL.id' + "\n"
                + 'INNER JOIN GruposStatusCheckLists GSC ON SCL.idGruposStatusCheckList = GSC.id' + "\n"
                + 'INNER JOIN ItensCheckListModelos ICM ON ICM.idGruposStatusCheckList = GSC.id' + "\n"
                + 'INNER JOIN CheckListModelos CM ON ICM.idCheckListModelos = CM.id' + "\n"
                + 'INNER JOIN FotosCheckListModelos FCM ON FCM.idCheckListModelos = CM.id' + "\n"
                + 'INNER JOIN SaidasMaquinasFotosCheckLists SMFC ON SMFC.idFotosCheckListModelos = FCM.id ' + "\n"
                + 'INNER JOIN SaidasMaquinasItensFotosCheckLists SMIFC ON SMFC.idSaidasMaquinasCheckList = SMIFC.id' + "\n"
                + 'INNER JOIN Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
                + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
                + 'WHERE Ma.CodigoExibicao  = ' + AF
                , { type: sequelize.QueryTypes.SELECT })

        return res;
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

exports.listByModel = async (Modelo) => {
    try {
        let res =
            await Sequelize.query('SELECT Mo.Modelo, FCM.Descricao , FCM.Ordem' + "\n"
                + 'FROM Modelos Mo ' + "\n"
                + 'INNER JOIN CheckListModelos CM ON CM.idModelos = Mo.id' + "\n"
                + 'INNER JOIN ItensCheckListModelos ICM ON ICM.idChecklistModelos = CM.id' + "\n"
                + 'INNER JOIN FotosCheckListModelos FCM ON FCM.idChecklistModelos = CM.id' + "\n"
                + 'WHERE Mo.Modelo = ' + "'" + Modelo + "'" + "\n"
                + 'ORDER BY Mo.Modelo ' 
                , { type: sequelize.QueryTypes.SELECT })
        return res;
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

