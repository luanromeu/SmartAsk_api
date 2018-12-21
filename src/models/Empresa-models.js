const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const Empresa = sequelize.define('Empresa', {
  
    nome: {
        type: Sequelize.STRING,
        defaultvalue:null
    }
 
  });

// force: Se True , Substiu a tabela existente
Empresa.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return Empresa;

});

module.exports = Empresa;
