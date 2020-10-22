// AUTOMATED TESTING FOR AUTHORISATION ROUTES
const request = require('supertest');
const app = require('../index.js');

// @ISSUE 401 Unauthorised
describe('Admin login', function() {
  it('Should allow Admin to login with appropriate credentials', function() {
    request(app)
    .post('/auth/login')
    .send({ username: "Paige_admin", password: "abcd1234", type: "admin"})
    .expect(200)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Registered user login', function() {
    it('Should allow registered user to login with appropriate credentials', function() {
      request(app)
      .post('/auth/login')
      .send({ username: "skylowalker", password: "abcd1234", type: "user" })
      .expect(200)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) throw err;
      });
    });
  });