'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dummyUsers = require('../models-dum/dummyUsers');

var _dummyUsers2 = _interopRequireDefault(_dummyUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Business Controller.
 * @class BusinessController
 * */
var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'list',

    /**
     * List all users
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function list(req, res) {
      return res.status(200).json({
        businesses: _dummyUsers2.default.users,
        error: false
      });
    }
    /**
     * Signup
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'signUp',
    value: function signUp(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;


      if (!email || !password) {
        return res.status(400).json({
          message: 'Input Both Username and Password',
          error: true
        });
      }

      _dummyUsers2.default.users.forEach(function (user) {
        if (user.email === email) {
          return res.status(400).json({
            message: 'A user with that email already exists',
            error: true
          });
        }
      });

      _dummyUsers2.default.users.push(req.body);
      return res.status(201).json({
        message: 'User Created Successfully',
        error: false
      });
    }

    /**
     * Login
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'logIn',
    value: function logIn(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _dummyUsers2.default.users.forEach(function (user) {
        if (email === user.email && password === user.password) {
          return res.status(200).json({
            message: 'Logged in successfully',
            error: false
          });
        }
      });
      return res.status(400).json({
        message: 'Unable to Log in',
        error: true
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;