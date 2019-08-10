const express = require('express')
const router = express.Router()
const pg = require('../db/database.js').getPool();
const jwt = require('jsonwebtoken');
const clientesMO = require('../models/clientes');
//Consultar todos los clientes existentes(ESTE ES SOLO PARA PRUEBAS)

// CONSULTAR USUARIO
router.post('/profile', async (req, res) => {
  const {username} = req.body;

  const prof = await clientesMO.findAll({
    attributes: ['cliusuario', 'clinombre', 'clicorreo', 'clifondos', 'clifechanac'],
    where: {cliusuario: username},
    raw: true
  })
  // res.json({'profileInfo':prof.rows[0]});
  res.json({'profileInfo':prof[0]});
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

    try{
      // const user = await pg.query(query);
      const user = await clientesMO.findAll({
        attributes: ['cliusuario', 'clipassword'],
        where: {'cliusuario': cliusuario, 'clipassword': clipassword},
        raw: true
      })
      if(user.length == 0){
        res.json({
          msg:'El usuario '+cliusuario+' no esta registrado'
        })
        // return;
      }else if (clipassword == user[0].clipassword) {
        const userExistent = user[0].cliusuario;
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

  try {
    // await pg.query(query)
    await clientesMO.create({
      'cliusuario': cliusuario,
      'clipassword': clipassword,
      'clinombre': clinombre,
      'clicorreo': clicorreo,
      'clifondos': clifondos,
      'clifechanac': clifechanac
    })
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
router.post('/updateProfile',async(req,res) => {
  const {cliusuario,clinombre,clicorreo,clifechanac} = req.body;

  try {
    const client = await clientesMO.findAll({
      attributes: ['cliusuario','clinombre','clicorreo','clifechanac'],
      where: {'cliusuario': cliusuario}
    })

    if (client.length > 0) {
      await client[0].update({
        'cliusuario': cliusuario,
        'clinombre': clinombre,
        'clicorreo': clicorreo,
        'clifechanac': clifechanac
      })
    }
    res.status(200).json({
      msg:'Usuario modificado satisfactoriamente'
    })
  } catch (err) {
    res.status(400).json({
      msg:err
    })
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
