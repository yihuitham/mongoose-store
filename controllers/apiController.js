const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/seed', async (req, res) => {
  const newProducts = [
    {
      name: 'Beans',
      description:
        'A small pile of beans. Buy more beans for a big pile of beans.',
      img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
      price: 5,
      qty: 99,
    },
    {
      name: 'Bones',
      description: "It's just a bag of bones.",
      img: 'http://bluelips.com/prod_images_large/bones1.jpg',
      price: 25,
      qty: 0,
    },
    {
      name: 'Bins',
      description: 'A stack of colorful bins for your beans and bones.',
      img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
      price: 7000,
      qty: 1,
    },
  ];

  try {
    const seedItems = await Product.create(newProducts);
    res.send(seedItems);
  } catch (err) {
    res.send(err.message);
  }
});

router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.delete('/', async (req, res) => {
  const clearDB = await Product.deleteMany();
  res.send(clearDB);
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  await res.redirect(`/show/${id}`);
  //   res.send(product);
});

router.patch('/buy/:id', async (req, res) => {
  const { id } = req.params;
  const buy = await Product.findByIdAndUpdate(
    id,
    { $inc: { qty: -1 } },
    { new: true }
  );
  res.redirect(`/show/${id}`);
});

router.delete('/delete/:id', async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.redirect('/store');
});

router.post('/new', async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.redirect('/store');
});

module.exports = router;
