const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');
// const catjuegos = require('./catjuegos')
//Creacion de los modelos
const subcategorias = sequelize.define('subcategorias', {
    subid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    subnombre:{
        type:Sequelize.STRING,
        allowNull:false
    },
    subdescripcion:{
        type:Sequelize.STRING,
        allowNull:false
    },
    catid:{ //FOREIGN KEY
        type:Sequelize.INTEGER,
        allowNull:false
    },
    subactivo: {
      type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
});
// subcategorias.belongsTo(catjuegos);
//export default clientes;
module.exports = subcategorias;
