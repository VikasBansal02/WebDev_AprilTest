const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const user1 = require('../models/user');
const { route } = require('./product');

// router.get('/fakeuser',async (req,res)=>{
//     const user={
//         email:'rohit@gmail.com',
//         username:'Rohit'
//     }
//     const newUser=await user1.register(user,'rohit12');
//     res.send(newUser);
// });

router.get('/register', (req, res) => {
    res.render('auth/signup');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, email,role } = req.body;
        const user = new User({ username, email,role });
        const newUser = await user1.register(user, password);

        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Registered Successfully');
            return res.redirect('/products');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

    // res.send(newUser);

})

router.get('/login', (req, res) => {

    let redirectUrl = req.session.returnUrl;
    res.render('auth/login', { redirectUrl });
})

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true

    }), (req, res) => {
        req.flash('success', `Welcome Back ${req.user.username} Again`);
        let redirectUrl = req.body.redirectUrl || '/products';
        if (redirectUrl && redirectUrl.indexOf('review') !== -1) {
            redirectUrl = redirectUrl.split('/')
            redirectUrl.pop();
            redirectUrl = redirectUrl.join('/');
        }
        res.redirect(redirectUrl);
    });
router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success', 'GoodBye');
        res.redirect('/products');
    });

})
module.exports = router;