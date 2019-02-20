const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const SaidasMaquinasFotosCheckList = sequelize.define('SaidasMaquinasFotosCheckLists', {
  
    Data: {
        type: Sequelize.DATE,
        defaultValue:null
    },
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
    idSaidasMaquinasCheckList: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Descricao: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
SaidasMaquinasFotosCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return SaidasMaquinasFotosCheckList;

});

module.exports = SaidasMaquinasFotosCheckList;
