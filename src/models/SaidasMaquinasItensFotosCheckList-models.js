const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const SaidasMaquinasItensFotosCheckList = sequelize.define('SaidasMaquinasItensFotosCheckList', {
  
    idSaidasMaquinasFotosCheckList: {
        type: Sequelize.STRING
    },
    Imagem: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
SaidasMaquinasItensFotosCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return SaidasMaquinasItensFotosCheckList;

});

module.exports = SaidasMaquinasItensFotosCheckList;
