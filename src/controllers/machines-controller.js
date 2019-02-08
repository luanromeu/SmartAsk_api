'use strict'

const Repository = require('../repository/machines-repository')
const ftp = require('../services/ftp-service')


exports.listOutChecklists = async (req, res, next) => {

         let filterOption = req.params.filterOption;
         filterOption = JSON.parse(filterOption)
         let filterParam = null;
         let startDate = null;
         let endDate = null;
            
        try {

                 if (filterOption.checklistNumber != "" ) {

                            filterParam = filterOption.checklistNumber
                            filterOption = 'SMC.id'
                        
                         } else if(filterOption.machineAF != "") {
                            
                                filterParam = filterOption.machineAF;
                                filterOption = 'Ma.CodigoExibicao'

                                    } else if (filterOption.machineModel != "" ) {

                                        filterParam = filterOption.machineModel;
                                        filterOption = 'Mo.Modelo';
                
                                            } else if(filterOption.machineHeight != "" ){
                                                
                                                filterParam = filterOption.machineHeight
                                                filterOption = 'Right(Mo.ApelidoOLD, 2)'


                                            } else if(filterOption.checklistDateStart != "" &&  filterOption.checklistDateEnd != "" ) {

                                                startDate = filterOption.checklistDateStart
                                                endDate = filterOption.checklistDateEnd;
                                                filterOption = 'SMC.Data'
                                            
                                            let dataDate = 
                                                await Repository.listOutChecklistsDate(startDate,endDate,filterOption)
                                                res.status(200).send(dataDate);
                                                return;

                                                } else if (filterOption.checklistDateStart != "" ){
                                                        
                                                    filterParam = filterOption.checklistDateStart;
                                                    filterOption = 'SMC.Data >'
                                                            
                                                        } else if (filterOption.checklistDateEnd != "") {
                                                                
                                                            filterParam = filterOption.checklistDateEnd
                                                            filterOption = 'SMC.Data >'
                                                               
                        }else{                                     
                        res.status(400).send({
                        message:"Falha ao Buscar Checklist, confira os filtros e tente novamente.."
                    })
                }
            
        var data =
             
        await Repository.listOutChecklists(filterOption, filterParam)

             if(data.length != 0){

                res.status(200).send(data)
             }else{
                res.status(200).send({
                    message:"Não foi encontrado nenhum resultado"
                }) 
                throw new Error(e)
                 
             }
    
        } catch (e) {
            res.status(500).send({
                message: "Falha ao processar requisição"
            })
            console.log(e)
        }
}

exports.listOutChecklistItens = async (req, res, next) => {

    try {
       
        let filterParam = req.params.filterParam;
        let rearangeArray = [];
        let resultArray = [];

        var data =
            await Repository.listOutChecklistItens(filterParam)

        
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
        console.log(error)
    }

}


exports.listModels = async (req, res, next) => {

    try {
        let models = []
        var data =
            await Repository.listModels()
            data.forEach(res => {
                models.push(
                    {
                       Modelo:res.Modelo,
                       id:res.id
                    })
            })
        res.status(200).send(models)
    } catch (e) {

        res.status(500).send({
            message: "Falha ao processar requisição"
        })
        console.log(error)
    }

}

exports.questionsAndAnswersByQuiz = async (req, res, next) => {

    try {

        let array = [];
        let rearangeArray = [];
        let id = req.query.id;
        console.log(id)
        let data =
            await Repository.questionsAndAnswersByQuiz(id)
           //console.log(data)
        array.push({ Altura: data[0].Altura, AF: data[0].CodigoExibicao, TipoModelo: data[0].TipoModelo, Modelo: data[0].Modelo })
        data.forEach(res => {

            let index = rearangeArray.indexOf(res.Perguntas)

            if (index == -1) {

                let respostas = [];

                data.forEach(res2 => {

                    if (res.Perguntas == res2.Perguntas) {

                        if (respostas.indexOf(res2.Respostas) == -1)
                            respostas.push(res2.Respostas)

                    }
                })
                let fotos = []
                array.push({
                    perguntas: res.Perguntas, idModelo: res.idModelo, fotos: fotos,
                    idMaquinas: res.idMaquinas, observacao: res.Observacao, resposta: "", horimetro: "",
                    respostas: respostas,
                })

                rearangeArray.push(res.Perguntas);

            }
        })


        res.status(200).send(array)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}

exports.listByModel = async (req, res, next) => {
    let array = [];
    try {
        var Modelo = req.params.Modelo;
        console.log(Modelo)
        var data =
            await Repository.listByModel(Modelo)

        function removeDuplicates(arr) {

            for (let i = 0; i < arr.length; i++) {
                if (array.indexOf(arr[i].Perguntas) == -1) {
                    array.push(arr[i].Perguntas)
                }
            }
            //console.log(array);
            return array
        }
        removeDuplicates(data)
        res.status(200).send(array)

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}

exports.PutOrderModel = async (req, res, next) => {
    try {
        let object = req.body

        for (let i = 0; i < object.length; i++) {

            await Repository.PutOrderModel(object[i], i)

        }

        res.status(200).send({ message: "Ordem Alterada Com sucesso" });

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: "Falha ao processar requisição"
        })
    }
}
exports.PostOut = async (req, res) => {

    try {

        let data = req.body

        await Repository.PostOutmachines(data)
            .catch((e) => { throw new Error(e) })
        res.status(200).send({
            message: "Saida cadastrada com sucesso",

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Falha ao pŕocessar requisição"
        })
    }
}

exports.listMachinesOut = async (req, res, next) => {
    try {
        let AF = req.params.AF
        let data =
            await Repository.listMachinesOut(AF)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: "Erro ao listar Saida de Maquinas"
        })
        console.log(e)
        throw new Error(e)
    }
}