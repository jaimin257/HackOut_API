const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(cors());



// DB Config
const db = require('./configuration/keys').DB_URI;

// connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection establlished'))
    .catch(err => console.log(err));


const PORT = process.nextTick.PORT || 1433;

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({ 
    // helpers: { 
    // //   truncate: truncate, 
    // //   stripTags: stripTags, 
    // //   formatDate:formatDate, 
    // //   select:select, 
    // //   editIcon: editIcon 
    // }, 
    defaultLayout:'main' 
  })); 
  app.set('view engine', 'handlebars')

app.listen(PORT, console.log(`Server started on port ${PORT}`));

//Routes
app.use('/',require('./routes/account'));


