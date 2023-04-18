const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./src/database/connect');
const professionalRoutes = require('./src/routes/professional');

const port = process.env.PORT || 8080; 
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/professional', professionalRoutes)
    .use((req, res, next) => {
        res.status(404).send('Sorry cant find that!');
    })
    .use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    });
      
mongodb.initDB((err, mongodb) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connect Database and server running in ${port}`);
    }
});