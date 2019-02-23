'use strict'

const CheckListModelos = require('../models/CheckListModelos-models')
const SaidasMaquinasCheckLists = require('../models/saidasmaquinaschecklist-model')
const SaidasMaquinasItensCheckLists = require('../models/SaidasMaquinasItensCheckList-models')
const SaidasMaquinasFotosCheckList = require('../models/SaidasMaquinasFotosCheckList-models')
const SaidasMaquinasItensFotosCheckList = require('../models/SaidasMaquinasItensFotosCheckList-models')
const EntradaMaquinasChekLists = require ('../models/EntradasMaquinasCheckList-models')
const EntradaMaquinasItensCheckLists = require ('../models/EntradasMaquinasItensCheckList-models')
const EntradaMaquinasFotosCheckLists = require ('../models/EntradaMaquinasFotosCheckLists-models')
const EntradaMaquinasItensFotosCheckLists = require ('../models/EntradasMaquinasItensFotosCheckList-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')
const base64ToImage = require('base64-to-image');
const ftp = require('../services/ftp-service')
const config = require ('../../config')


var ultimoIdSaidasMaquinasCheckList;
var ultimoIdEntradasMaquinasCheckList;
var ultimoIdSaidasMaquinasFotosCheckList;
var ultimoIdEntradasMaquinasFotosCheckLists;
var arrayImages;
var imageinfo = [];



