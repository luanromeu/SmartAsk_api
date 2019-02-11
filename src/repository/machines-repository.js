'use strict'

const CheckListModelos = require('../models/CheckListModelos-models')
const SaidasMaquinasCheckLists = require ('../models/saidasmaquinaschecklist-model')
const SaidasMaquinasItensCheckLists = require('../models/SaidasMaquinasItensCheckList-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')
const base64ToImage = require('base64-to-image');
const ftp = require('../services/ftp-service')


var ultimoIdSaidasMaquinasCheckList;
var resultimage = null;
var resultsend = null;
var arrayImages = [];


const InsertCheklistModelos = async (data) => {
    
    try {
    
        let idModelo
        data.map(result => idModelo = result.idModelo)
    
        let saveCheckListModelos =
        
        await CheckListModelos.build({
                    idModelos:idModelo,
                    Inativo:'0'                
            })
            
            let save =
               await saveCheckListModelos.save();

    } catch (e) {

        console.log(e)
         throw new Error(e);
    }
}

 const InsertSaidasMaquinasChecklist = async (data) => {

    try {
        let idMaquina;
        let horimetro;
        data.map(result => idMaquina = result.idMaquinas)
        data.map(result => horimetro = result.horimetro)
        console.log('HEUEU ', idMaquina)
        let SaveSaidasMaqunasChecklist =
            await SaidasMaquinasCheckLists.build({

                    idMaquinas: idMaquina,
                    Horimetro: horimetro,
                    idSaidasMaquinas: '',
                    idEmpresas: '1',
                    Inativo: '0'

            })

            let save =
                await SaveSaidasMaqunasChecklist.save()

    } catch (e) {
        
        console.log(e)
        throw new Error(e);
    }
 }

const SelectSaidasMaquinasChecklist = async () => {
    
    try {
        
      let idSaidasMaquinasCheckList =
            await SaidasMaquinasCheckLists.findAll({
            raw:true,
            attributes: ['id'],
            order:[['id','DESC']],
            limit: 1
            })

         idSaidasMaquinasCheckList.map(result => ultimoIdSaidasMaquinasCheckList = result.id)
            console.log(ultimoIdSaidasMaquinasCheckList)
             return ultimoIdSaidasMaquinasCheckList
    } catch (e) {
        
        console.log(e)
        throw new Error(e);
    }
}

const InsertSaidasMaquinasItensCheckLists = async (data) => {

    try {
    
    
        let idpergunta;
        let idresposta;
        let idgrupo

        data.forEach(async result => {
            
        
            idpergunta = await result.idPergunta
            idresposta = await result.idResposta
            idgrupo =  await result.idGruposStatusCheckList
       
        
        let saveSaidasMaquinasItensCheckList = 
            await SaidasMaquinasItensCheckLists.build({

                    idSaidasMaquinasCheckList: String(ultimoIdSaidasMaquinasCheckList),
                    idItensCheckListModelos: idpergunta,
                    idStatusCheckList: idresposta,
                    Inativo: '0',
                    idGruposStatusCheckList: idgrupo
            })

            let save =
            await saveSaidasMaquinasItensCheckList.save()
        
        });
            
        
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

        // await SendImagesToWeb(data, '/home/luan/Desktop', '/checklist/', { type: 'jpg' }).catch((e) => { return t.rollback() })

         //  await InsertImages().catch((e) => { return t.rollback() })

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
                  ' SELECT Mo.id, Mo.Modelo FROM Modelos Mo' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id' + "\n"
                + ' WHERE Mo.Inativo = 0 OR Mo.Inativo IS NULL' + "\n"
                + ' AND  Ma.Inativo = 0 OR Ma.Inativo IS NULL' + "\n"
                + ' AND  Ma.idModelos <> NULL '  
                + ' GROUP BY Mo.id'
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


exports.questionsAndAnswersByQuiz = async (id) => {


    const result =
        await
            Sequelize.query(

                 ' SELECT SC.idGruposStatusCheckList, ICM.id AS idPergunta, SC.id AS idResposta, Mo.Modelo ,Mo.id AS idModelo, ICM.Descricao AS Perguntas, ICM.id AS idPerguntas,' + "\n"
                + ' SC.Descricao AS Respostas, SC.id AS idRespostas, Right(Mo.ApelidoOLD, 2) AS Altura, Ma.CodigoExibicao, ' + "\n"
                + ' Ma.id AS idMaquinas' + "\n"
                + ' FROM ModelosQuestionarios MQ ' + "\n"
                + ' INNER JOIN Modelos Mo ON  MQ.idModelos = Mo.id ' + "\n"
                + ' INNER JOIN Questionarios Q ON MQ.idQuestionario = Q.id ' + "\n"
                + ' INNER JOIN PerguntasQuestionarios PQ ON PQ.idQuestionario = Q.id ' + "\n"
                + ' INNER JOIN ItensCheckListModelos ICM ON PQ.idItensCheckListModelos = ICM.id ' + "\n"
                + ' INNER JOIN GruposStatusCheckLists GSC ON ICM.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' INNER JOIN StatusCheckLists SC ON SC.idGruposStatusCheckList = GSC.id ' + "\n"
                + ' INNER JOIN Maquinas Ma ON Ma.idModelos = Mo.id ' + "\n"
                + ' WHERE Q.id = '+id+'' + "\n"
                + ' AND (Q.Inativo = 0 OR Q.Inativo IS NULL) ' + "\n"
                + ' AND (PQ.Inativo = 0 OR  PQ.Inativo IS NULL) '  + "\n"
                + ' AND (MQ.Inativo = 0 OR MQ.Inativo IS NULL ) ' + "\n"
                + ' AND (Ma.Inativo = 0 OR Ma.Inativo IS NULL)' + "\n"   
                + ' AND (Mo.Inativo = 0 OR Mo.Inativo IS NULL) '  

                ,{ type: sequelize.QueryTypes.SELECT })
                

                .catch((e) => {
                    console.log('ERRO AO PESQUISAR MAQUINA POR AF ', e)
                    throw new Error(e);
                })

    return result;
}
