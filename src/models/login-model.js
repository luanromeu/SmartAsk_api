const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const User = sequelize.define('users', {
  
    user: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
        
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    inativo: {
        type: Sequelize.TINYINT
        
    },
    autorizado: {
        type: Sequelize.TINYINT,
        defaultValue:'0'
    },
    unidade: {
        type: Sequelize.STRING
        
    },
  

});

// force: Se True , Substiu a tabela existente
User.sync({ force:false }).then(() => {

    // Retorna Tabela Criada
    return User;

});

module.exports = User;
