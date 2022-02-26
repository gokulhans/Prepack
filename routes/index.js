var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId

// Home 
router.get('/', async function (req, res) {
  let id = req.session.user
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
  let blogs = await db.get().collection('blogs').find().sort({title:1}).toArray()
  let newblog = blogs[0]
  if (user) {
    res.render('index', { blogs, user,newblog });
  }
  res.render('index', { blogs,newblog });
});


// Products
router.get('/view-product', async function (req, res) {
  let id = req.session.user
  let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
 
  res.render('view-product', {user });
});

//Cart
router.get('/cart', (req, res) => {
  res.render('cart')
})

// User Authentication Code Place

router.get('/signup', (req, res) => {
  if (req.session.signupstatusfalse) {
    res.render('signup', { err: true })
  } else
    res.render('signup')
})


router.post('/signup', (req, res) => {
  fun.doSignup(req.body).then((response) => {
    if (response.signupstatus) {
      session = req.session;
      session.user = response.insertedId
      session.loggedfalse = false
      session.loggedIN = true
      res.redirect('/users/')
    } else {
      req.session.signupstatusfalse = true
      res.redirect('/users/signup/')
    }
  })
})

router.get('/login', function (req, res) {
  console.log(req.session);
  if (req.session.loggedIN) {
    res.redirect('/users/')
  }
  if (req.session.loggedfalse) {
    res.render('login', { err: true });
  } else {
    res.render('login');
  }
});

router.post('/login', (req, res) => {
  fun.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.user = String(response.user._id)
      req.session.loggedfalse = false
      req.session.loggedIN = true
      res.redirect('/users/')
    } else {
      req.session.loggedfalse = true

      res.redirect('/users/login');
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/');
});


// /* GET home page. */
// router.get('/adress', async function (req, res) {
//   let id = req.session.user
//   let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
 
//   res.render('adress', {user });
// });

// router.get('/done', async function (req, res) {
//   let id = req.session.user
//   let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
 
//   res.render('done', {user });
// });


// router.get('/buy', async function (req, res) {
//   let id = req.session.user
//   let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
 
//   res.render('buy', {user });
// });




// router.post('/upload', function (req, res) {
//   let data = req.body
//   console.log(data);
//   db.get().collection('images').insertOne(data).then((response) => {
//     let id = response.insertedId
//     let userid = req.body.userid
//     let image = req.files.image
//     image.mv('./public/images/' + userid + '.jpg', (err, done) => {
//       if (!err) {
//         res.redirect('/users/myprofile/')
//       } else {
//         console.log(err);
//       }
//     })
//   })
// });


// router.get('/section/:section', async function (req, res) {
//   var section = req.params.section
//   if (req.session.loggedIN) {
//     let id = req.session.user
//     let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
//     let blogs = await db.get().collection('blogs').find({ "section": section }).toArray()
//     let newblog = blogs[0]
//     res.render('index', { blogs, user,newblog });
//   } else {
//     let blogs = await db.get().collection('blogs').find({ "section": section }).toArray()
//     let newblog = blogs[0]
//     res.render('index', { blogs,newblog });
//   }

// });



module.exports = router;
