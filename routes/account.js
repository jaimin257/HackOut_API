const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../passport');

// const AccountController = require('../controllers/account');

// frontend routes
router.get('/',(req,res) => {
    res.render('index/welcome');
});

// router.route('/signUp')
//     .post(
//         AccountController.signUp
//     );

// router.route('/logIn')
//     .post(
//         passport.authenticate('local', { session: false }),
//         AccountController.logIn
//     );

// router.route('/logOut')
//     .get(
//         passportConf.checkToken,
//         passportConf.jwtVerifier,
//         AccountController.logOut
//     );

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