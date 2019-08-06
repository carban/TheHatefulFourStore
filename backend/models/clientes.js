const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const clientes = sequelize.define('clientes', {
    cliusuario:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    clipassword:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    clinombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    clicorreo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    clifondos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    clifechanac:{
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    timestamps: false
});

//export default clientes;
module.exports = clientes;
