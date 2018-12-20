const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const User = sequelize.define('users', {
  
    user: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        defaultValue:null
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    Inativo: {
        type: Sequelize.TINYINT,
        defaultValue:null
    },

});

// force: Se True , Substiu a tabela existente
User.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return User;

});

module.exports = User;
