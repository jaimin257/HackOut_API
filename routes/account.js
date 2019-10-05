const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')

// const passport = require('passport');
// const passportConf = require('../passport');
const passport = require('passport');
const passportConf = require('../passport');

const AccountController = require('../controllers/account');

// frontend routes
router.get('/',(req,res) => {
    res.render('index/welcome');
});


router.get('/signUp',(req,res) => {
    res.render('index/register');
});

router.route('/signUp').post(
    AccountController.signUp);

router.get('/logIn',(req,res) => {
    res.render('index/login');
});

router.route('/logIn').post(
        AccountController.logIn
    );

router.route('/logOut')
    .get(
        AccountController.logOut
    );

// router.route('/profile')
//     .post(
//         passportConf.checkToken,
//         passportConf.jwtVerifier,
//         AccountController.myProfile
//     );

// router.route('/getUser')
//     .post(
//         AccountController.getUser,
//     );

// router.route('/updateProfile')
//     .post(
//         passportConf.checkToken,
//         passportConf.jwtVerifier,
//         AccountController.updateProfile
//     );


// // verification-forgetpassword-resetpassword routes...33
// router.route('/resendVerificationLink') 
//     .post(
//         passportConf.checkToken,
//         passportConf.jwtVerifier,
//         AccountController.resendVerificationLink
//     );

// router.route('/forgetPassword')
//     .post(
//         AccountController.forgetPassword
//     );

// router.route('/resetPassword')
//     .post(
//         AccountController.resetPassword 
//     );

// router.route('/verify/:email')
//     .get(
//         AccountController.verify
//     );

module.exports = router;