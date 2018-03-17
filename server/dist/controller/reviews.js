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
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function listReview(req, res) {
      Business.findById(req.params.id).then(function (business) {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        Review.findAll().then(function (reviews) {
          if (reviews.length === 0) {
            return res.status(404).json({
              error: true,
              message: 'No review found'
            });
          }
          return res.status(200).json({
            error: false,
            reviews: reviews
          });
        }).catch(function () {
          return res.status(500).json({
            error: true,
            message: 'Server Error'
          });
        });
      });
    }

    /**
     * Add a new Review
     *
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      var _req$body = req.body,
          content = _req$body.content,
          star = _req$body.star;

      var userId = 2;
      var businessId = req.params.id;
      Business.findById(businessId).then(function (business) {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        Review.create({
          content: content, star: star, userId: userId, businessId: businessId
        }).then(function (review) {
          return res.status(201).json({
            error: false,
            review: review
          });
        }).catch(function () {
          res.status(500).json({
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