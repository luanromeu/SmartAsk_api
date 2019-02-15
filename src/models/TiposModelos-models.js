const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const TiposModelos = sequelize.define('TiposModelos', {
  
    TipoModelo: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null
    },
  
});

// force: Se True , Substiu a tabela existente
TiposModelos.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return TiposModelos;

});

module.exports = TiposModelos;
