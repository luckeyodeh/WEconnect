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
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function list(req, res) {
      User.findAll({}).then(function (users) {
        if (users.length === 0) {
          return res.status(400).send({
            error: true,
            message: 'No user found'
          });
        }
        res.status(200).send({
          error: false,
          users: users
        });
      }).catch(function () {
        res.status(500).json({
          error: true,
          message: 'Server Error'
        });
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
          password = _req$body.password,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName;


      if (!(0, _isEmail2.default)(email) || !password || !firstName || !lastName) {
        return res.status(400).json({
          message: 'Enter Valid Input',
          error: true
        });
      }

      User.findOne({ where: { email: email.trim().toLowerCase() } }).then(function (userExists) {
        if (userExists) {
          return res.status(400).json({
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
        var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 14 });
        return res.status(201).json({
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

      User.findOne({ where: { email: email.trim().toLowerCase() } }).then(function (user) {
        if (!user) {
          return res.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        var correctPassword = _bcrypt2.default.compareSync(password, user.password);
        if (!correctPassword) {
          return res.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        var token = _jsonwebtoken2.default.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 14 });

        return res.status(200).json({
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
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'logout',
    value: function logout(req, res) {
      res.setHeader('x-access-token', null);
      return res.status(200).send({
        error: false,
        message: 'User has been logged out',
        token: null
      });
    }

    /**
     * Get User
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      User.findOne({
        where: { id: req.params.id }
      }).then(function (user) {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'User not found'
          });
        }
        return res.status(200).json({
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
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'updateUser',
    value: function updateUser(req, res) {
      User.findById(req.params.id).then(function (user) {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'User not found'
          });
        }

        if (req.userId !== user.id) {
          return res.status(400).json({
            error: true,
            message: 'You do not have the permission to update this user'
          });
        }

        User.update({
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName
        }, {
          where: { id: req.params.id }
        }).then(function (updatedUser) {
          if (!updatedUser) {
            return res.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return res.status(200).json({
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