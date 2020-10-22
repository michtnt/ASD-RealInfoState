// AUTOMATED TESTING FOR PROPERTY ROUTES
const request = require('supertest');
const app = require('../index.js');

describe('Get all properties', function() {
  it('Should return all properties from database', function() {
    request(app)
    .get('/property/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});
