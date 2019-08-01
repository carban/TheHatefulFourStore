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