const InsertCheklistModelos = async (data) => {

    try {

        let idModelo
        data.map(result => idModelo = result.idModelo)

        let saveCheckListModelos =

            await CheckListModelos.build({
                idModelos: idModelo,
                Inativo: '0'
            })

        let save =
            await saveCheckListModelos.save();
        return save;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const InsertSaidasMaquinasChecklist = async (data) => {

    try {
        let idMaquina;
        let horimetro;
        let observacao;
        data.map(result => idMaquina = result.idMaquinas)
        data.map(result => horimetro = result.horimetro)
        data.map(result => observacao = result.observacao)


        let SaveSaidasMaqunasChecklist =
            await SaidasMaquinasCheckLists.build({

                idMaquinas: idMaquina,
                Horimetro: horimetro,
                Data: Date.now(),
                idSaidasMaquinas: '',
                idEmpresas: '1',
                Inativo: '0',
                Observacao: observacao

            })

        let save =
            await SaveSaidasMaqunasChecklist.save()
        return save;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const SelectSaidasMaquinasChecklist = async () => {

    try {

        let idSaidasMaquinasCheckList =
            await SaidasMaquinasCheckLists.findAll({
                raw: true,
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1
            })

        idSaidasMaquinasCheckList.map(result => ultimoIdSaidasMaquinasCheckList = result.id)

        return ultimoIdSaidasMaquinasCheckList;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const InsertSaidasMaquinasItensCheckLists = async (data) => {

    try {

        data.forEach(async result => {


            let saveSaidasMaquinasItensCheckList =
                await SaidasMaquinasItensCheckLists.build({

                    idSaidasMaquinasCheckList: String(ultimoIdSaidasMaquinasCheckList),
                    idItensCheckListModelos: result.idPergunta,
                    idStatusCheckList: result.idResposta,
                    Inativo: '0',
                    idGruposStatusCheckList: result.idGruposStatusCheckList
                })

            let save =
                await saveSaidasMaquinasItensCheckList.save()

            return save;

        });
        return;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}


const insertSaidasMaquinasFotosCheckLists = async () => {

    try {

        let SMFC =
            await SaidasMaquinasFotosCheckList.build({

                Data: Date.now(),
                idSaidasMaquinasCheckList: String(ultimoIdSaidasMaquinasCheckList),
                Inativo: '0'
            })

        let save =
            await SMFC.save();
        return save;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const SelectSaidasMaquinasFotosChecklist = async () => {

    try {

        let idSaidasMaquinasFotosCheckList =
            await SaidasMaquinasFotosCheckList.findAll({
                raw: true,
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1
            })

        idSaidasMaquinasFotosCheckList.map(result => ultimoIdSaidasMaquinasFotosCheckList = result.id)

        return ultimoIdSaidasMaquinasFotosCheckList;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const ConvertAndSaveImages = async (data) => {

    try {
        let optionalObj = { 'type': 'jpg' };
        let promisse =
            await data.map(async (result) => {
                console.log('asdas',result)
                let subpromisse =
                    await result.fotos.map(async (res) => {
                    
                        imageinfo.push({
                            image: base64ToImage(res, config.PATH_SAVE, optionalObj),
                            id: result.idPergunta,
                            idchecklist: result.NumeroCheckList
                        });

                        return imageinfo
                    })

                return subpromisse
            })
        return promisse;
    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const InsertSaidasMaquinasItensFotosCheckLists = async (imageinfo, data) => {

    try {
     
        data.map(async (result) => {
            console.log(imageinfo)
            let dataImages = imageinfo.filter(image => image.id == result.idPergunta && image.idc == result.NumeroCheckList)
            dataImages.map(async(res) => {
                
                
                
                let SMIFC =
                await SaidasMaquinasItensFotosCheckList.build({
                    idSaidasMaquinasFotosCheckList: ultimoIdSaidasMaquinasFotosCheckList,
                    Imagem: config.PATH_LOAD + String(res.image.fileName), 
                    idItensCheckListModelos: result.idPergunta
                    
                })
                
                  
                let save =
                await SMIFC.save();
                return save;
            });
            
            
        })
            
        
        
        return;


    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

exports.PostOutmachines = async (data) => {
    try {

        await Sequelize.transaction({ autocommit: true }, async (t) => {


            await InsertCheklistModelos(data).catch((e) => { return t.rollback() })

            await InsertSaidasMaquinasChecklist(data).catch((e) => { return t.rollback() })

            await SelectSaidasMaquinasChecklist().catch((e) => { return t.rollback() })

            await InsertSaidasMaquinasItensCheckLists(data).catch((e) => { return t.rollback() })

            await insertSaidasMaquinasFotosCheckLists().catch((e) => { return t.rollback() })

            await SelectSaidasMaquinasFotosChecklist().catch((e) => { return t.rollback() })

            await ConvertAndSaveImages(data).catch((e) => { return t.rollback() })

            await InsertSaidasMaquinasItensFotosCheckLists(imageinfo, data).catch((e) => { return t.rollback() })

        })

        return;

    } catch (e) {
        console.log(e)
        throw new Error(e);
    }
}


const InsertEntradasMaquinasChecklist = async (data) => {

    try {
        let idMaquina;
        let horimetro;
        let observacao;
        data.map(result => idMaquina = result.idMaquinas)
        data.map(result => horimetro = result.horimetro)
        data.map(result => observacao = result.observacao)


        let SaveEntradasMaqunasChecklist =
            await EntradaMaquinasChekLists.build({

                idMaquinas: idMaquina,
                Horimetro: horimetro,
                Data: Date.now(),
                idEntradasMaquinas:'',
                idEmpresas: '1',
                Inativo: '0',
                Observacao: observacao

            })

        let save =
            await SaveEntradasMaqunasChecklist.save()
        return save;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const SelectEntradasMaquinasChecklist = async () => {

    try {

        let idEntradaMaquinasCheckList =
            await EntradaMaquinasChekLists.findAll({
                raw: true,
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1
            })
         
            idEntradaMaquinasCheckList.map(result => ultimoIdEntradasMaquinasCheckList = result.id)

        return ultimoIdEntradasMaquinasCheckList;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const InsertEntradasMaquinasItensCheckLists = async (data) => {

    try {

        data.forEach(async result => {


            let saveEntradasMaquinasItensCheckList =
                await EntradaMaquinasItensCheckLists.build({

                    idEntradasMaquinasCheckList: String(ultimoIdEntradasMaquinasCheckList),
                    idItensCheckListModelos: result.idPergunta,
                    idStatusCheckList: result.idResposta,
                    Inativo: '0',
                    idGruposStatusCheckList: result.idGruposStatusCheckList
                })

            let save =
                await saveEntradasMaquinasItensCheckList.save()

            return save;

        });
        return;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}


const insertEntradasMaquinasFotosCheckLists = async () => {

    try {

        let EMFC =
            await EntradaMaquinasFotosCheckLists.build({

                Data: Date.now(),
                idEntradasMaquinasCheckList: String(ultimoIdEntradasMaquinasCheckList),
                Inativo: '0'
            })

        let save =
            await EMFC.save();
        return save;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const SelectEntradaMaquinasFotosChecklist = async () => {

    try {

        let idEntradaMaquinasFotosCheckList =
            await EntradaMaquinasFotosCheckLists.findAll({
                raw: true,
                attributes: ['id'],
                order: [['id', 'DESC']],
                limit: 1
            })

            idEntradaMaquinasFotosCheckList.map(result => ultimoIdEntradasMaquinasFotosCheckLists = result.id)

        return ultimoIdEntradasMaquinasFotosCheckLists;

    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}

const InsertEntradasMaquinasItensFotosCheckLists = async (imageinfo, data) => {

    try {
     
        data.map(async (result) => {
            console.log(imageinfo)
            let dataImages = imageinfo.filter(image => image.id == result.idPergunta && image.idc == result.NumeroCheckList)
            dataImages.map(async(res) => {
                
                
                
                let EMIFC =
                await EntradaMaquinasItensFotosCheckLists.build({
                    idEntradasMaquinasFotosCheckList: ultimoIdEntradasMaquinasFotosCheckLists,
                    Imagem: config.PATH_LOAD + String(res.image.fileName), 
                    idItensCheckListModelos: result.idPergunta
                    
                })
                
                  
                let save =
                await EMIFC.save();
                return save;
            });
            
            
        })
            
     return;


    } catch (e) {

        console.log(e)
        throw new Error(e);
    }
}


exports.PostInputMachines = async (data) => {

    try {
        await Sequelize.transaction({ autocommit: true }, async (t) => {


            await InsertCheklistModelos(data).catch((e) => { return t.rollback() })

            await InsertEntradasMaquinasChecklist(data).catch((e) => { return t.rollback() })

            await SelectEntradasMaquinasChecklist().catch((e) => { return t.rollback() })

            await InsertEntradasMaquinasItensCheckLists(data).catch((e) => { return t.rollback() })

            await insertEntradasMaquinasFotosCheckLists().catch((e) => { return t.rollback() })

            await SelectEntradaMaquinasFotosChecklist().catch((e) => { return t.rollback() })

            await ConvertAndSaveImages(data).catch((e) => { return t.rollback() })

            await InsertEntradasMaquinasItensFotosCheckLists(imageinfo, data).catch((e) => { return t.rollback() })

        })

        return;
        
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
                ' SELECT  Mo.id, Concat(Mo.Modelo, " - " , Ma.CodigoExibicao) As Modelo , Ma.id AS idMaquina' + "\n"
                + ' FROM Modelos Mo' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id' + "\n"
                + ' WHERE Mo.Inativo = 0 OR Mo.Inativo IS NULL' + "\n"
                + ' AND  Ma.Inativo = 0 OR Ma.Inativo IS NULL' + "\n"
                + ' AND  Ma.idModelos <> NULL '

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



exports.listOutChecklistItens = async (AF, idsmc) => {
    const result =
        await Sequelize.query(
            ' SELECT SMC.id AS NumeroCheckList,ICM.id AS idPergunta, ICM.Descricao AS Perguntas, SC.Descricao AS Respostas' + "\n"
            + ' FROM SaidasMaquinasItensCheckLists SMIC' + "\n"
            + ' INNER JOIN SaidasMaquinasCheckLists SMC ON SMC.id = SMIC.idSaidasMaquinasCheckList' + "\n"
            + ' INNER JOIN ItensCheckListModelos ICM ON ICM.id = SMIC.idItensCheckListModelos' + "\n"
            + ' INNER JOIN StatusCheckLists SC ON SC.id = SMIC.idStatusCheckList' + "\n"
            + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = SMIC.idGruposStatusCheckList' + "\n"
            + ' INNER JOIN Maquinas Ma ON Ma.id = SMC.idMaquinas' + "\n"
            + ' WHERE Ma.CodigoExibicao = ' + AF + ' AND SMC.id=' +idsmc + '' + "\n"
            + ' ORDER BY SMC.id ' + "\n"
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS ', e)
                throw new Error(e);
            })
    return result;
}



exports.listOutChecklists = async (filterOption, filterParam) => {
    const result =
        await Sequelize.query(
            'SELECT SMC.id AS NumeroCheckList, SMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
            + 'FROM SaidasMaquinasCheckLists SMC' + "\n"
            + 'INNER JOIN  Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
            + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
            + 'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
            + 'WHERE ' + filterOption + '= ' + "'" + filterParam + "'" + '  ORDER BY SMC.Data'

            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS ', e)
                throw new Error(e);
            })
    return result;
}

exports.listOutChecklistsDate = async (startDate, endDate, filterOption) => {
    
    const result =
        await Sequelize.query(
            'SELECT SMC.id AS NumeroCheckList, SMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
            + 'FROM SaidasMaquinasCheckLists SMC' + "\n"
            + 'INNER JOIN  Maquinas Ma ON SMC.idMaquinas = Ma.id' + "\n"
            + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
            + 'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
            + 'WHERE ' + filterOption + ' >= ' + "'" + startDate + "'" + ' AND ' + filterOption + ' <= ' + "'" + endDate + "'" + '' + "\n"
            + ' ORDER BY SMC.Data'
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS POR DATA ', e)
                throw new Error(e);
            })
    return result;
}



exports.questionsAndAnswersByQuiz = async (idQuestionario, idMaquina) => {


    const result =
        await
            Sequelize.query(
                ' SELECT  ICM.Descricao AS Perguntas,ICM.id AS idPergunta,' + "\n"
                + ' SC.Descricao AS Respostas, SC.id AS idResposta,' + "\n"
                + ' SC.idGruposStatusCheckList, Mo.Modelo ,Mo.id AS idModelo, ' + "\n"
                + ' Right(Mo.ApelidoOLD, 2) AS Altura,  Ma.CodigoExibicao, Ma.id AS idMaquinas' + "\n"
                + ' FROM ModelosQuestionarios MQ' + "\n"
                + ' INNER JOIN Modelos Mo ON  MQ.idModelos = Mo.id' + "\n"
                + ' INNER JOIN Questionarios Q ON MQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN PerguntasQuestionarios PQ ON PQ.idQuestionario = Q.id' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON PQ.idItensCheckListModelos = ICM.id' + "\n"
                + ' INNER JOIN GruposStatusCheckLists GSC ON ICM.idGruposStatusCheckList = GSC.id' + "\n"
                + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id' + "\n"
                + ' WHERE Q.id = ' + idQuestionario + ' AND Ma.id = ' + idMaquina + '' + "\n"
                + ' AND (Q.Inativo  = 0  OR  Q.Inativo IS NULL)' + "\n"
                + ' AND (PQ.Inativo = 0 OR PQ.Inativo IS NULL)' + "\n"
                + ' AND (MQ.Inativo = 0 OR MQ.Inativo IS NULL )' + "\n"
                + ' AND (Ma.Inativo = 0 OR Ma.Inativo IS NULL)' + "\n"
                + ' AND (Mo.Inativo = 0 OR Mo.Inativo IS NULL)' + "\n"

                , { type: sequelize.QueryTypes.SELECT })


                .catch((e) => {
                    console.log('ERRO AO PESQUISAR MAQUINA POR AF ', e)
                    throw new Error(e);
                })

    return result;
}


exports.listImagesByItensOutChecklist = async (iditem, id) => {

    try {
        
        const result =
            await Sequelize.query(

                ' SELECT SMIFC.Imagem, SMIFC.idItensCheckListModelos ' + "\n"
               +' FROM SaidasMaquinasItensFotosCheckLists SMIFC '+ "\n"
               +' INNER JOIN ItensCheckListModelos ICM ON SMIFC.idItensCheckListModelos = ICM.id ' + "\n"
               +' INNER JOIN SaidasMaquinasFotosCheckLists SMFC ON SMIFC.idSaidasMaquinasFotosCheckList = SMFC.id ' + "\n"
               +' INNER JOIN SaidasMaquinasCheckLists SMC ON SMFC.idSaidasMaquinasCheckList = SMC.id ' + "\n"
               +' WHERE ICM.id = '+iditem+' AND SMC.id = '+id+''
               
            ,{type:sequelize.QueryTypes.SELECT})

            return result;
    } catch (e) {
        console.log('ERRO AO PESQUISAR IMAGEM DO ITEM ', e)
        throw new Error(e);
    }
}


exports.listImagesByItensInputChecklist = async (iditem, id) => {

    try {
        
        const result =
            await Sequelize.query(

                ' SELECT EMIFC.Imagem, EMIFC.idItensCheckListModelos ' + "\n"
               +' FROM EntradasMaquinasItensFotosCheckLists EMIFC '+ "\n"
               +' INNER JOIN ItensCheckListModelos ICM ON EMIFC.idItensCheckListModelos = ICM.id ' + "\n"
               +' INNER JOIN EntradasMaquinasFotosCheckLists EMFC ON EMIFC.idEntradasMaquinasFotosCheckList = EMFC.id ' + "\n"
               +' INNER JOIN EntradasMaquinasCheckLists EMC ON EMFC.idEntradasMaquinasCheckList = EMC.id ' + "\n"
               +' WHERE ICM.id = '+iditem+' AND EMC.id = '+id+''
               
            ,{type:sequelize.QueryTypes.SELECT})

            return result;
    } catch (e) {
        console.log('ERRO AO PESQUISAR IMAGEM DO ITEM ', e)
        throw new Error(e);
    }
}

exports.listInputChecklistItens = async (AF, id) => {
    const result =
        await Sequelize.query(
            ' SELECT EMC.id AS NumeroCheckList,ICM.id AS idPergunta, ICM.Descricao AS Perguntas, SC.Descricao AS Respostas' + "\n"
            + ' FROM EntradasMaquinasItensCheckLists EMIC' + "\n"
            + ' INNER JOIN EntradasMaquinasCheckLists EMC ON EMC.id = EMIC.idEntradasMaquinasCheckList' + "\n"
            + ' INNER JOIN ItensCheckListModelos ICM ON ICM.id = EMIC.idItensCheckListModelos' + "\n"
            + ' INNER JOIN StatusCheckLists SC ON SC.id = EMIC.idStatusCheckList' + "\n"
            + ' INNER JOIN GruposStatusCheckLists GSC ON GSC.id = EMIC.idGruposStatusCheckList' + "\n"
            + ' INNER JOIN Maquinas Ma ON Ma.id = EMC.idMaquinas' + "\n"
            + ' WHERE Ma.CodigoExibicao = ' + AF + ' AND EMC.id=' +id + '' + "\n"
            + ' ORDER BY EMC.id ' + "\n"
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS ', e)
                throw new Error(e);
            })
    return result;
}

exports.listInputChecklists = async (filterOption, filterParam) => {
    const result =
        await Sequelize.query(
              'SELECT EMC.id AS NumeroCheckList, EMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
            + 'FROM EntradasMaquinasCheckLists EMC' + "\n"
            + 'INNER JOIN  Maquinas Ma ON EMC.idMaquinas = Ma.id' + "\n"
            + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
            + 'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
            + 'WHERE ' + filterOption + '= ' + "'" + filterParam + "'" + '  ORDER BY EMC.Data'

            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS ', e)
                throw new Error(e);
            })
    return result;
}

exports.listInputChecklistsDate = async (startDate, endDate, filterOption) => {
    
    const result =
        await Sequelize.query(
            'SELECT EMC.id AS NumeroCheckList, EMC.Data, Ma.CodigoExibicao, TP.TipoModelo ' + "\n"
            + 'FROM EntradasMaquinasCheckLists EMC' + "\n"
            + 'INNER JOIN  Maquinas Ma ON EMC.idMaquinas = Ma.id' + "\n"
            + 'INNER JOIN Modelos Mo ON Ma.idModelos = Mo.id' + "\n"
            + 'INNER JOIN TiposModelos TP ON Mo.idTiposModelos = TP.id' + "\n"
            + 'WHERE ' + filterOption + ' >= ' + "'" + startDate + "'" + ' AND ' + filterOption + ' <= ' + "'" + endDate + "'" + '' + "\n"
            + ' ORDER BY EMC.Data'
            , { type: sequelize.QueryTypes.SELECT })
            .catch((e) => {
                console.log('ERRO AO LISTAR CHECKLISTS POR DATA ', e)
                throw new Error(e);
            })
    return result;
}

