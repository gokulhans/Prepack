var express = require('express');
var router = express.Router();
var db = require('../connection')
var ObjectId = require('mongodb').ObjectId
var fun = require('../functions')


// Home 

router.get('/', async function (req, res) {
    let id = req.session.user
    let user = await db.get().collection('users').findOne({ _id: ObjectId(id) })
    let shop = await db.get().collection('shops').find({}).toArray()
    let products = await db.get().collection('products').find().sort({ title: 1 }).toArray()
    // console.log(products);
    if (user) {
        res.render('shop', { products, user,shop });
    }
    res.render('shop', { products });
});


// shop authentications

router.get('/add-shop', async function (req, res) {
    res.render('addshop');
});

router.post('/add-shop', (req, res) => {
   let shop = req.body;
   db.get().collection('shops').insertOne(shopdata);
   res.redirect('/shop/')
})

router.get('/:shop', async function (req, res) {
    // findOne shop with id or name to display products
    res.render('shop',{shop});
});

router.get('/add-item', async function (req, res) {
    res.render('newproduct',{shop:true});
});

router.post('/add-item', (req, res) => {
   let prod = req.body;
   db.get().collection('shopsproducts').insertOne(shopdata);
   res.redirect('/shop/')
})



// Authentication Shppers

router.get('/signup', (req, res) => {
    if (req.session.signupstatusfalse) {
        res.render('signup', { err: true })
    } else
        res.render('signup')
})


router.post('/signup', (req, res) => {
    req.body.shop = true;
    fun.doSignup(req.body).then((response) => {
        if (response.signupstatus) {
            session = req.session;
            session.user = response.insertedId
            session.loggedfalse = false
            session.loggedIN = true
            res.redirect('/shop/')
        } else {
            req.session.signupstatusfalse = true
            res.redirect('/shop/signup/')
        }
    })
})

router.get('/login', function (req, res) {
    console.log(req.session);
    if (req.session.loggedIN) {
        res.redirect('/shop/')
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
            res.redirect('/shop/')
        } else {
            req.session.loggedfalse = true

            res.redirect('/shop/login');
        }
    })
})

router.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/');
});


module.exports = router;
