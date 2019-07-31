const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();


//Consultar todos los productos
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM juegos';
    try {
        const juegos = await pg.query(query);
        res.status(200).json(juegos.rows);
    } catch (error) {
        res.sendStatus(400);
    }
})

//Crear un nuevo juego
router.post('/', async (req, res) => {
    const { junombre, juprecio } = req.body;
    if (junombre == '' || juprecio == '') {
        res.status(400).json({
            msg: 'Hay algun campo vacio'
        });
    } else {
        const query = {
            text: 'INSERT INTO juegos(junombre,juprecio) VALUES ($1,$2)',
            values: [junombre, juprecio]
        };
        try {
            await pg.query(query);
            res.status(200).json({
                msg: 'Juego creado satisfactoriamente'
            });
        } catch (error) {
            res.status(400).json({
                msg: 'El juego no fue creado'
            });
        }
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