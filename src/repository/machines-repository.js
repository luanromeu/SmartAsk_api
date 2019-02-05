'use strict'

const machines = require('../models/Maquinas-models')
const machinesmodels = require('../models/Modelos-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')
const base64ToImage = require('base64-to-image');
const ftp = require('../services/ftp-service')

var aux;
var auxGrupo;
var resultUltimoIdGrupoStatusChecklist;
var resultUltimoItemInseridoSaidasMaquinas;
var resultUltimoItemInseridoCheckListModelos;
var bosta;
var resultUltimoIdItensCheckListModelos;
var resultUltimoIdStatusCheckList;
var resultUltimoIdImages;
var resultimage = null;
var resultsend = null;
var arrayImages = [];

exports.listOutChecklists = async (filterOption, filterParam) => {
    const result =
        await Sequelize.query(
     'SELECT SMC.id AS NumeroCheckList, SMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
    +'FROM SaidasMaquinasCheckLists SMC' + "\n"
    +'INNER JOIN  Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
    +'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
    +'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
    +'WHERE '+ filterOption + ' = '+ "'" + filterParam + "'" +'  ORDER BY SMC.Data'
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS ', e)
                throw new Error(e);
            })
            return result;
}

exports.listOutChecklistsDate = async ( startDate, endDate, filterOption) => {
    const result =
        await Sequelize.query(
     'SELECT SMC.id AS NumeroCheckList, SMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
    +'FROM SaidasMaquinasCheckLists SMC' + "\n"
    +'INNER JOIN  Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
    +'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
    +'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
    +'WHERE '+ filterOption + ' >= ' + "'" + startDate + "'" + ' AND ' + filterOption + ' <= ' + "'" + endDate + "'" + '' +"\n"
    +' ORDER BY SMC.Data'
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS POR DATA ', e)
                throw new Error(e);
            })
            return result;
}

exports.listOutChecklistItens = async ( filterParam) => {

    const result =
        await Sequelize.query(
            'SELECT Ma.CodigoExibicao , TP.TipoModelo , Right(Mo.ApelidoOLD, 2) AS Altura , ICM.Descricao AS Perguntas,' + "\n"
            + 'SC.Descricao AS Respostas , SMC.createdAt' + "\n"
            + 'FROM SaidasMaquinasItensCheckLists SMICL' + "\n"
            + 'INNER JOIN SaidasMaquinasCheckLists SMC ON SMICL.idSaidasMaquinasCheckList = SMC.id' + "\n"
            + 'INNER JOIN Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
            + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
            + 'INNER JOIN CheckListModelos CM ON CM.idModelos = Mo.id' + "\n"
            + 'INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id' + "\n"
            + 'INNER JOIN GruposStatusCheckLists GSC ON ICM.idGruposStatusCheckList = GSC.id' + "\n"
            + 'INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id' + "\n"
            + 'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
            + 'LEFT JOIN SaidasMaquinasFotosCheckLists SMFC ON SMFC.idSaidasMaquinasCheckList = SMC.id' + "\n"
            + 'LEFT JOIN SaidasMaquinasItensFotosCheckLists SMIFC ON SMIFC.idSaidasMaquinasFotosCheckList = SMFC.id' + "\n"
            + 'WHERE SMC.id  = ' + filterParam + ' '

            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR SAIDA DE MAQUINAS ', e)
                throw new Error(e);
            })
    // console.log(result)

    return result;


}


exports.getByAf = async (AF) => {


    const result =
        await
            Sequelize.query(
            //     'SELECT * FROM Maquinas M' 
            //    +' INNER JOIN Modelos MO ON M.idModelos = MO.id'
            //    +' WHERE M.CodigoExibicao = ' + AF +''

                'SELECT Ma.CodigoExibicao, Mo.Modelo , Mo.id AS idModelo, Mo.Observacao, ICM.Descricao AS Perguntas, '
                + ' AM.Apelido, SC.Descricao AS Respostas, Substring(Mo.ApelidoOLD, 4, 2) AS Altura, ' + "\n"
                + ' Ma.id AS idMaquinas , TM.TipoModelo' + "\n"
                + ' FROM CheckListModelos CM ' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id ' + "\n"
                + ' LEFT JOIN ApelidosModelos AM ON idCheckListModelos = AM.id ' + "\n"
                + ' LEFT JOIN GruposStatusCheckLists GSC ON GSC.id = ICM.idGruposStatusCheckList ' + "\n"
                + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' INNER JOIN Modelos Mo ON CM.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN TiposModelos TM ON TM.id = Mo.idTiposModelos ' + "\n"
                + ' WHERE Ma.CodigoExibicao = ' + AF + ' ORDER BY ICM.Ordem'

                , { type: sequelize.QueryTypes.SELECT })

                .catch((e) => {
                    console.log('ERRO AO PESQUISAR MAQUINA POR AF ', e)
                    throw new Error(e);
                })

    return result;
}



