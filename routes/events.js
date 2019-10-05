const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/events');

router.get('/add_event', (req, res) => {
    console.log("onsdasd");
        res.render('events/add_event');
  });
router.post('/add', (req, res) => {
    // console.log(req);
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
          res.render('events/show_events', {
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

module.exports = router;