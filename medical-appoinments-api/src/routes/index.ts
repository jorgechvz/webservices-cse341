import express, { Express, Request, Response } from 'express';
import oauthRoute from './oauthRoutes';
import mainRoute from './mainRoute';
const router = express.Router();

router.use('/', oauthRoute);
router.use('/',mainRoute);

export {router};