const InsertSaidasMaquinasChecklist = async (data) => {

    try {

            if (data[0].horimetro == '' || data[0].Observacao == '')
                data[0].horimetro = null;
                data[0].Observacao = null;
            
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

        auxGrupo = parseInt(resultUltimoIdGrupoStatusChecklist[0].Grupo) + 2
      
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
    
        aux = parseInt(bosta[0].id) + 1

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertGruposStatusChecklist = async () => {
    try {
        await
            Sequelize.query('INSERT INTO GruposStatusCheckLists (Grupo) VALUES (' + auxGrupo + ')'

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
                    'INSERT INTO ItensCheckListModelos (Descricao, idCheckListModelos, idGruposStatusCheckList) VALUES (' + "'" + data[i].perguntas + "'" + ',' + resultUltimoItemInseridoCheckListModelos[0].id + ',' + aux + ')'

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



const InsertImages = async () => {
    try {
        await Sequelize.query(
            'INSERT INTO SaidasMaquinasFotosCheckLists (idSaidasMaquinasCheckList)' + "\n"
            + 'VLAUES(' + resultUltimoItemInseridoSaidasMaquinas[0].id + ')'
            , { type: sequelize.QueryTypes.INSERT })
    } catch (e) {

    }
}

const SelectSaidasMaquinasFotosChecklists = async () => {
    try {

        resultUltimoIdImages =
            await
                Sequelize.query('SELECT id FROM SaidasMaquinasFotosCheckLists ORDER BY id DESC LIMIT 1'

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

const SaidasMaquinasItensFotosCheckLists = async (arrayImages) => {
    try {
        //console.log(arrayImages.length)
        let string = 'http://imagens.tetsistemas.com.br/checklist/';
        for (let i = 0; i < arrayImages.length; i++) {

            await Sequelize.query(
                'INSERT INTO SaidasMaquinasItensFotosCheckLists (idSaidasMaquinasFotosCheckList , imagem)' + "\n"
                + 'VALUES(' + resultUltimoIdImages[0].id + ',' + "'" + string + arrayImages[i].fileName + "'" + ')'
                , { type: sequelize.QueryTypes.INSERT })
        }

    } catch (e) {

    }
}

const SendImagesToWeb = async (data, localpath, remotepath, optionalObj) => {

    try {

        data.forEach(async res => {
            if (res.fotos != null || res.fotos != "" || res.fotos.length != 0)
                await res.fotos.forEach(async base64Str => {
                    if (base64Str != null || base64Str.length != 0 || base64Str != "")
                       // console.log(base64Str.length)
                    resultimage = base64ToImage(base64Str, localpath, optionalObj)
                    resultsend = ftp.SendToServer(localpath + resultimage.fileName, remotepath + resultimage.fileName)
                  //  console.log(resultimage)
                    arrayImages.push(resultimage);
                    return arrayImages;
                })

        })
        //console.log(arrayImages.length)
        return arrayImages
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

            await SelectGrupoStatusChecklistId().catch((e) => { return t.rollback() })

            await InsertGruposStatusChecklist().catch((e) => { return t.rollback() })

            await SelectChecklistModelos().catch((e) => { return t.rollback() })

            await InsertItensChecklistModelos(data).catch((e) => { return t.rollback() })

            await SelectItensChecklistModelos().catch((e) => { return t.rollback() })

            await InsertStatusChecklists(data).catch((e) => { return t.rollback() })

            await SelectStatusChecklist().catch((e) => { return t.rollback() })

            await InsertSaidasMaquinasItensChecklists().catch((e) => { return t.rollback() })

           // await SendImagesToWeb(data, '/home/luan/Desktop', '/checklist/', { type: 'jpg' }).catch((e) => { return t.rollback() })

            await SelectSaidasMaquinasFotosChecklists().catch(() => { return t.rollback() })

            await InsertImages().catch((e) => { return t.rollback() })

           // await SaidasMaquinasItensFotosCheckLists(arrayImages).catch((e) => { return t.rollback() })
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
            await Sequelize.query(
                'SELECT  ICM.Descricao AS Perguntas' + "\n"
                + ' FROM CheckListModelos CM ' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON ICM.idCheckListModelos = CM.id ' + "\n"
                + ' INNER JOIN ApelidosModelos AM ON idCheckListModelos = AM.id ' + "\n"
                + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = ICM.idGruposStatusCheckList ' + "\n"
                + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' INNER JOIN Modelos Mo ON CM.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN TiposModelos TM ON TM.id = Mo.idTiposModelos ' + "\n"
                + ' WHERE Mo.Modelo = ' + "'" + Modelo + "'" + ' ORDER BY ICM.Ordem'
                , { type: sequelize.QueryTypes.SELECT })
        return res;
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

exports.listModels = async () => {
    try {
        let res =
            await Sequelize.query(
                'SELECT id, Modelo FROM Modelos'
                , { type: sequelize.QueryTypes.SELECT })

        return res;
    } catch (error) {
        console.log(e)
        throw new Error(e);
    }
}

exports.PutOrderModel = async (object, position) => {
    try {
        let res =
            await Sequelize.query(
                'UPDATE ItensCheckListModelos SET Ordem = ' + position + ' ' + "\n"
                + 'WHERE Descricao =' + "'" + object + "'" + ''
                , { type: sequelize.QueryTypes.INSERT })
        return res;
    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}

