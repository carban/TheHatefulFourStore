const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();


//Consultar todas las subcategorias existentes
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM subcategorias';
  try {
    const subcat = await pg.query(query);
    res.status(200).send(subcat.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})

//Crear una nueva subcategoria
router.post('/', async (req, res) => {
  const { subnombre, subdescripcion, catid } = req.body; 
  if (subnombre == '' || subdescripcion == '' ) {
    res.status(400).json({
      msg: 'Hay algun campo vacio'
    });
  } else {
    const query = {
      text: 'INSERT INTO subcategorias(subnombre,subdescripcion,catid) VALUES ($1,$2,$3)',
      values: [subnombre, subdescripcion, catid]
    }
    try {
      await pg.query(query);
      res.status(200).json({
        msg: 'Subcategoria creada con exito'
      });
    } catch (error) {
      res.status(400).json({
        msg: 'No se pudo crear la subcategoria'
      });
      console.log(error);
    }
  }
})

//Modificar una subcategoria
router.put('/', async (req, res) => {
  const { subid, subnombre, subdescripcion } = req.body;
  if (subnombre == '' || subdescripcion == '') {
    res.status(400).json({
      msg: 'Hay algun campo vacio'
    });
  } else {
    const query = {
      text: 'UPDATE subcategorias SET subnombre=$2, subdescripcion=$3 WHERE subid=$1',
      values: [subid, subnombre, subdescripcion]
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
  }
})

//eliminar una subcategoria
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const query = {
    text:'DELETE FROM subcategorias WHERE subid=$1',
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