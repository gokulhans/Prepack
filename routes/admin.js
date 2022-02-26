var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId

router.get('/', async function (req, res) {
  let blogs = await db.get().collection('blogs').find().toArray()
  let users = await db.get().collection('users').find().toArray()
  res.render('admin', { blogs, users });
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

module.exports = router;

