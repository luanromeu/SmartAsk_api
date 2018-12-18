const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const FotosCheckListModelos = sequelize.define('FotosCheckListModelos', {
  
    idCheckListModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Descricao:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Ordem: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },
    Inativo:{
        type:Sequelize.TINYINT,
        defaultValue:null
    }
  
    
});

// force: Se True , Substiu a tabela existente
FotosCheckListModelos.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return FotosCheckListModelos;

});

module.exports = FotosCheckListModelos;
