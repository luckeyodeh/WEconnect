'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTIxMTk0MTE0LCJleHAiOjE1MjI0MDM3MTR9.OeN-Tut9xAg8wYUvC-RPLbTqIcGXH5zZamP_o5wTZrc';

var Business = {
  name: 'Moremi Gloals ' + Math.random() * 100,
  details: 'Best Ict Resources',
  location: 'lagos',
  category: 'ICT'
};

var User = {
  email: 'user-test@gmail.com',
  password: 'passw0RD',
  firstName: 'Timi',
  lastName: 'Yemi'
};

// Redirect to API v1
describe('GET /', function () {
  it('should get home', function () {
    _chai2.default.request(_server2.default).get('/').end(function (err, res) {
      expect(res).to.have.status(200);
    });
  });
});

// GET /api/v1
describe('GET /api/v1', function () {
  it('should get home', function () {
    _chai2.default.request(_server2.default).get('/api/v1').end(function (err, res) {
      expect(res).to.have.status(200);
    });
  });
});

//  Add a business
describe('POST businesses/', function () {
  it('should be able to register a business', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/businesses').set('x-access-token', token).send(Business).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should return 400 if no business name', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/businesses').send({
      details: 'Best Ict Resources',
      location: 'lagos',
      category: 'ICT'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should return 400 if name is undefined', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/businesses').send({
      name: undefined,
      details: 'Best Ict Resources',
      location: 'lagos',
      category: 'ICT'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should return 400 if name is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/businesses').send({
      name: '',
      details: 'Best Ict Resources',
      location: 'lagos',
      category: 'ICT'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});

//  Update a business
describe('PUT businesses/1', function () {
  it('should be able to update a business', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/businesses/1').set('x-access-token', token).send({
      name: 'Rotimi Texh',
      details: 'Software company',
      location: 'lagos',
      category: 'ICT'
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should return 404, if business cannot be found', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/businesses/193992932').set('x-access-token', token).send({
      name: 'Rotimi Texh',
      details: 'Software company',
      location: 'lagos',
      category: 'ICT'
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});

//  Get all businesses
describe('GET businesses/', function () {
  it('should get all businesses', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/businesses').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
  // Get Individual Business
  describe('GET busineesses/1', function () {
    it('should be able to get a business', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/businesses/1').end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });
});

// Get Business Reviews
describe('Get businesses/1/reviews', function () {
  it('should be able to get reviews of a business', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/businesses/1/reviews').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should return 404', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/businesses/3627827/reviews').end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

// Add A Review
describe('POST reviews/1', function () {
  it('should be able to add reviews to a business', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/businesses/1/reviews').set('x-access-token', token).send({
      businessId: 1,
      userId: 1,
      content: 'Lorem ipsum dolor sit amet.',
      star: 4
    }).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should return 404', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/businesses/3627827/reviews').end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

// Delete Business
describe('DELETE businesses/2', function () {
  it('should be able to delete a business', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/businesses/1').set('x-access-token', token).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should return 404 if page cannot be found', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/businesses/6382392').set('x-access-token', token).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

//  Get all Users
describe('GET users/', function () {
  it('should get all users', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});

//  POST - Sign up
describe('POST auth/signup/', function () {
  //  POST - Should create a new User
  it('should create new user', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send(User).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body).to.be.a('object');
      expect(res.body.error).to.equal(false);
      done();
    });
  });

  // POST Sign up- should return 400 if no email
  it('should return 400 if no eamil', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send({
      email: '',
      password: 'timi',
      lastName: 'mimi',
      firstName: 'Riri'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.error).to.equal(true);
      done();
    });
  });

  // POST Sign up - should return 400 if no password
  it('should return 400 if no password', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send({
      email: 'timi@gmail.com',
      password: '',
      lastName: 'mimi',
      firstName: 'Riri'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.error).to.equal(true);
      done();
    });
  });
  // POST Sign up - should return 400
  it('should return 400 if user already exists', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').send({
      email: 'admin@admin.com',
      password: 'password',
      lastName: 'mimi',
      firstName: 'Riri'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.error).to.equal(true);
      done();
    });
  });
});

//  Post Log In- Should return 400
describe('(Bad Requests) POST auth/login/', function () {
  it('should return 400 if no password', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
      email: 'rotimi@gm.com',
      password: ''
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should return 400 if no email', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
      email: '',
      password: 'passw0RD'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should return 400 if username or password is wrong', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
      email: 'user1@gmail.com',
      password: 'passw0RD1'
    }).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});

//  Post Log in - Should Login Successfully
describe('POST auth/login/', function () {
  it('should authenticate successfully', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
      email: User.email,
      password: User.password
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });
});

describe('Get logout/', function () {
  it('should logout a user', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/auth/logout').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Get users/1/', function () {
  it('should get a user', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/1').end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should return 404', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/10090886').end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('Update users/1/', function () {
  it('should update a user', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/users/1').send({
      firstName: 'Marsa',
      lastName: 'Hanna'
    }).set('x-access-token', token).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});