// AUTOMATED TESTING FOR SUBURB ROUTES
const request = require('supertest');
const app = require('../index.js');

describe('Get all suburbs', function() {
  it('Should return all suburbs from database', function() {
    request(app)
    .get('/suburb/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});
