const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 8080;
const connect = require('./db/connect');
const passport = require('passport');
const session = require('express-session');

dotenv.config({ path: '/.env'})

require('./config/passport')(passport)

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized : false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'));

connect.initDatabase();
app.listen(port, () => {
  console.log(`Connected to the DATABASE, Running on port ${port}`);
});
