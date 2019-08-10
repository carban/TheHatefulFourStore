const Sequelize = require('sequelize')
//import {sequelize} from '../database/connection.js'
const sequelize = require('../db/connection.js');
const clientes = require('./clientes.js')
const empleados = require('./empleados.js')

//Creacion de los modelos
const servicioUsuario = sequelize.define('servicioUsuario', {
    serID:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    cliusuario:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    emusuario:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    serfecha:{
        type:Sequelize.DATE,
        allowNull:false
    },
    serDescripcion:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps: false
});

servicioUsuario.associate = (mods) => {
  servicioUsuario.hasMany(mods.clientes);
  servicioUsuario.hasMany(mods.empleados);
  mods.clientes.belongsTo(servicioUsuario);
  mods.empleados.belongsTo(servicioUsuario);
}

//export default clientes;
module.exports = clientes;
