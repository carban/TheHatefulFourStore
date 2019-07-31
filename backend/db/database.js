const { Pool } = require('pg')
var pool; ///Singleton Pattern
module.exports = {
  getPool: function () {
    if (pool) {
      return pool;
    } else {
      pool = new Pool({
        user: 'juancamilo',
        host: 'localhost',
        database: 'hatefulfour',
        password: '24880312',
        port: 5433
      });
      console.log('Conectado a la base de datos');
      return pool;
    }
  }
}
//https://github.com/mysqljs/mysql/issues/1482

/*
const pool = new Pool({
  user:'juancamilo',
  host:'localhost',
  database:'hatefulfour',
  password:'24880312',
  port:5433
})
console.log('Conectado a la base de datos')
module.exports = pool;*/
