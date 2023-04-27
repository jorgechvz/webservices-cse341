const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./src/database/connect');
const contactsRoutes = require('./src/routes/contacts');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', contactsRoutes)
  .use((req, res) => {
    res.status(400).send('Sorry cant find that');
  })
  .use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

mongodb.initDB((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connect to database and server is running in ${port} port!`);
  }
});
