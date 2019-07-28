const express = require('express')
const router = express.Router()
const pg = require('../db/database.js');


//Consultar todas las categorias existentes
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM categorias';
  try {
    const cat = await pg.query(query);
    res.status(200).send(cat.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

//Crear una nueva categoria
router.post('/', async (req, res) => {
  const { catnombre, catdescripcion } = req.body;
  if (catnombre == '' || catdescripcion == '') {
    res.status(400).json({
      msg: 'Hay algun campo vacio'
    });
  } else {
    const query = {
      text: 'INSERT INTO categorias(catnombre, catdescripcion) VALUES ($1,$2)',
      values: [catnombre, catdescripcion]
    }
    try {
      await pg.query(query);
      res.status(200).json({
        msg: 'Categoria creada con exito'
      });
    } catch (error) {
      res.status(400).json({
        msg: 'No se pudo crear la categoria'
      });
      console.log(error);
    }
  }
})

//Modificar una categoria
router.put('/', async (req, res) => {
  const { catid, catnombre, catdescripcion } = req.body;
  if (catnombre == '' || catdescripcion == '') {
    res.status(400).json({
      msg: 'Hay algun campo vacio'
    });
  } else {
    const query = {
      text: 'UPDATE categorias SET catnombre=$2, catdescripcion=$3 WHERE catid=$1',
      values: [catid, catnombre, catdescripcion]
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
  }
})

//eliminar una categoria
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const query = {
    text: 'DELETE FROM categorias WHERE catid=$1',
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

module.exports = router;