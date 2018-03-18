'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
   * Checks if a user is logged in
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @param {object} next Passes control to next middleware
   * @returns {object} next
   */
var auth = function auth(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  _jsonwebtoken2.default.verify(token, process.env.SALT, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        error: true,
        message: 'User not logged in'
      });
    }
    req.userId = decoded.id;
    return next();
  });
};

exports.default = auth;