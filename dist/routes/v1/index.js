'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../../controllers');

var _middlewares = require('../../middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Controller
var router = _express2.default.Router();

// REDIRECT '/' to '/api/v1'

// import UserController from '../../controller/UserController';
// import BusinessController from '../../controller/BusinessController';
// import ReviewController from '../../controller/ReviewController';

// Middleware
router.get('/', function (req, res) {
  res.redirect('/api/v1');
});
// Redirect '/' to '/api-docs'
router.get('/api/v1', function (req, res) {
  res.redirect('/api-docs');
});
// POST register business
router.post('/api/v1/businesses', _controllers.BusinessController.register);
// PUT update business
router.put('/api/v1/businesses/:id', _controllers.BusinessController.update);
// DELETE delete business
router.delete('/api/v1/businesses/:id', _controllers.BusinessController.deleteById);
// GET get all businesses
router.get('/api/v1/businesses/', _middlewares2.default.sorter, _controllers.BusinessController.list);
// Get a Business
router.get('/api/v1/businesses/:id', _controllers.BusinessController.getById);
// GET get all reviews
router.get('/api/v1/businesses/:id/reviews', _controllers.ReviewController.listReview);
// POST add reviews
router.post('/api/v1/businesses/:id/reviews', _controllers.ReviewController.addReview);

exports.default = router;