const Sequelize = require('sequelize')


const sequelize = new Sequelize('hateful4','postgres','lordpostgres123',
{
    host:'localhost',
    dialect:'postgres',
    port: 5432,
    logging: false,
    define: {
      "createdAt": null,
      "updatedAt": null
    }
});

try {
    sequelize.authenticate()
    console.log('Conectado a la base de datos');
} catch (error) {
    console.log(error);
}

module.exports = sequelize;
//Fin de la configuracion

/*
//Creacion de los modelos
const Clientes = sequelize.define('clientes', {
    id:{
        type:Sequelize.SMALLINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    correo:{
        type:Sequelize.STRING,
        primaryKey:false,
        allowNull:false
    },
    nombre:Sequelize.STRING,
    password:Sequelize.STRING,
    fechanacimiento:Sequelize.DATE
});

const empleado = sequelize.define('empleado',{
    id:{
        type:Sequelize.SMALLINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    correo:{
        type:Sequelize.STRING,
        primaryKey:false,
        allowNull:false
    },
    nombre:Sequelize.STRING,
    password:Sequelize.STRING,
    rol:Sequelize.STRING
});

//Migracion a la Base de datos
sequelize.sync({force: true})*/
