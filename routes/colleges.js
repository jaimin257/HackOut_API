const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const College = require('../models/college');
const Course = require('../models/course');
const globals = require('../configuration/globals');
const AccountController = require('../controllers/account');
const httpStatusCodes = require('http-status-codes');
const errorMessages = require('../configuration/error');

// frontend routes
router.get('/all', (req, res) => {
    College.find()
    .then(colleges => {
      res.render('colleges/all', {
        colleges: colleges
      });
    }); 
  });

  router.get('/all/:email', (req, res) => {
    if(globals.user == "none")
  {
    res.status(httpStatusCodes.FORBIDDEN)
      .send(errorMessages.pleaseLogInFirst); 
  }
    globals.college_email = req.params.email;
    console.log(req.params.email);
    Course.find({collegeEmail : req.params.email})
    .then(courses => {
      console.log(courses);
      res.render('colleges/view_course', {
        courses: courses
      });
    }); 
  });

  router.post('/new_course', (req, res) => {
  if(globals.user == "none" || globals.college_email == "none" || globals.user != globals.college_email)
  {
    console.log("tp");
    res.status(httpStatusCodes.FORBIDDEN)
      .send(errorMessages.notAuthorized); 
  }
    const {courseName, description, ratings, courseMaterial} = req.body;
    const temp = College.find({collegeEmail : globals.college_email})
      .then(() => {
        const newCourse = new Course({
          courseName,
          description, 
          ratings, 
          courseMaterial,
          collegeEmail: globals.user
        }) 
        newCourse.save()
          .then(course => {
              console.log('course Registered');
              let link = "all/"+ course.collegeEmail;
    
              res.redirect(link );
          })
      });
    
  });
module.exports = router;