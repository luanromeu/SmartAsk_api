const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const PerguntasQuestionarios = sequelize.define('PerguntasQuestionarios', {
  
    idQuestionario: {
        type: Sequelize.STRING,
        defaultvalue:null
    },

    idItensCheckListModelos: {
        type: Sequelize.STRING,
        defaultvalue:null
    },

    Inativo: {
        type: Sequelize.TINYINT,
        defaultvalue:0
    }
    
 
  });

// force: Se True , Substiu a tabela existente
PerguntasQuestionarios.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return PerguntasQuestionarios;

});

module.exports = PerguntasQuestionarios;
