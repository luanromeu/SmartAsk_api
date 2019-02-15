const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const EntradasMaquinasItensFotosCheckList = sequelize.define('EntradasMaquinasItensFotosCheckList', {
  
    idEntradasMaquinasFotosCheckList: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Imagem: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
  
    
});

// force: Se True , Substiu a tabela existente
EntradasMaquinasItensFotosCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return EntradasMaquinasItensFotosCheckList;

});

module.exports = EntradasMaquinasItensFotosCheckList;
