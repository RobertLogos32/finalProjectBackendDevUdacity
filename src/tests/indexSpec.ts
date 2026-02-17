import app from '../index.js';
import supertest from 'supertest';

const request = supertest(app);
describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?filename=icelandwaterfall&width=300&height=200'
    );
    expect(response.status).toBe(200);
  });
});

describe('Test endpoint 404 responses', () => {
  it('gets the api endpoint 404', async () => {
    const response = await request.get(
      '/api/images?filename=aa&width=300&height=200'
    );
    expect(response.status).toBe(404);
  });
});

describe('Test endpoint 400 responses', () => {
  it('gets the api endpoint 400', async () => {
    const response = await request.get(
      '/api/images?filename=icelandwaterfall&width=abc&height=200'
    );
    expect(response.status).toBe(400);
  });
});
