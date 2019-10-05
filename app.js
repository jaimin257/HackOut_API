const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());



// DB Config
const db = require('./configuration/keys').DB_URI;

// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection establlished'))
    .catch(err => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const PORT = process.nextTick.PORT || 1433;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, console.log(`Server started on port ${PORT}`));



// FrontEnd...  ###########################################
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ 
    defaultLayout:'main' 
  })); 
  app.set('view engine', 'handlebars')

//Routes
app.use('/account',require('./routes/account'));
app.use('/events',require('./routes/events'));
