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

catjuegos.associate = (mods) => {
  catjuegos.hasMany(mods.juegos);
  catjuegos.hasMany(mods.subcategorias);
  catjuegos.belongsTo(mods.juegos);
  catjuegos.belongsTo(mods.subcategorias);
  // catjuegos.hasMany(juegos);
  // catjuegos.hasMany(subcategorias);
}


//export default clientes;
module.exports = catjuegos;
