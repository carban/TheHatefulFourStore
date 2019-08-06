const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');
const juegos = require('./juegos.js')
const subcategorias = require('./subcategorias.js')
//Creacion de los modelos
const catjuegos = sequelize.define('catjuegos', {
    juid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    subid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
    }
},{
    timestamps: false
});

catjuegos.hasMany(juegos);
juegos.belongsTo(catjuegos);
catjuegos.hasMany(subcategorias);
subcategorias.belongsTo(catjuegos);

//export default clientes;
module.exports = clientes;
