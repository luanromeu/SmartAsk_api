const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const StatusCheckList = sequelize.define('StatusCheckList', {
  
    Descricao: {
        type: Sequelize.STRING
    },
    idGruposStatusCheckList: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
StatusCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return StatusCheckList;

});

module.exports = StatusCheckList;
