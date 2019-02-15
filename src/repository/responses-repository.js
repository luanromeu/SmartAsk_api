'use strict'

const Questions = require('../../src/models/ItensCheckListModelos-models')
const Responses = require('../../src/models/StatusCheckList-models')
const Group = require('../../src/models/GruposStatusCheckList-models')
const sequelize = require('sequelize')
const Sequelize = require('../db')


exports.addNewReponse = async (object) => {

    try {
        
        let group =

            await Group.find({
                raw:true,
                attributes:['Grupo'],
                limit:1,
                order:[ ['Grupo','DESC'] ]
                })
                
               
                if (group == null || group == undefined ){

                    group = {
                        Group: null
                    }    
                    
                    group.Grupo = parseFloat('001')

                    let groupresult;
                     group.Grupo === parseFloat(group.Grupo) + 1 ? groupresult = 
                     await group.Grupo : groupresult = 
                     await '00'+ (parseFloat(group.Grupo) +1) ;
                 
                    let groupadd =
                    await Group.build({
        
                        Grupo: groupresult
                    })
        
                   await groupadd.save()
        
                 let groupid =
        
                    await Group.find({
                        raw:true,
                        attributes:['id'],
                        limit:1,
                        order:[ ['Grupo','DESC'] ]
                        })
        
                
                let response =
                     await Responses.build({
        
                            Descricao: object.response,
                            idGruposStatusCheckList: groupid.id
                     })
        
                     await response.save()
        
                let question = 
        
                    await Questions.update(
        
                        { idGruposStatusCheckList: groupid.id },
                        { where: { id: object.idquestion } }
                    )
        
                    return question;
                

                } else {

                    let groupresult;
                    group.Grupo === parseFloat(group.Grupo) + 1 ? groupresult = await group.Grupo : groupresult = await '00'+ parseFloat(group.Grupo) +1 ;
                
                   let groupadd =
                   await Group.build({
       
                       Grupo: groupresult
                   })
       
                  await groupadd.save()
       
                   let groupid =
       
                   await Group.find({
                       raw:true,
                       attributes:['id'],
                       limit:1,
                       order:[ ['Grupo','DESC'] ]
                       })
       
               
               let response =
                    await Responses.build({
       
                           Descricao: object.response,
                           idGruposStatusCheckList: groupid.id
                    })
       
                    await response.save()
       
               let question = 
       
                   await Questions.update(
       
                       { idGruposStatusCheckList: groupid.id },
                       { where: { id: object.idquestion } }
                   )
       
                   return question;

                }

 } catch (e) {

        console.log(e)
        throw new Error (e)
    }
}



exports.update = async (object) => {

    try {
      
        let questions = 
        await Questions.find({
                raw:true,
                attributes:['Descricao','idGruposStatusCheckList'],
                where:{
                    Descricao: object.question
                }
        })

        let responses = 
        await Responses.find({
                raw:true,
                attributes:['Descricao','idGruposStatusCheckList'],
                where:{
                    Descricao: object.responses
                }
        })

        console.log(object)
        let idGroup = questions.idGruposStatusCheckList

        if (responses != null) {

            console.log('essa resposta ja existe....')
           return;
        } else {

            let newResponse =
            await Responses.build({

                Descricao: object.responses,
                idGruposStatusCheckList: idGroup
            })

           newResponse.save();
           return newResponse;
        }
               
        

    } catch (e) {

        console.log(e)
        throw new Error (e)
    }
}