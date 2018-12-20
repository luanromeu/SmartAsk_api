const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const ApelidosModelos = sequelize.define('ApelidosModelos', {
  
    Apelido: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
ApelidosModelos.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return ApelidosModelos;

});

module.exports = ApelidosModelos;
