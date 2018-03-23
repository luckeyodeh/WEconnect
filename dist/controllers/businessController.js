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
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */
    value: function register(request, response) {
      var _request$body = request.body,
          name = _request$body.name,
          details = _request$body.details,
          location = _request$body.location,
          category = _request$body.category;
      var userId = request.userId;


      if (!name || !details || !location || !category) {
        return response.status(403).json({
          error: true,
          message: 'Some fields missing'
        });
      }

      // Check if business name already exists
      Business.find({ where: { name: name } }).then(function (business) {
        if (business.name === name) {
          return response.status(403).json({
            error: true,
            message: 'Business name already exists'
          });
        }
      });

      // Create the business
      Business.create({
        name: name, details: details, location: location, category: category, userId: userId
      }).then(function (business) {
        return response.status(201).json({
          error: false,
          business: business
        });
      }).catch(function () {
        return response.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    }

    /**
     * Update a business
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'update',
    value: function update(request, response) {
      var _request$body2 = request.body,
          name = _request$body2.name,
          details = _request$body2.details,
          location = _request$body2.location,
          category = _request$body2.category;

      Business.findById(request.params.id).then(function (business) {
        if (!business) {
          return response.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }

        if (request.userId !== business.userId) {
          return response.status(401).json({
            error: true,
            message: 'You do not have the permission to update this business'
          });
        }

        // Check if business name already exists
        Business.find({ where: { name: name } }).then(function (findBusiness) {
          if (findBusiness.name === name) {
            return response.status(403).json({
              error: true,
              message: 'Business name already exists'
            });
          }
        });

        // Update the business
        Business.update({
          name: name || business.name,
          details: details || business.details,
          location: location || business.location,
          category: category || business.category
        }, {
          where: { id: request.params.id }
        }).then(function (updateBusiness) {
          if (!updateBusiness) {
            return response.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return response.status(200).json({
            error: false,
            message: 'Business updated'
          });
        });
      }).catch(function () {
        response.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    }

    /**
     * Delete a business
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'deleteById',
    value: function deleteById(request, response) {
      Business.findById(request.params.id).then(function (business) {
        if (!business) {
          return response.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        if (request.userId !== business.userId) {
          return response.status(401).json({
            error: true,
            message: 'You do not have the permission to delete this business'
          });
        }
        Business.destroy({
          where: { id: request.params.id }
        }).then(function (deleteStatus) {
          if (!deleteStatus) {
            response.status(500).json({
              error: true,
              message: 'Unable to delete Business'
            });
          }
          return response.status(200).json({
            error: false,
            message: 'Business Deleted'
          });
        });
      });
    }

    /**
     * List all businesses
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'list',
    value: function list(request, response) {
      Business.findAll({}).then(function (businesses) {
        if (businesses.length === 0) {
          return response.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        return response.status(200).json({
          error: false,
          businesses: businesses
        });
      }).catch(function (e) {
        return response.status(500).json({
          error: true,
          message: e
        });
      });
    }
    /**
     * Get a business
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'getById',
    value: function getById(request, response) {
      Business.findById(request.params.id).then(function (business) {
        if (!business) {
          return response.status(404).json({
            error: true,
            message: 'No business found'
          });
        }
        return response.status(200).json({
          error: false,
          business: business
        });
      }).catch(function () {
        return response.status(500).json({
          error: true,
          message: 'Server error'
        });
      });
    }
  }]);

  return BusinessController;
}();

exports.default = BusinessController;