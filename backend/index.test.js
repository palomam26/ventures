const request = require('supertest');
const express = require('express');
const axios = require('axios');
const calculation = require('./calculation');
const app = require('./index');

jest.mock('axios');
jest.mock('./calculation');

describe('API Endpoints', () => {
    describe('GET /get-properties', () => {
      it('should return task data', async () => {
        const mockTaskData = { id: '1', operation: 'addition', left: 1, right: 2 };
        axios.get.mockResolvedValue({ data: mockTaskData });
  
        const response = await request(app).get('/get-properties');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockTaskData);
      });
  
      it('should return 500 if there is an error', async () => {
        axios.get.mockRejectedValue(new Error('Error when making GET request'));
  
        const response = await request(app).get('/get-properties');
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error getting task data' });
      });
    });
  
    describe('POST /post-calculations', () => {
      beforeEach(() => {
        app.locals.taskData = { id: '1', operation: 'addition', left: 1, right: 2 };
      });
  
      it('should return result of calculation', async () => {
        const mockResult = 3;
        calculation.mockReturnValue(mockResult);
        axios.post.mockResolvedValue({ data: 'Success' });
  
        const response = await request(app).post('/post-calculations');
  
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: '1', result: mockResult });
      });
  
      it('should return 400 if task data is not available', async () => {
        app.locals.taskData = null;
  
        const response = await request(app).post('/post-calculations');
  
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Task data has not been obtained yet' });
      });
  
      it('should return 500 if there is an error', async () => {
        calculation.mockImplementation(() => { throw new Error('Error in calculation'); });
  
        const response = await request(app).post('/post-calculations');
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Error processing the operation' });
      });
    });
  });