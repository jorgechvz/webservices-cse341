import express, { Express, Request, Response } from 'express';
const routerTest = express.Router();

routerTest.get('/test', (req, res) => {
    res.send(req.userData?.nameUser);
})

export {routerTest};