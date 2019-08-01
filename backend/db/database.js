const { Pool } = require('pg')
var pool; ///Singleton Pattern
module.exports = {
  getPool: function () {
    if (pool) {
      return pool;
    } else {
      pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'hateful4',
        password: 'lordpostgres123',
        port: 5432
      });
      console.log('Conectado a la base de datos');
      return pool;
    }
  }
}
//https://github.com/mysqljs/mysql/issues/1482

/*
const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'hatefulfour',
  password:'lordpostgres123',
  port:5432
})
console.log('Conectado a la base de datos')
module.exports = pool;*/
