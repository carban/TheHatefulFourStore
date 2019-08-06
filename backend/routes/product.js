const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();
// const productMO = require('../models/product');

//Consultar todos los productos
router.get('/', async (req, res) => {
  const myquery = {
    text: 'select * from catjuegos natural join juegos order by subid',
  }
  var colors = ['red', 'dark', 'accent', 'success', 'info', 'orange'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  console.log(prof.rows);
  res.json({'games':prof.rows});
});


router.post('/gamesForClient', async (req, res) => {
  const {username} = req.body;
  console.log(username);
  const myquery = {
    text: 'select * from juegos except (select * from (select juid from librerias where cliusuario = $1) as ids natural join juegos)',
    values: [username]
  }
  const myotherquery = {
    text: 'select * from (select juid from librerias where cliusuario = $1) as ids natural join juegos',
    values: [username]
  }

  var colors = ['red', 'dark', 'accent', 'success', 'info', 'orange'];

  const answ = await pg.query(myquery);
  for (var i = 0; i < answ.rows.length; i++) {
    answ.rows[i].added = false;
    answ.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  const answ2 = await pg.query(myotherquery);
  for (var i = 0; i < answ2.rows.length; i++) {
    answ2.rows[i].added = false;
    answ2.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }

  res.json({'allgames':answ.rows, 'yourgames':answ2.rows});
  // res.json({'allgames':answ.rows});
});

router.post('/searchGamesBy', async (req, res) => {
  const {subcat} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join juegos order by subid) as col where subnombre = $1 order by col.subid',
    values: [subcat]
  }
  var colors = ['red', 'dark', 'accent', 'success', 'info', 'orange'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

router.post('/searchGamesByForClient', async (req, res) => {
  const {username, subcat} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join ( select * from juegos except (select * from (select juid from librerias where cliusuario = $1) as ids natural join juegos)) as cli order by subid) as col where subnombre = $2 order by col.subid',
    values: [username, subcat]
  }
  var colors = ['red', 'dark', 'accent', 'success', 'info', 'orange'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

//Crear un nuevo juego
router.post('/crearGame', async (req, res) => {
    const { junombre, juprecio, jucompany, juyear, jurating, judescription, subnombre } = req.body;
    console.log({ junombre, juprecio, jucompany, juyear, jurating, judescription, subnombre });
    const query = {
        text: 'insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription) values ($1, $2, $3, $4, $5, $6)',
        values: [junombre, juprecio, jucompany, juyear, jurating, judescription]
    };
    const query2 = {
        text: 'select juid from juegos where junombre =  $1',
        values: [junombre]
    };

    try {
        await pg.query(query);
        const id = await pg.query(query2)
        const juid = id.rows[0].juid

        const query4 = {
            text: 'select subid from subcategorias where subnombre = $1',
            values: [subnombre]
        };
        const goo = await pg.query(query4);
        console.log('holi'+goo);
        const subid = goo.rows[0].subid;

        const query3 = {
            text: 'insert into catjuegos values ($1, $2)',
            values: [juid, subid]
        };
        await pg.query(query3)
        res.status(200).json({
            msg: 'Juego creado satisfactoriamente'
        });
    } catch (error) {
      console.log(error);
        res.status(400).json({
            msg: 'El juego no fue creado'
        });
    }
})

//Modificar un juego
router.put('/', async (req, res) => {
    const { juid, junombre, juprecio } = req.body;
    if (junombre == '' || juprecio == '') {
        res.status(400).json({
            msg: 'Hay algun campo vacio'
        });
    } else {
        const query = {
            text: 'UPDATE juegos SET junombre=$2, juprecio=$3 WHERE juid=$1',
            values: [juid, junombre, juprecio]
        };
        try {
            await pg.query(query);
            res.status(200).json({
                msg: 'Juego modificado satisfactoriamente'
            });
        } catch (error) {
            res.status(400).json({
                msg: 'El juego no fue modificado'
            });
        }
    }
})

//eliminar un juego
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    query = {
        text: 'DELETE FROM juegos WHERE juid=$1',
        values: [id]
    };
    try {
        await pg.query(query);
        res.status(200).json({
            msg: 'Juego eliminado satisfactoriamente'
        });
    } catch (error) {
        res.status(400).json({
            msg: 'El juego no fue eliminado'
        });
    }
})

module.exports = router;
