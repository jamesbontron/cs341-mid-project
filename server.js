const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const connect = require('./db/connect');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

connect.initDatabase();
app.listen(port, () => {
  console.log(`Connected to the DATABASE, Running on port ${port}`);
});
