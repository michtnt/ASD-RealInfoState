// AUTOMATED TESTING FOR ADMIN ROUTES
const request = require('supertest');
const app = require('../index.js');

describe('Get all registered users from Admin page', function() {
  it('Should return all registered users from database', function() {
    request(app)
    .get('/admin/users/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});


describe('Get specific registered user account from Admin page', function() {
  it('Should get the corresponding user account', function() {
    request(app)
    .get('/admin/users/5f3a0c9141edb8a12b521644') // depends what you want to get
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});

describe('Update registered user account from Admin page', function() {
  it('Should update the corresponding user account', function() {
    request(app)
    .put("/admin/users/5f6492884d250e17cdc6cc02") // depends what you want to update
    .send({ firstName: "James" }) // depends what you want to update
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
      .delete('/admin/users/5f6492c14d250e17cdc6cc03')  // depends what you want to delete
      .expect(204)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) throw err;
      });
    });
  });

describe('Get all logs', function() {
  it('Should return all logs from database', function() {
    request(app)
    .get('/admin/logs/')
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
    });
  });
});
  