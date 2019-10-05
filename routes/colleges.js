const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const College = require('../models/college')
const AccountController = require('../controllers/account');

// frontend routes
router.get('/all', (req, res) => {
    College.find()
    .then(colleges => {
      res.render('colleges/all', {
        colleges: colleges
      });
    }); 
  });

module.exports = router;