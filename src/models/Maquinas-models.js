const sequelize = require('../../src/db');
const Sequelize = require('sequelize');
const Models = require('../models/Modelos-models')

const Maquinas = sequelize.define('Maquinas', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CodigoExibicao: {
        type: Sequelize.STRING
    },
    idModelos: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Serie: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    Observacao:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Cadastro:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    Cancelado:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    Inativo:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    idCstCOFINS:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idCstPIS:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idCstICMS:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    NCM:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    OrigemMercadoria:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    EstoqueAtual:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    ValorAtual:{
        type:Sequelize.INTEGER,
        defaultValue:null
    },
    idOrigemMercadoria:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idCstIPI:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    IPICodigoEnquadramento:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    IPIClasseEnquadramento:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    ValorCompra:{
        type: Sequelize.FLOAT,
        defaultValue: null
    },
    ValorAproxTributos:{
        type: Sequelize.FLOAT,
        defaultValue: null
    },
    ValorSubLocacao:{
        type: Sequelize.FLOAT,
        defaultValue: null
    },
    SubLocacao:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    idEmpresas:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    idUltimaSaida:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    idUltimaEntrada:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    EmCasa:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    ForaDeCasa:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    Disponivel:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    EmManutencao:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    EmLocacao:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    Vendida:{
        type: Sequelize.TINYINT,
        defaultValue: null
    },
    NumeroChassi:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    AnoFabricacao:{
        type: Sequelize.DATE,
        defaultValue: null
    },
    idClientes:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    Patrimonio:{
        type: Sequelize.STRING,
        defaultValue: null
    }

},{
    timestamps:true
});

// force: Se True , Substiu a tabela existente
Maquinas.sync({ force: false }).then(() => {

 

    // Retorna Tabela Criada
    return Maquinas;

});

module.exports = Maquinas;
