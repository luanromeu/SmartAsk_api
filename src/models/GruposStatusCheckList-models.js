const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const GruposStatusCheckList = sequelize.define('GruposStatusCheckList', {
  
    Grupo: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
GruposStatusCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return GruposStatusCheckList;

});

module.exports = GruposStatusCheckList;
