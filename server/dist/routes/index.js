'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('../controller/user');

var _user2 = _interopRequireDefault(_user);

var _business = require('../controller/business');

var _business2 = _interopRequireDefault(_business);

var _review = require('../controller/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import DumReviewController from '../../controller/reviewController';

// import DumBusinessController from '../../controller/businessController';
var router = _express2.default.Router();

// REDIRECT '/' to '/api/v1'

// import DumUserController from '../../controller/userController';
router.get('/', function (req, res) {
  res.redirect('/api/v1');
});

// POST register business
router.post('/api/v1/businesses', _auth2.default, _business2.default.register);
// PUT update business
router.put('/api/v1/businesses/:id', _auth2.default, _business2.default.update);
// DELETE delete business
router.delete('/api/v1/businesses/:id', _auth2.default, _business2.default.deleteById);
// GET get all businesses
router.get('/api/v1/businesses/', _business2.default.list);
// Get a Business
router.get('/api/v1/businesses/:id', _business2.default.getById);
// Get all Users
router.get('/api/v1/users', _user2.default.list);
// Get one User
router.get('/api/v1/users/:id', _user2.default.getUser);
// Get one User
router.put('/api/v1/users/:id', _auth2.default, _user2.default.updateUser);
// POST register User
router.post('/api/v1/auth/signup', _user2.default.signUp);
// POST Login User
router.post('/api/v1/auth/login', _user2.default.logIn);
// POST Login User
router.get('/api/v1/auth/logout', _user2.default.logout);
// GET get all reviews
router.get('/api/v1/businesses/:id/reviews', _review2.default.listReview);
// POST add reviews
router.post('/api/v1/businesses/:id/reviews', _auth2.default, _review2.default.addReview);

exports.default = router;