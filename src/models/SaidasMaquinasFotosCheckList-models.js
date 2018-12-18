const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const SaidasMaquinasFotosCheckList = sequelize.define('SaidasMaquinasFotosCheckList', {
  
    Data: {
        type: Sequelize.DATE
    },
    idFotosCheckListModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Observacao: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Inativo:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    idSaidasMaquinasCheckList:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Descricao:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    
});

// force: Se True , Substiu a tabela existente
SaidasMaquinasFotosCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return SaidasMaquinasFotosCheckList;

});

module.exports = SaidasMaquinasFotosCheckList;
