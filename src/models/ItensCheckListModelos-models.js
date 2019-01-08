const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const ItensCheckListModelos = sequelize.define('ItensCheckListModelos', {
  
    idCheckListModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Descricao:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Ordem:{
        type:Sequelize.INTEGER,
        defaultValue:null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    idGruposStatusCheckList:{
        type:Sequelize.STRING,
        defaultValue:null
    }
  
    
});

// force: Se True , Substiu a tabela existente
ItensCheckListModelos.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return ItensCheckListModelos;

});

module.exports = ItensCheckListModelos;
