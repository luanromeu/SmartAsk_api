const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const CheckListModelos = sequelize.define('CheckListModelos', {
  
    idModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue: null,
    },
  
    
});

// force: Se True , Substiu a tabela existente
CheckListModelos.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return CheckListModelos;

});

module.exports = CheckListModelos;
