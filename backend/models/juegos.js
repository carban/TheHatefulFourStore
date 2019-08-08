const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');
// const catjuegos = require('../models/catjuegos');
//Creacion de los modelos
const juegos = sequelize.define('juegos', {
    juid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    junombre:{
        type:Sequelize.STRING,
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
        type:Sequelize.INTEGER,
        allowNull:false
    },
    jurating:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    judescription:{
      type: Sequelize.STRING,
      allowNull: false
    }
},{
    timestamps: false
});
// juegos.belongsTo(catjuegos);
// juegos.hasOne(catjuegos);
// catjuegos.hasMany(juegos);

//export default clientes;
module.exports = juegos;
