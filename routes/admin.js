var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId

router.get('/', async function (req, res) {
  let products = await db.get().collection('products').find().toArray()
  let users = await db.get().collection('users').find().toArray()
  console.log(products,users);
  res.render('admin', { products, users });
});

router.get('/delete/:id', (req, res) => {
  id = req.params.id
  db.get().collection('blogs').deleteOne({ _id: ObjectId(id) })
  res.redirect('/admin')
})

router.get('/deleteuser/:id', (req, res) => {
  id = req.params.id
  db.get().collection('users').deleteOne({ _id: ObjectId(id) })
  res.redirect('/admin')
})


// Products
router.get('/add-product', async function (req, res) {
  // let id = req.session.user
  // let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  res.render('newproduct',{shop:false}); 
});

router.post('/add-product', async function (req, res) {
  let product = req.body
  console.log(product);
  db.get().collection('products').insertOne(product).then((response) => {
    console.log(response);
  })
 
  res.redirect('/admin/');
});

router.get('/edit-product/:id', async function (req, res) {
  let id = req.params.id
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  res.render('newproduct', {user }); 
});

router.post('/edit-product', async function (req, res) {
  let product = req.body
  console.log(product);
  db.get().collection('products').insertOne(product).then((response) => {
    console.log(response);
  })
 
  res.redirect('/');
});

router.get('/view-product/:id', async function (req, res) {
  let id = req.session.user
  let prodid = req.params.id
  let product = await db.get().collection('products').findOne({ _id: ObjectId(prodid) })
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  res.render('view-product', {user,product });
});


router.delete('/product/:id',async (req, res) => {
  let product = req.params.id
  db.get().collection('products').removeOne({_id:ObjectId(product)}).then((response) => {
    console.log(response);
  })
  res.redirect('/cart')
})


module.exports = router;

