const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();
const productMO = require('../models/juegos');
const libreriasMO = require('../models/librerias');
const catjuegosMO = require('../models/catjuegos');
const Sequelize = require('sequelize');
const orm = require('../db/connection.js');

//Consultar todos los productos
router.get('/', async (req, res) => {
  // const myquery = {
  //   text: 'select * from catjuegos natural join juegos order by subid',
  // }
  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];
  // const prof = await pg.query(myquery);
  try {
    const prof = await productMO.findAll({
      raw: true,
      order: [['juid', 'ASC']]
    });
    // const prof = await orm.query('select', type: Sequelize.QueryTypes.SELECT)
    for (var i = 0; i < prof.length; i++) {
      prof[i].added = false;
      prof[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
    }
    console.log(prof);
    res.json({'games':prof});
  } catch (e) {
    console.log(e);
    res.json({'error': e})
  }

});


router.get('/gamesAdmin', async (req, res) => {

  try {


    const myquery = {
      text: 'select * from (select * from (select * from juegos natural join catjuegos) as p1) as p2 natural join subcategorias;'
    }

    const answ = await pg.query(myquery);
    var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];

    for (var i = 0; i < answ.rows.length; i++) {
      answ.rows[i].added = false;
      answ.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
    }
    // console.log(answ.rows);
    res.json({'allgames':answ.rows});
  } catch (e) {
    console.log(e);
    res.json(e)
  }
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

  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];

  const answ = await pg.query(myquery);
  // /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // const answ = await productMO.findAll({
  //   where: {
  //     [Sequelize.Op.notIn]: [{cliusuario: username}]
  //   },
  //   include: [libreriasMO]
  // })

  for (var i = 0; i < answ.rows.length; i++) {
    answ.rows[i].added = false;
    answ.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  for (var i = 0; i < answ.length; i++) {
    answ[i].added = false;
    answ[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  const answ2 = await pg.query(myotherquery);
  // const answ2 = await productMO.find();
  for (var i = 0; i < answ2.rows.length; i++) {
    answ2.rows[i].added = false;
    answ2.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }

  res.json({'allgames':answ.rows, 'yourgames':answ2.rows});
  // res.json({'allgames':answ.rows});
});

//Buscar juego por categoria
router.post('/searchGamesBy', async (req, res) => {
  const {subcat} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join juegos order by subid) as col where subnombre = $1 order by col.subid',
    values: [subcat]
  }
  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

//Buscar juego por categoria estando logueado como cliente
router.post('/searchGamesByForClient', async (req, res) => {
  const {username, subcat} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join ( select * from juegos except (select * from (select juid from librerias where cliusuario = $1) as ids natural join juegos)) as cli order by subid) as col where subnombre = $2 order by col.subid',
    values: [username, subcat]
  }
  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

//Buscar juego por palabra clave
router.post('/searchGamesKeyWord', async (req, res) => {
  const {kword} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join juegos order by subid) as col where junombre like $1 order by col.subid',
    values: ['%'+kword+'%']
  }
  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

//Buscar juego por palabra estando logueado como cliente
router.post('/searchGamesKeyWordForClient', async (req, res) => {
  const {username, kword} = req.body;
  const myquery = {
    text: 'select * from subcategorias natural join (select * from catjuegos natural join ( select * from juegos except (select * from (select juid from librerias where cliusuario = $1) as ids natural join juegos)) as cli order by subid) as col where junombre like $2 order by col.subid',
    values: [username, "%"+kword+"%"]
  }
  var colors = ['secondary', 'danger', 'accent', 'success', 'purple', 'info'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});

//Crear un nuevo juego
router.post('/crearGame', async (req, res) => {
    const { junombre, juprecio, jucompany, juyear, jurating, judescription, subnombre, juimage, judescuentoactual} = req.body;
    console.log({ junombre, juprecio, jucompany, juyear, jurating, judescription, subnombre, juimage });
    const query = {
        text: 'insert into juegos (junombre, juprecio, jucompany, juyear, jurating, judescription, juimage, judescuentoactual) values ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [junombre, juprecio, jucompany, juyear, jurating, judescription, juimage, judescuentoactual]
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
        //
        // const query3 = {
        //     text: 'insert into catjuegos values ($1, $2)',
        //     values: [juid, subid]
        // };
        // await pg.query(query3)
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        await catjuegosMO.create({
          'juid': juid,
          'subid': subid
        })

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
router.post('/editGame', async (req, res) => {
    const { juid, junombre, jucompany, judescription, juprecio, juyear, jurating, subnombre, juimage } = req.body;
    // QUEDA PENDIENTE MODICAR LA SUBCATEGORIA
    const query = {
        text: 'UPDATE juegos SET junombre=$2, jucompany=$3, judescription=$4, juprecio=$5, juyear=$6, jurating=$7, juimage=$8 WHERE juid=$1',
        values: [juid, junombre, jucompany, judescription, juprecio, juyear, jurating, juimage]
    };
    try {
        await pg.query(query);
        res.status(200).json({
            msg: 'Juego modificado satisfactoriamente'
        });
    } catch (error) {
      console.log(error);
        res.status(400).json({
            msg: 'El juego no fue modificado'
        });
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
