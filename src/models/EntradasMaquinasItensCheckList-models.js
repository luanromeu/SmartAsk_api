const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const EntradasMaquinasItensCheckList = sequelize.define('EntradasMaquinasItensCheckList', {
  
    idEntradasMaquinasCheckList: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    idItensCheckListModelos: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    idStatusCheckList: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    Descricao: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Bom: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    Ausente: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Danificado: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    Quebrado: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    idGruposStatusCheckList:{
        type:Sequelize.STRING,
        defaultValue:null
    }
  
    
});

// force: Se True , Substiu a tabela existente
EntradasMaquinasItensCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return EntradasMaquinasItensCheckList;

});

module.exports = EntradasMaquinasItensCheckList;
