const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const College = require('../models/college');
const Course = require('../models/course');

const AccountController = require('../controllers/account');

// frontend routes
  router.get('/all/:email', (req, res) => {
    console.log(req.params.email);
    Course.find({collegeEmail : req.params.email})
    .then(courses => {
      res.render('colleges/view_course', {
        courses: courses
      });
    }); 
  });
module.exports = router;