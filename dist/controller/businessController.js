'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dummyBusinesses = require('../models-dum/dummyBusinesses');

var _dummyBusinesses2 = _interopRequireDefault(_dummyBusinesses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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


      if (!req.body.name) {
        return res.status(400).json({
          message: 'Business Name Missing',
          error: true
        });
      }

      var id = _dummyBusinesses2.default.business.length + 1;
      var newBusiness = {
        id: id, name: name, details: details, category: category, location: location
      };
      _dummyBusinesses2.default.business.push(newBusiness);
      return res.status(201).json({
        message: 'New Business Added',
        error: false,
        business: newBusiness
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
      var id = req.params.id;

      var editBusiness = void 0;
      _dummyBusinesses2.default.business.forEach(function (bus) {
        if (bus.id === parseInt(id, 10)) {
          bus.name = req.body.name || bus.name;
          bus.details = req.body.details || bus.details;
          bus.location = req.body.location || bus.location;
          bus.category = req.body.category || bus.category;

          editBusiness = bus;
        }
      });
      if (editBusiness) {
        return res.status(200).json({
          message: 'Business Updated',
          error: false,
          business: editBusiness
        });
      }
      return res.status(404).json({
        message: 'Business Not Found',
        error: true
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
      var id = req.params.id;


      _dummyBusinesses2.default.business.forEach(function (bus, i) {
        if (bus.id === parseInt(id, 10)) {
          _dummyBusinesses2.default.business.splice(i, 1);
          return res.status(200).json({
            message: 'Business Deleted',
            error: false
          });
        }
      });
      return res.status(404).json({
        message: 'Business Not Found',
        error: true
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
      return res.status(200).json({
        businesses: _dummyBusinesses2.default.business,
        error: false
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
      var id = req.params.id;


      _dummyBusinesses2.default.business.forEach(function (bus) {
        if (parseInt(id, 10) === bus.id) {
          return res.status(200).json({
            message: 'Success',
            error: false,
            business: bus
          });
        }
      });
      return res.status(404).json({
        message: 'Business Not Found',
        error: true
      });
    }
  }]);

  return BusinessController;
}();

exports.default = BusinessController;