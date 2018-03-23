'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

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
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */
    value: function list(request, response) {
      User.findAll({}).then(function (users) {
        if (users.length === 0) {
          return response.status(400).send({
            error: true,
            message: 'No user found'
          });
        }
        response.status(200).send({
          error: false,
          users: users
        });
      }).catch(function () {
        response.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    }
    /**
     * Signup
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'signUp',
    value: function signUp(request, response) {
      var _request$body = request.body,
          email = _request$body.email,
          password = _request$body.password,
          firstName = _request$body.firstName,
          lastName = _request$body.lastName;


      if (!(0, _isEmail2.default)(email) || !password || !firstName || !lastName) {
        return response.status(400).json({
          message: 'Enter Valid Input',
          error: true
        });
      }

      User.findOne({ where: { email: email.trim().toLowerCase() } }).then(function (userExists) {
        if (userExists) {
          return response.status(400).json({
            error: true,
            message: 'Account exists for that email'
          });
        }
      });

      var hash = _bcrypt2.default.hashSync(password, 10);
      User.create({
        firstName: firstName,
        lastName: lastName,
        email: email.trim().toLowerCase(),
        password: hash
      }).then(function (user) {
        var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 5 });
        return response.status(201).json({
          error: false,
          message: 'User created and logged in',
          token: token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      });
    }

    /**
     * Login
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'logIn',
    value: function logIn(request, response) {
      var _request$body2 = request.body,
          email = _request$body2.email,
          password = _request$body2.password;

      User.findOne({ where: { email: email.trim().toLowerCase() } }).then(function (user) {
        if (!user) {
          return response.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        var correctPassword = _bcrypt2.default.compareSync(password, user.password);
        if (!correctPassword) {
          return response.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 5 });

        return response.status(200).json({
          error: false,
          message: 'Logged in Successfully',
          token: token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      });
    }

    /**
     * Log out
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'logout',
    value: function logout(request, response) {
      response.setHeader('x-access-token', null);
      return response.status(200).send({
        error: false,
        message: 'User has been logged out',
        token: null
      });
    }

    /**
     * Get User
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'getUser',
    value: function getUser(request, response) {
      User.findOne({
        where: { id: request.params.id }
      }).then(function (user) {
        if (!user) {
          return response.status(404).json({
            error: true,
            message: 'User not found'
          });
        }
        return response.status(200).json({
          error: false,
          message: 'User found',
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      });
    }
    /**
     * Update user details
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'updateUser',
    value: function updateUser(request, response) {
      User.findById(request.params.id).then(function (user) {
        if (!user) {
          return response.status(404).json({
            error: true,
            message: 'User not found'
          });
        }

        if (request.userId !== user.id) {
          return response.status(400).json({
            error: true,
            message: 'You do not have the permission to update this user'
          });
        }

        User.update({
          firstName: request.body.firstName || user.firstName,
          lastName: request.body.lastName || user.lastName
        }, {
          where: { id: request.params.id }
        }).then(function (updatedUser) {
          if (!updatedUser) {
            return response.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return response.status(200).json({
            error: false,
            message: 'User updated',
            data: updatedUser
          });
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;