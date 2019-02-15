const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const Questionarios = sequelize.define('Questionarios', {
  
    nome: {
        type: Sequelize.STRING,
        defaultvalue:null
    },
    
    Inativo:{
        type: Sequelize.TINYINT,
        defaultvalue: 0
    }   
 
  });

// force: Se True , Substiu a tabela existente
Questionarios.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return Questionarios;

});

module.exports = Questionarios;
