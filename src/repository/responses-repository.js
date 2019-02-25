'use strict'

const Questions = require('../../src/models/ItensCheckListModelos-models')
const Responses = require('../../src/models/StatusCheckList-models')
const Group = require('../../src/models/GruposStatusCheckList-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')
var idGrupo;


exports.addNewReponse = async (object,idquestion) => {
    try {
        
        
        let group =

            await Group.find({
                raw: true,
                attributes: ['Grupo'],
                order: [['Grupo', 'DESC']],
                limit: 1
            })

              
     if (group == null || group == undefined) {
                
        object.map(async (array) => {

            group = await {
                Group: null
            }

            group.Grupo = 0

            let groupresult;
            groupresult =
                await Number(group.Grupo) + 1;

            let groupadd =
                await Group.build({

                    Grupo: groupresult
                })

            await groupadd.save()

           var  groupid =

                await Group.find({
                    raw: true,
                    attributes: ['id'],
                    limit: 1,
                    order: [['Grupo', 'DESC']]
                })


                let response =
                    await Responses.build({

                        Descricao: array.Respostas,
                        idGruposStatusCheckList: groupid.id
                    })

                await response.save()
                
                
                let question =
                
                await Questions.update(
                    
                    { idGruposStatusCheckList: groupid.id},
                    { where: { id: idquestion } }
                    )
                    
                    return question;
                })
                return;    

        } else {
            console.log(object)
            let groupresult;
            await group.Grupo == group.Grupo++ ? groupresult = await group.Grupo : groupresult = await group.Grupo++;
           
            object.map(async (array) => {
            
            
            let groupadd =
            await Group.build({
                
                Grupo: groupresult
            })
            
            await groupadd.save()
            
           var groupid =
            
            await Group.find({
                raw: true,
                attributes: ['id'],
                order: [['Grupo', 'DESC']],
                limit: 1
            })

           
             let response =
                    await Responses.build({

                        Descricao: array.Respostas,
                        idGruposStatusCheckList: groupid.id
                    })

                await response.save()
              
                
                let question =
                
                await Questions.update(
                    
                    { idGruposStatusCheckList: groupid.id },
                    { where: { id: idquestion } }
                    )
                    
                    return question;
                });
             return;       
        }

    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}



exports.update = async (object, array) => {

    try {
        
        let aux = JSON.parse(array)
        console.log(aux)
        aux.map(async (response) => {
        
        let questions =

        await Questions.find({
            raw: true,
            attributes: ['Descricao', 'idGruposStatusCheckList'],
            where: {
                Descricao: object.question
            }
        })
        
        
        let responses =
        await Responses.find({
            raw: true,
            attributes: ['Descricao', 'idGruposStatusCheckList'],
            where: {
                Descricao: response.Respostas
            }
        })
        
        
        if (responses != null) {
            
            console.log('essa resposta ja existe....')
            return;
            
        } else {
            
            let newResponse =
            await Responses.build({
                
                Descricao: response.Respostas,
                idGruposStatusCheckList: questions.idGruposStatusCheckList
            })
            
            newResponse.save();
            return newResponse;
        }
        
    } )


    } catch (e) {

        console.log(e)
        throw new Error(e)
    }
}