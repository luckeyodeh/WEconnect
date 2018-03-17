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
 * Business Controller.
 * @class BusinessController
 * */

var BusinessController = function () {
  function BusinessController() {
    _classCallCheck(this, BusinessController);
  }

  _createClass(BusinessController, null, [{
    key: 'register',

    /**
     * Register a new business
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function register(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          details = _req$body.details,
          location = _req$body.location,
          category = _req$body.category;
      var userId = req.userId;


      if (!name || !details || !location || !category) {
        return res.status(400).json({
          error: true,
          message: 'some fields missing,'
        });
      }

      Business.create({
        name: name, details: details, location: location, category: category, userId: userId
      }).then(function (business) {
        return res.status(201).json({
          error: false,
          business: business
        });
      }).catch(function (e) {
        return res.status(500).json({
          error: true,
          message: e
        });
      });
    }

    /**
     * Update a business
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'update',
    value: function update(req, res) {
      var _req$body2 = req.body,
          name = _req$body2.name,
          details = _req$body2.details,
          location = _req$body2.location,
          category = _req$body2.category;

      Business.findById(req.params.id).then(function (business) {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        if (req.userId !== business.userId) {
          return res.status(400).json({
            error: true,
            message: 'You do not have the permission to update this business'
          });
        }
        Business.update({
          name: name || business.name,
          details: details || business.details,
          location: location || business.location,
          category: category || business.category
        }, {
          where: { id: req.params.id }
        }).then(function (updatedBusiness) {
          if (!updatedBusiness) {
            return res.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return res.status(200).json({
            error: false,
            message: 'Business updated',
            data: updatedBusiness
          });
        });
      }).catch(function () {
        res.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    }

    /**
     * Delete a business
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'deleteById',
    value: function deleteById(req, res) {
      Business.findById(req.params.id).then(function (business) {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        if (req.userId !== business.userId) {
          return res.status(400).json({
            error: true,
            message: 'You do not have the permission to delete this business'
          });
        }
        Business.destroy({
          where: { id: req.params.id }
        }).then(function (deleteStatus) {
          if (!deleteStatus) {
            res.status(500).json({
              error: true,
              message: 'Unable to delete Business'
            });
          }
          return res.status(200).json({
            error: false,
            message: 'Business Deleted'
          });
        });
      });
    }

    /**
     * List all businesses
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'list',
    value: function list(req, res) {
      var _req$query = req.query,
          location = _req$query.location,
          category = _req$query.category;


      if (location) {
        Business.findAll({ where: { location: location } }).then(function (businesses) {
          if (businesses.length === 0) {
            return res.status(404).json({
              error: true,
              message: 'No business found in ' + location
            });
          }
          return res.status(200).json({
            error: false,
            businesses: businesses
          });
        });
      }

      if (category) {
        Business.findAll({ where: { category: category } }).then(function (businesses) {
          if (businesses.length === 0) {
            return res.status(404).json({
              error: true,
              message: 'No business found in ' + category
            });
          }
          return res.status(200).json({
            error: false,
            businesses: businesses
          });
        });
      }

      Business.findAll({}).then(function (businesses) {
        if (businesses.length === 0) {
          return res.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        return res.status(200).json({
          error: false,
          businesses: businesses
        });
      }).catch(function (e) {
        return res.status(500).json({
          error: true,
          message: e
        });
      });
    }
    /**
     * Get a business
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'getById',
    value: function getById(req, res) {
      Business.findById(req.params.id).then(function (business) {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        return res.status(200).json({
          error: false,
          business: business
        });
      }).catch(function () {
        return res.status(500).json({
          error: true,
          message: 'Server error'
        });
      });
    }
  }]);

  return BusinessController;
}();

exports.default = BusinessController;