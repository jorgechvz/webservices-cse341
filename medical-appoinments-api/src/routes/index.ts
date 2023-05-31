import express, { Express, Request, Response } from 'express';
import { oauthRouter } from './oauthRoutes';
import { routerMain } from './mainRoute';

const router = express.Router();

router.use('/', oauthRouter);
router.use('/api', routerMain);

export { router };
