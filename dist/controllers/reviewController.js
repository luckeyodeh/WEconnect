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
var Review = _models2.default.Review;
/**
 * Business Controller.
 * @class ReviewController
 * */

var ReviewController = function () {
  function ReviewController() {
    _classCallCheck(this, ReviewController);
  }

  _createClass(ReviewController, null, [{
    key: 'listReview',

    /**
     * Get all Reviews
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */
    value: function listReview(request, response) {
      Business.findById(request.params.id).then(function (business) {
        if (!business) {
          return response.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        Review.findAll().then(function (reviews) {
          if (reviews.length === 0) {
            return response.status(404).json({
              error: true,
              message: 'No review found'
            });
          }
          return response.status(200).json({
            error: false,
            reviews: reviews
          });
        }).catch(function () {
          return response.status(500).json({
            error: true,
            message: 'Server Error'
          });
        });
      });
    }

    /**
     * Add a new Review
     *
     * @param {object} request The requestuest body of the requestuest.
     * @param {object} response The responseponse body.
     * @returns {object} response.
     */

  }, {
    key: 'addReview',
    value: function addReview(request, response) {
      var _request$body = request.body,
          content = _request$body.content,
          star = _request$body.star;
      var userId = request.userId;

      var businessId = request.params.id;
      Business.findById(businessId).then(function (business) {
        if (!business) {
          return response.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        Review.create({
          content: content, star: star, userId: userId, businessId: businessId
        }).then(function (review) {
          return response.status(201).json({
            error: false,
            review: review
          });
        }).catch(function () {
          response.status(500).json({
            error: true,
            message: 'Server Error'
          });
        });
      });
    }
  }]);

  return ReviewController;
}();

exports.default = ReviewController;