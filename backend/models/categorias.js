const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const categorias = sequelize.define('categorias', {
    catid:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    catnombre:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    catdescripcion:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps: false
});

//export default clientes;
module.exports = categorias;
