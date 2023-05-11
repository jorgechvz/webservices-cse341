const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./src/config/db.config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./src/models/users')

const port = process.env.PORT || 8080;
const app = express();

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./src/routes'))
  .use((req, res) => {
    res.status(400).send('Sorry cant find that');
  })
  .use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

passport.use(new GoogleStrategy({
  clientID: "",
  clientSecret: "",
  callbackURL: "",
  userProfileURL: ""
}))


mongodb.initDB((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connect to database and server is running in ${port} port!`);
  }
});
