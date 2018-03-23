'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Business = _models2.default.Business;

/**
 * Middleware
 * @class Middleware
 * */

var Middleware = function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, null, [{
    key: 'sorter',

    /**
     * Register a new business
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @param {object} next The responseponse body.
     * @returns {object} response.
     */
    value: function sorter(request, response, next) {
      var _request$query = request.query,
          location = _request$query.location,
          category = _request$query.category;


      if (location) {
        Business.findAll({ where: { location: location } }).then(function (businesses) {
          if (businesses.length === 0) {
            return response.status(404).json({
              error: true,
              message: 'No business found in ' + location
            });
          }
          return response.status(200).json({
            error: false,
            businesses: businesses
          });
        });
      }

      if (category) {
        Business.findAll({ where: { category: category } }).then(function (businesses) {
          if (businesses.length === 0) {
            return response.status(404).json({
              error: true,
              message: 'No business found in ' + category
            });
          }
          return response.status(200).json({
            error: false,
            businesses: businesses
          });
        });
      }

      next();
    }

    /**
     * Checks if a user is logged in
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @param {object} next Passes control to next middleware
     * @returns {object} next
     */

  }]);

  return Middleware;
}();

exports.default = Middleware;