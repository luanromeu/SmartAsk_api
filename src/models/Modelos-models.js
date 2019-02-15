const sequelize = require('../../src/db');
const Sequelize = require('sequelize');
const Maquinas = require('../models/Maquinas-models')


const Modelos = sequelize.define('Modelos', {

    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Modelo: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Observacao: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Cadastro: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    Cancelado:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    Inativo:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    ValorBase:{
        type:Sequelize.FLOAT,
        defaultValue:null
    },
    idTiposModelos:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    EquipamentosBasicos:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    ApelidoOLD:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Fabricante:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Peso:{
        type:Sequelize.FLOAT,
        defaultValue:null
    },
    idApelidosModelos:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    
},



);

// force: Se True , Substiu a tabela existente
Modelos.sync({ force: false }).then(() => {


    // Retorna Tabela Criada
    return Modelos;

});

module.exports = Modelos;
