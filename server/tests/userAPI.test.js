// AUTOMATED TESTING FOR USER ROUTES
const request = require('supertest');
const app = require('../index.js');

describe('Get all registered users', function() {
  it('Should return all registered users from database', function() {
    request(app)
    .get('/users/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Create a registered user', function() {
  it('Should create a user to database', function() {
    request(app)
    .post('/users/create')
    .send({ firstName: "Mocha", lastName: "Test", username: "mochaTest", password: "mochaTest", address: "DELETE LATER", email: "mochatest@gmail.com"})
    .expect(200)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Get specific registered user account', function() {
  it('Should get the corresponding user account', function() {
    request(app)
    .get('/users/5f3a0c9141edb8a12b521644') // depends what you want to get
    .expect(200)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Delete registered user account', function() {
  it('Should delete the corresponding user account', function() {
    request(app)
    .delete('/users/5f6492c14d250e17cdc6cc03') // depends what you want to delete
    .expect(200)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Update registered user account', function() {
  it('Should update the corresponding user account', function() {
    request(app)
    .put("/users/5f6492884d250e17cdc6cc02") // depends what you want to update
    .send({ firstName: "Michelle" }) // depends what you want to update
    .expect(200)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});