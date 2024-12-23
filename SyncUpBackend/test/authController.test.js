const request = require('supertest');
const app = require('../server'); // Path to your express app
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  // Mock Mongoose connection
  mongoose.connect = jest.fn();
});

// Mock functions for the User model
jest.mock('../models/User');

describe('Auth Routes', () => {
  test('POST /api/auth/register-otp - Send Register OTP', async () => {
    // Mock implementation for sending OTP
    const mockSendOtp = jest.fn().mockReturnValue(Promise.resolve());
    
    // Assuming you have a fun
    ?]]

    const res = await request(app)
      .post('/api/auth/register-otp')
      .send({ email: 'testuser@example.com' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OTP sent successfully');
  }, 50000); // Increase timeout

  test('POST /api/auth/register - Register User', async () => {
    // Mock implementation for user registration
    User.create = jest.fn().mockReturnValue(Promise.resolve({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword' // Mock hashed password if using bcrypt
    }));

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John Doe', email: 'johndoe@example.com', password: 'Password123', otp: '123456' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Registration successful');
  });

  test('POST /api/auth/signin - Sign in User', async () => {
    // Mock implementation for sign in
    User.findOne = jest.fn().mockReturnValue(Promise.resolve({
      email: 'johndoe@example.com',
      password: 'hashedPassword' // Mock hashed password for comparison
    }));

    const res = await request(app)
      .post('/api/auth/signin')
      .send({ email: 'johndoe@example.com', password: 'Password123' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
