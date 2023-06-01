import request from 'supertest';
import express, { Express } from 'express';
import { app } from '../../app';

describe('app', () => {
  it('should respond with "Welcome" on /main route', async () => {
    const response = await request(app).get('/main');
    expect(response.status).toBe(200);
    expect(response.text).toBe('{\"message\":\"Welcome\"}');
  });

  it('should respond with 404 on unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });
});
