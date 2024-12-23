const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userToken = jwt.sign({ userId: '123' }, 'Dipen123');

beforeAll(async () => {
  mongoose.connect = jest.fn();
});

describe('Invitation Routes', () => {
  test('POST /api/channels/:channelId/invite - Send Invitation', async () => {
    const res = await request(app)
      .post('/api/channels/123/invite')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ invitedUserEmail: 'invitee@example.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Invitation sent successfully');
  });

  test('GET /api/channels/invitations - Get Pending Invitations', async () => {
    const res = await request(app)
      .get('/api/channels/invitations?email=invitee@example.com')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/channels/invitations/:invitationId/accept - Accept Invitation', async () => {
    const res = await request(app)
      .put('/api/channels/invitations/123/accept')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Invitation accepted successfully');
  });

  test('PUT /api/channels/invitations/:invitationId/decline - Decline Invitation', async () => {
    const res = await request(app)
      .put('/api/channels/invitations/123/decline')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Invitation declined successfully');
  });
});
