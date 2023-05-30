import express, { Express, Request, Response } from 'express';

const mainRoute = express.Router();

mainRoute.get('/main',(req: Request, res: Response, next) => {
    res.send('Welcome to my api');
    next();
})

export default mainRoute;