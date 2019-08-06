const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const juegos = sequelize.define('juegos', {
    juid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    junombre:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    juprecio:{
        type:Sequelize.DECIMAL,
        allowNull:false
    },
    jucompany:{
        type:Sequelize.STRING,
        allowNull:false
    },
    juyear:{
        type:Sequelize.STRING,
        allowNull:false
    },
    jurating:{
        type: Sequelize.DATE,
        allowNull: false
    },
    judescription:{
      type: Sequelize.STRING,
      allowNull: false
    }
},{
    timestamps: false
});

//export default clientes;
module.exports = juegos;
