const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const EntradasMaquinasCheckList = sequelize.define('EntradasMaquinasCheckList', {
  
    Data: {
        type: Sequelize.DATE,
        defaultValue: null
    },
    idMaquinas: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Horimetro: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    idEntradasMaquinas: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    idEmpresas: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
    idUsuarios: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    dtEfetivacao: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    Observacao: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
EntradasMaquinasCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return EntradasMaquinasCheckList;

});

module.exports = EntradasMaquinasCheckList;
