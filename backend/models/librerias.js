const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const librerias = sequelize.define('librerias', {
    idcompra:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
    fechacompra:{
        type:Sequelize.DATE,
        allowNull:false
    },
    valorcompra:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    esvalida:{
        type:Sequelize.STRING,
        allowNull:false
    },
    cliusuario:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    juid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
    }
},{
    timestamps: false
});

//export default clientes;
module.exports = clientes;
