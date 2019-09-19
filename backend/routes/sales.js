const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();
const productMO = require('../models/juegos');
const libreriasMO = require('../models/librerias');
const catjuegosMO = require('../models/catjuegos');
const Sequelize = require('sequelize');
const orm = require('../db/connection.js');

router.post('/', async (req, res) => {
  const {allinfo, username} = req.body;

  const myquery = {
    text: 'insert into pagos(fechapago, metodouno, valoruno, metododos, valordos, metodotres, valortres) values(current_date, $1, $2, $3, $4, $5, $6)',
    values: [allinfo.modals[0].mode, allinfo.modals[0].money, allinfo.modals[1].mode, allinfo.modals[1].money, allinfo.modals[2].mode, allinfo.modals[2].money]
  }
  const prof = await pg.query(myquery);

  const checkQuery = {text: 'select pagoid from pagos order by pagoid desc limit 1'};

  const prof2 = await pg.query(checkQuery);

  let lastID = prof2.rows[0].pagoid;
  let aGames = allinfo.games;

  for (var i = 0; i < aGames.length; i++) {
    let price = aGames[i].juprecio.split("$");
    let theprice = parseInt(price[1]);
    console.log([lastID, theprice, aGames[i].judescuentoactual, true, username, aGames[i].juid]);
    const lastQuery = {
      text: 'insert into librerias (pagoid, valorjuego, descuentoalcomprar, esvalida, cliusuario, juid) values($1, $2, $3, $4, $5, $6)',
      values: [lastID, theprice, aGames[i].judescuentoactual, true, username, aGames[i].juid]
    }
    const prof3 = await pg.query(lastQuery);
  }

  res.json({res: 'SOLD'})
});

router.get('/tops', async (req, res) => {
  const myquery = {
    text: 'select junombre, count(*) from librerias inner join juegos on librerias.juid = juegos.juid group by juegos.junombre order by count desc',
  }
  const prof = await pg.query(myquery);
  console.log(prof.rows);
  res.json({"tops": prof.rows});
});

module.exports = router;
