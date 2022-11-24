import { readdir, unlink } from 'fs/promises';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Endpoint Check', () => {
  describe('Check if endpoints work as expected', () => {
    it('Main endpoint responds to (get requests) ', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });

    it('Resize endpoint responds to (get requests)', async () => {
      const response = await request.get('/resize');
      expect(response.status).toBe(200);
    });
    it('Resize endpoint should respond with status code 200 when the correct query parameters are provided', async () => {
      const images = await readdir('./public/images/');
      const response = await request.get(
        `/resize?imageName=${images[0]}&width=400&height=300`
      );
      expect(response.status).toBe(200);
    });
  });

  describe('Check if errors are handled correctly in case of invalid input', () => {
    it('Should throw an error 404 when Page is not found', async () => {
      const response = await request.get(`/wrongEndpoint`);
      expect(response.statusCode).toBe(404);
    });
    it('Should throw an error 500 when unknown image name is inserted', async () => {
      const response = await request.get('/resize?imageName="ksjdf"');
      expect(response.statusCode).toBe(500);
    });
    it('Should throw an error 500 when dimensions === 0', async () => {
      const images = await readdir('./public/images/');
      const response = await request.get(
        `/resize?imageName=${images[0]}&width=0&height=0`
      );
      expect(response.statusCode).toBe(500);
    });
    it('Should throw an error 500 when dimensions < 0', async () => {
      const images = await readdir('./public/images/');
      const response = await request.get(
        `/resize?imageName=${images[0]}&width=-3&height=4`
      );
      expect(response.statusCode).toBe(500);
    });
  });

  afterAll(async () => {
    const images = await readdir('./public/thumb');

    for (const image of images) {
      await unlink(`./public/thumb/${image}`);
    }
  });
});
