const {Pool} = require('pg')

const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'hatefulfour',
  password:'lordpostgres123',
  port:5432
})
console.log('Conectado a la base de datos')
module.exports = pool;
