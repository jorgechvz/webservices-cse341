import express, { Express, Request, Response } from 'express';
import { oauthRouter } from './oauthRoutes';
import { routerTest } from './test';


const router = express.Router();

router.use('/', oauthRouter);
router.use('/use', routerTest);

export { router };
