const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();


//Consultar todas las subcategorias existentes
router.get('/', async (req, res) => {
  const {username} = req.body;
  const myquery = {
    text: 'select subid, subnombre, catid from subcategorias natural join categorias where subactivo=true and catactivo=true order by catid;',
  }
  const prof = await pg.query(myquery);
  var answ = [];
  var aux = [];
  var x = prof.rows[0].catid;
  for (var i = 0; i < prof.rows.length; i++) {
    if (prof.rows[i].catid != x) {
      answ.push(aux);
      aux = [];
      x = prof.rows[i].catid;
    }
    aux.push(prof.rows[i]);
  }
  answ.push(aux);
  //console.log(answ);
  res.json({'subcats':answ});
})

router.get('/combo', async (req, res) => {
  const query = 'SELECT * FROM subcategorias where subactivo=true';
  try {
    const subcat = await pg.query(query);
    res.status(200).send(subcat.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

//Crear nuevas subcategorias
router.post('/', async (req, res) => {
  const {list} = req.body;
  for (var i = 0; i < list.length; i++) {
    var cate = list[i].cate;
    var sub = list[i].sub;
    try {
      const myquery = {
        text: "select catid from categorias where catnombre = $1",
        values: [cate]
      }
      const prof = await pg.query(myquery);
      var id = prof.rows[0].catid;
      const myquery2 = {
        text: "insert into subcategorias (subnombre, subdescripcion,subactivo, catid) values ($1, 'description', true, $2)",
        values: [sub, id]
      }
      const prof2 = await pg.query(myquery2);
    } catch (e) {
      console.log(e);
    }
  }
  res.json({'msg':'created'});
})

//Modificar una subcategoria
router.put('/', async (req, res) => {
  const { subid, subnombre} = req.body;
  const query = {
    text: 'UPDATE subcategorias SET subnombre=$2 WHERE subid=$1',
    values: [subid, subnombre]
  }
  try {
    await pg.query(query);
    res.status(200).json({
      msg: 'Subcategoria modificada con exito'
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se pudo modificar la subcategoria'
    });
    console.log(error);
  }
})

//eliminar una subcategoria
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const query = {
    text:'UPDATE subcategorias SET subactivo=false WHERE subid=$1',
    values:[id]
  };
  try {
    await pg.query(query);
    res.status(200).json({
      msg: 'Subcategoria eliminada con exito'
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se pudo eliminar la subcategoria'
    });
  }
})

module.exports = router;
