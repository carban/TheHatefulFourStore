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

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
router.get('/categories', async (req, res) => {
  const {username} = req.body;
  const myquery = {
    text: 'select * from categorias',
  }
  const prof = await pg.query(myquery);
  res.json({'cats':prof.rows});
});
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
router.get('/subcategories', async (req, res) => {
  const {username} = req.body;
  const myquery = {
    text: 'select subid, subnombre, catid from subcategorias order by catid;',
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
  res.json({'subcats':answ});
});
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
router.get('/games', async (req, res) => {
  const {username} = req.body;
  const myquery = {
    text: 'select * from catjuegos natural join juegos order by subid',
  }
  var colors = ['red', 'dark', 'accent', 'success', 'info', 'orange'];
  const prof = await pg.query(myquery);
  for (var i = 0; i < prof.rows.length; i++) {
    prof.rows[i].added = false;
    prof.rows[i].color = colors[Math.floor(Math.random() * ((colors.length - 1) - 0) + 0)];
  }
  res.json({'games':prof.rows});
});
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
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
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
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
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
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
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ



// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
router.post('/createcategory', async (req, res) => {
  const {catname} = req.body;
  var rand = Math.floor(Math.random() * (100 - 5)) + 5;
  const myquery = {
    text: "insert into categorias values ($1, $2, 'description')",
    values: [rand, catname]
  }
  const prof = await pg.query(myquery);
  res.json({'msg':'created'});
});
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
router.post('/createsubcategory', async (req, res) => {
  const {cate, sub} = req.body;
  var rand = Math.floor(Math.random() * (100 - 5)) + 5;
  const myquery = {
    text: "select catid from categorias where catnombre = $1",
    values: [cate]
  }
  const prof = await pg.query(myquery);
  var id = prof.rows[0].catid;
  const myquery2 = {
    text: "insert into subcategorias values ($1, $2, 'description', $3)",
    values: [rand, sub, id]
  }
  const prof2 = await pg.query(myquery2);
  res.json({'msg':'created'});
});
// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ


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
  /*
  if(cliusuario == ' ' || clipassword == ' ' || clinombre == ' ' || clicorreo == ' ' || clifondos == ' ' || clifechanac == ' '){
    console.log('Hay algun campo vacio' );
    res.status(400).json({
      msg:'Hay algun campo vacio'
    })
    // return;
  }
  else{

  }
  */
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
