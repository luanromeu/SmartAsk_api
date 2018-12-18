const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const EntradasMaquinasFotosCheckList = sequelize.define('EntradasMaquinasFotosCheckList', {
  
    idFotosCheckListModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Observacao: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    idEntradasMaquinasCheckList: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Descricao: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
  
  
    
});

// force: Se True , Substiu a tabela existente
EntradasMaquinasFotosCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return EntradasMaquinasFotosCheckList;

});

module.exports = EntradasMaquinasFotosCheckList;
