const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();
const jwt = require('jsonwebtoken');

//Consultar todos los clientes existentes(ESTE ES SOLO PARA PRUEBAS)
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM clientes';
  try {
    const cli = await pg.query(query);
    res.status(200).send(cli.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
})


// CONSULTAR USUARIO
router.post('/profile', async (req, res) => {
  const {username} = req.body;
  const myquery = {
    text: 'select cliusuario, clinombre, clicorreo, clifondos, clifechanac from clientes where cliusuario = $1',
    values: [username]
  }
  const prof = await pg.query(myquery);
  res.json({'profileInfo':prof.rows[0]});
});


//login
router.post('/login',async(req,res) => {
  const {cliusuario,clipassword} = req.body;
  if(cliusuario == '' || clipassword == ''){
    res.json({
      msg:'Hay algun campo vacio'
    })
    // return;
  }
  else {
    const query = {
      text:'SELECT cliusuario,clipassword from clientes WHERE cliusuario=$1',
      values:[cliusuario]
    }
    try{
      const user = await pg.query(query);
      if(user.rows.length == 0){
        res.json({
          msg:'El usuario '+cliusuario+' no esta registrado'
        })
        // return;
      }else if (clipassword == user.rows[0].clipassword) {
        const userExistent = user.rows[0].cliusuario;
        const token = jwt.sign({userExistent},'mySecretKey');
        res.status(200).json({
          token
        })
      }
      else{
        res.json({
          msg:'Contrasena erronea'
        })
      }
    }
    catch(err){
      res.status(400).json({
        msg:err
      })
    }
  }
})

//registro de usuarios
router.post('/signup',async(req,res) => {
  const {cliusuario,clipassword,clinombre,clicorreo,clifondos,clifechanac} = req.body;
  console.log(cliusuario, clipassword, clinombre, clicorreo, clifondos, clifechanac);

  const query = {
    text:'INSERT INTO clientes(cliusuario,clipassword,clinombre,clicorreo,clifondos,clifechanac) Values ($1,$2,$3,$4,$5,$6)',
    values:[cliusuario,clipassword,clinombre,clicorreo,clifondos,clifechanac]
  }
  try {
    await pg.query(query)
    res.status(200).json({
      msg:'Usuario registrado satisfactoriamente'
    })
  } catch (err) {
    res.status(400).json({
      msg:err
    })
  }
})

//modificar usuario
router.put('/updateProfile',async(req,res) => {
  const {cliusuario,clipassword,clinombre,clicorreo,clifondos,clifechanac} = req.body;
  if(cliusuario == '' || clipassword == '' || clinombre == '' || clicorreo == '' || clifondos == '' || clifechanac == ''){
    res.status(400).json({
      msg:'Hay algun campo vacio'
    })
    return;
  }
  else{
    const query = {
      text:'UPDATE clientes SET cliusuario = $1, clipassword = $2, clinombre = $3, clifondos = $5, clifechanac = $6  WHERE clicorreo = $4',
      values:[cliusuario,clipassword,clinombre,clicorreo,clifondos,clifechanac]
    }
    try {
      await pg.query(query)
      res.status(200).json({
        msg:'Usuario modificado satisfactoriamente'
      })
    } catch (err) {
      res.status(400).json({
        msg:err
      })
    }
  }
})

//eliminar usuario
router.delete('/:id',async(req,res) => {
  const id = req.params.id;
  const query = {
    text:'DELETE FROM clientes WHERE cliusuario = $1',
    values:[id]
  }
  try {
    await pg.query(query);
    res.status(200).json({
      msg:'Usuario eliminado satisfactoriamente'
    });
  } catch (error) {
    res.status(400).json({
      msg:'No se pudo eliminar el usuario'
    });
    console.log(error);

  }
})


module.exports = router;
