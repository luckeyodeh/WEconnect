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
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @param {object} next The response body.
     * @returns {object} res.
     */
    value: function sorter(req, res, next) {
      var _req$query = req.query,
          location = _req$query.location,
          category = _req$query.category;

      var hold = [];
      if (location) {
        Business.forEach(function (business) {
          if (business.location.toLowerCase() === location.toLowerCase()) {
            hold.push(business);
          }
        });
        if (hold.length === 0) {
          return res.status(404).json({
            message: 'There is no business in that location yet',
            error: true
          });
        }
        return res.status(200).json(hold);
      }
      if (category) {
        Business.forEach(function (business) {
          if (business.category.toLowerCase() === category.toLowerCase()) {
            hold.push(business);
          }
        });
        if (hold.length === 0) {
          return res.status(404).json({
            message: 'There is no business that category yet',
            error: true
          });
        }
        return res.status(200).json(hold);
      }
      next();
    }
  }]);

  return Middleware;
}();

exports.default = Middleware;