const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const ModelosQuestionarios = sequelize.define('ModelosQuestionarios', {
  

    idQuestionario: {
        type: Sequelize.STRING,
        defaultvalue:null
    },

    idModelos: {
        type: Sequelize.STRING,
        defaultvalue:null
    },

    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue:0
       
    }
 
  });

// force: Se True , Substiu a tabela existente
ModelosQuestionarios.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return ModelosQuestionarios;

});

module.exports = ModelosQuestionarios;
