const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();


//Consultar todas las categorias existentes
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM categorias WHERE catactivo=true ORDER BY catid';
  try {
    const cat = await pg.query(query);
    res.status(200).send({ 'cats': cat.rows });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

//Crear nuevas categorias
router.post('/', async (req, res) => {
  const { list } = req.body;
  try {
    for (var i = 0; i < list.length; i++) {
      const myquery = {
        text: "insert into categorias (catnombre, catdescripcion,catactivo) values ($1, 'description',true);",
        values: [list[i].title]
      }
      const prof = await pg.query(myquery);
    }

  } catch (e) {
    console.log(e);
  }

  res.json({ 'msg': 'created' });
});

//Modificar una categoria
router.put('/', async (req, res) => {
  const { catid, catnombre } = req.body;
  console.log(catid, catnombre);
  const query = {
    text: 'UPDATE categorias SET catnombre=$2 WHERE catid=$1',
    values: [catid, catnombre]
  }
  try {
    await pg.query(query);
    res.status(200).json({
      msg: 'Categoria modificada con exito'
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se pudo modificar la categoria'
    });
    console.log(error);
  }
})

//eliminar una categoria
router.delete('/:id', async (req, res) => {
  //const { id } = req.body;
  const id = req.params.id;
  const query = {
    text: 'UPDATE categorias SET catactivo=false WHERE catid=$1',
    values: [id]
  };
  try {
    await pg.query(query);
    res.status(200).json({
      msg: 'Categoria eliminada con exito'
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se pudo eliminar la categoria'
    });
  }
})

//consultar categorias que han sido desactivadas
router.get('/inactivas', async (req, res) => {
  const query = 'SELECT * FROM categorias WHERE catactivo=false';
  try {
    const cat = await pg.query(query);
    res.status(200).send({ 'cats': cat.rows });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

//reactivar categoria
router.put('/reactivate', async (req, res) => {
  const { catid } = req.body;
  
  const query = {
    text: 'UPDATE categorias SET catactivo=true WHERE catid=$1',
    values: [catid]
  }
  try {
    await pg.query(query);
    res.status(200).json({
      msg: 'Categoria reactivada con exito'
    });
  } catch (error) {
    res.status(400).json({
      msg: 'No se pudo reactivar la categoria'
    });
    console.log(error);
  }
})

module.exports = router;
