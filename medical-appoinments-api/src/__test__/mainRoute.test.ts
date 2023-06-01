import request from 'supertest';
import express, { Express } from 'express';
import { routerMain } from '../routes/mainRoute';
import nock from 'nock';

describe('Main Router', () => {
  let app: Express;
  beforeEach(() => {
    app = express();
    app.use('/', routerMain);
  });
  test('should respond with "Hello: undefined" if userData is not set', async () => {
    const response = await request(app).get('/main');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello: undefined');
  });
});
