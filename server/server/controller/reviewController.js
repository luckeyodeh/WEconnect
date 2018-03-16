import db from '../models-dum/dummyBusinesses';

/**
 * Business Controller.
 * @class ReviewController
 * */
export default class ReviewController {
  /**
   * Get all Reviews
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static listReview(req, res) {
    const { id } = req.params;

    db.business.forEach((business) => {
      if (parseInt(id, 10) === business.id) {
        res.json({
          reviews: business.reviews,
          error: false,
        });
      }
    });
    return res.status(404).json({
      message: 'Business reviews not found',
      error: true,
    });
  }

  /**
   * Add a new Review
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static addReview(req, res) {
    const { id } = req.params;
    const { reviewer, content, stars } = req.body;


    db.business.forEach((business) => {
      if (parseInt(id, 10) === business.id) {
        const reviewId = business.reviews.length + 1;
        const newReview = {
          reviewId, reviewer, content, stars
        };

        business.reviews.push(newReview);
        return res.status(201).json({
          newReview,
          error: false,
        });
      }
    });

    return res.status(404).json({
      message: 'Business Not Found',
      error: true
    });
  }
}
