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


const PORT = process.nextTick.PORT || 1433;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ 
    defaultLayout:'main' 
  })); 
  app.set('view engine', 'handlebars')

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Routes
app.use('/account',require('./routes/account'));
app.use('/events',require('./routes/events'));



