const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const empleados = sequelize.define('empleados', {
    emusuario:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    empassword:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    emnombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emrol:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emcorreo:{
        type:Sequelize.STRING,
        allowNull:false
    },
},{
    timestamps: false
});

//export default clientes;
module.exports = empleados;
