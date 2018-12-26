'use strict'

const machines = require('../models/Maquinas-models')
const machinesmodels = require('../models/Modelos-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')


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
                .catch((error) => {
                    console.log('ERRO AO LISTAR MAQUINAS POR AF ', error)
                })
    return result;
}


exports.getByAf = async (AF) => {

    let teste = [];
    const result =
        await
            Sequelize.query(
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

                , { type: sequelize.QueryTypes.SELECT })

                .catch((error) => {
                    console.log('ERRO AO PESQUISAR MAQUINA POR AF ', error)
                })

    return result;
}


exports.PostOut = async (data) => {

    try {



        await
            Sequelize.query(
                ' INSERT INTO SaidasMaquinasCheckLists ' + "\n"
                + ' (idMaquinas , Horimetro, Observacao) ' + "\n"
                + ' VALUES (' + data.id + ',' + data.Horimetro + ',' + "'" + data.Observacao + "'" + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((error) => {
                    console.log('ERRO AO INSERIR SaidasMaquinasCheckLists ', error)
                    return;
                })


        const resultUltimoItemInseridoSaidasMaquinas =
            await
                Sequelize.query('SELECT id FROM SaidasMaquinasCheckLists ORDER BY id DESC LIMIT 1 '

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoItemInseridoSaidasMaquinas ', error)
                        return;
                    })

        await
            Sequelize.query('INSERT INTO CheckListModelos (idModelos) VALUES (' + data.idModelo + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((error) => {
                    console.log('ERRO AO INSERIR InsertCheckListModelos ', error)
                    return;
                })

        const resultUltimoItemInseridoCheckListModelos =
            await
                Sequelize.query('SELECT id FROM CheckListModelos ORDER BY id DESC LIMIT 1 '

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoItemInseridoCheckListModelos ', error)
                        return;
                    })

        var aux;
        const resultUltimoIdGrupoStatusChecklist =
            await
                Sequelize.query('SELECT Grupo FROM GruposStatusCheckLists ORDER BY Grupo DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoIdGrupoStatusChecklist ', error)
                        return;
                    })

        aux = parseInt(resultUltimoIdGrupoStatusChecklist[0].Grupo) + 1
        console.log('UltimoIdGrupoStatusChecklist ', aux)
        console.log('TAMANHO PERGUNTAS ', data.perguntas.keys(data.perguntas).length)

        await
            Sequelize.query('INSERT INTO GruposStatusCheckLists (Grupo) VALUES (' + aux + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((error) => {
                    console.log('ERRO AO INSERIR InsertGrupoStatusChecklist ', error)
                    return;
                })


        const resultUltimoIdGrupoStatusCheckListId =
            await
                Sequelize.query('SELECT id FROM GruposStatusCheckLists ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoIdGrupoStatusChecklistId ', error)
                        return;
                    })

        for (let i = 0; i < data[1].length - 1; i++) {

            // await 
            // Sequelize.query( 
            // 'INSERT INTO ItensCheckListModelos (Descricao, idGrupoStatusCheckList ) VALUES ' + "\n"
            // +'(' + data.Perguntas[i] + ',' + aux + ')'

            // ,{type:sequelize.QueryTypes.INSERT})
            // .catch((error)=> {
            //     console.log('ERRO AO INSERIR InsertItensCheckListModelos ', error)
            //     return;
            // })

        }


        const resultUltimoIdItensCheckListModelos =
            await
                Sequelize.query('SELECT id FROM ItensCheckListModelos ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoIdItensCheckListModelos ', error)
                        return;
                    })

        await
            Sequelize.query('INSERT INTO StatusCheckLists (Descricao, idGrupoCheckLists) VALUES '
                + ' (' + data.Resposta + ',' + aux + ')', { type: sequelize.QueryTypes.INSERT })
                .catch((error) => {
                    console.log('ERRO AO INSERIR InsertStatusCheckList ', error)
                    return;
                })


        const resultUltimoIdStatusCheckList =
            await
                Sequelize.query('SELECT id FROM StatusCheckLists ORDER BY id DESC LIMIT 1'

                    , { type: sequelize.QueryTypes.SELECT })
                    .catch((error) => {
                        console.log('ERRO AO CONSULTAR UltimoIdStatusCheckList ', error)
                        return;
                    })

        await
            Sequelize.query(
                'INSERT INTO SaidasMaquinasItensCheckLists (idSaidasMaquinasChekList, idItensCheckListModelos,' + "\n"
                + ' idStatusCheckList, idGrupoStatusCheckList ) ' + "\n"
                + ' VALUES (' + UltimoItemInseridoSaidasMaquinas + ',' + resultUltimoIdItensCheckListModelos
                + ',' + resultUltimoIdStatusCheckList + ',' + resultUltimoIdGrupoStatusCheckListId + ')'

                , { type: sequelize.QueryTypes.INSERT })
                .catch((error) => {
                    console.log('ERRO AO INSERIR InsertSaidasMaquinasItensChecklist ', error)
                    return;
                })


        return 1;

    } catch (error) {

        console.log(error)
    }



}