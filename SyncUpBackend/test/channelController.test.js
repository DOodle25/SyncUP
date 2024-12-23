const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Channel = require('../models/Channel');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const userToken = jwt.sign({ userId: '123' }, 'Dipen123');

beforeAll(async () => {
  mongoose.connect = jest.fn();
});

describe('Channel Routes', () => {
  test('GET /api/channels - Get User Channels', async () => {
    const res = await request(app)
      .get('/api/channels')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/channels - Create a New Channel', async () => {
    const res = await request(app)
      .post('/api/channels')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'New Channel' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New Channel');
  });

  test('POST /api/channels/:channelId/messages - Post a Message to Channel', async () => {
    const res = await request(app)
      .post('/api/channels/123/messages')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ message: 'Hello World' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Hello World');
  });
});
