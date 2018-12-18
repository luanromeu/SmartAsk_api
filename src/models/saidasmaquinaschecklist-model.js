const sequelize = require('../../src/db');
const Sequelize = require('sequelize');

const SaidasMaquinasCheckList = sequelize.define('SaidasMaquinasCheckList', {
  
    Data: {
        type: Sequelize.DATE
    },
    idMaquinas: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    Horimetro: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    idSaidasMaquinas:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idEmpresas:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    Inativo:{
        type:Sequelize.TINYINT,
        defaultValue:null
    },
    idAvaliador:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idTecnicoResponsavel:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idGestor:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idLogistica:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    idUsuarios:{
        type:Sequelize.STRING,
        defaultValue:null
    },
    dtEfetivacao:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    DataAvaliador:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    DataTecnicoResponsavel:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    DataGestor:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    DataLogistica:{
        type:Sequelize.DATE,
        defaultValue:null
    },
    Observacao:{
        type:Sequelize.STRING,
        defaultValue:null
    },


});

// force: Se True , Substiu a tabela existente
SaidasMaquinasCheckList.sync({ force: false }).then(() => {

    // Retorna Tabela Criada
    return SaidasMaquinasCheckList;

});

module.exports = SaidasMaquinasCheckList;
