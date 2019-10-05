const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
require('./passport');

const app = express();
app.use(cors());
app.use(methodOverride('_method'));



// DB Config
const db = require('./configuration/keys').DB_URI;
mongoose.Promise = global.Promise;
// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection establlished'))
    .catch(err => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ 
  defaultLayout:'main',
  helpers : {
    formatTemp: function(temp) {
        console.log(temp);
        if (temp=="none") {
            return temp;
        } else {
            return temp;
        }
    }
  }
})); 
app.set('view engine', 'handlebars')

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.userFound || null;
  next();
});

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

const PORT = process.nextTick.PORT || 1433;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, console.log(`Server started on port ${PORT}`));



// FrontEnd...  ###########################################

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/account',require('./routes/account'));
app.use('/events',require('./routes/events'));
app.use('/colleges',require('./routes/colleges'));
