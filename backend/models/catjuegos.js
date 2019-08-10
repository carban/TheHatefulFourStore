const Sequelize = require('sequelize')
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
  mods.juegos.belongsTo(catjuegos);
  mods.subcategorias.belongsTo(catjuegos);
}


//export default clientes;
module.exports = catjuegos;
