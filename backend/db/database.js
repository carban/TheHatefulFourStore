const {Pool} = require('pg')

const pool = new Pool({
  user:'juancamilo',
  host:'localhost',
  database:'hatefulfour',
  password:'24880312',
  port:5433
})
console.log('Conectado a la base de datos')
module.exports = pool;
