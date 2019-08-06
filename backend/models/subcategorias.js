const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');

//Creacion de los modelos
const subcategorias = sequelize.define('subcategorias', {
    subid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    subnombre:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    subdescripcion:{
        type:Sequelize.DECIMAL,
        allowNull:false
    },
    catid:{ //FOREIGN KEY
        type:Sequelize.STRING,
        allowNull:false
    },
},{
    timestamps: false
});

//export default clientes;
module.exports = subcategorias;
