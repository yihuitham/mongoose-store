const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { route } = require('./apiController');

//index page
router.get('/store', async (req, res) => {
  const products = await Product.find();
  res.render('index.ejs', { products: products });
});

//show page
router.get('/show/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('show.ejs', { product: product });
});

//edit page
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('edit.ejs', { product: product });
});

//new page
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

module.exports = router;
