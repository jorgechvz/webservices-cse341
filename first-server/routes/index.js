const routes =require('express').Router();

routes.get('/',(req, res, next) => {
    res.send("Jorge A. Chavez")
})

module.exports = routes;