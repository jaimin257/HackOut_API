const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/events');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
    const errorMessages = require('../configuration/error');
const globals = require('../configuration/globals');
const httpStatusCodes = require('http-status-codes');
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

router.get('/add_event', (req, res) => {
    console.log("onsdasd");
        res.render('events/add_event');
  });
router.post('/add',
(req, res) => {
    // console.log(req);
if(globals.user == "none")
  {
    res.status(httpStatusCodes.FORBIDDEN)
      .send(errorMessages.pleaseLogInFirst); 
  }
    const newStory = {
      title: req.body.title,
      information: req.body.information,
      time: req.body.time,
      venue:req.body.venue,
      college_name: req.body.college_name
    }
    console.log(newStory);
    // Create Story
    new Event(newStory)
      .save()
      .then(story => {
        Event.find()
        .then(events => {
          res.render('events/show_events2', {
            events: events
          });
        }); 
     });
  });

router.get('/public', (req, res) => {
    Event.find()
    .then(events => {
      res.render('events/show_events', {
        events: events
      });
    }); 
  });

  router.get('/public2', (req, res) => {
    Event.find()
    .then(events => {
      res.render('events/show_events2', {
        events: events
      });
    }); 
  });

module.exports = router;