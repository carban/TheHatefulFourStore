const express = require('express');
const app = express();
const user = require('./user.js');
const category = require('./category.js');
const subcategory = require('./subcategory.js');
const game = require('./product.js');
const sales = require('./sales.js');

app.use('/user',user);
app.use('/category',category);
app.use('/subcategory',subcategory);
app.use('/game',game);
app.use('/sales',sales);

module.exports = app;
