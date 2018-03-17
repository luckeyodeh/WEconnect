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
      var id = req.params.id;


      _dummyBusinesses2.default.business.forEach(function (business) {
        if (parseInt(id, 10) === business.id) {
          res.json({
            reviews: business.reviews,
            error: false
          });
        }
      });
      return res.status(404).json({
        message: 'Business reviews not found',
        error: true
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
      var id = req.params.id;
      var _req$body = req.body,
          reviewer = _req$body.reviewer,
          content = _req$body.content,
          stars = _req$body.stars;


      _dummyBusinesses2.default.business.forEach(function (business) {
        if (parseInt(id, 10) === business.id) {
          var reviewId = business.reviews.length + 1;
          var newReview = {
            reviewId: reviewId, reviewer: reviewer, content: content, stars: stars
          };

          business.reviews.push(newReview);
          return res.status(201).json({
            newReview: newReview,
            error: false
          });
        }
      });

      return res.status(404).json({
        message: 'Business Not Found',
        error: true
      });
    }
  }]);

  return ReviewController;
}();

exports.default = ReviewController;