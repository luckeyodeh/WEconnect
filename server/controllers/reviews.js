import db from '../models/dummyBusinesses';

/**
 * Review Controller.
 * @class ReviewController
 * */
class ReviewController {
  /**
   * Add a new Review
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static addReview(req, res) {
    const { id } = req.params;
    const { user, content, stars } = req.body;


    db.business.forEach((bus) => {
      if (parseInt(id, 10) === bus.id) {
        const reviewId = bus.reviews.length + 1;
        const newReview = {
          reviewId, user, content, stars
        };

        bus.reviews.push(newReview);
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
  /**
   * Get all Reviews
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static listReview(req, res) {
    const { id } = req.params;

    db.business.forEach((bus) => {
      if (parseInt(id, 10) === bus.id) {
        res.json({
          reviews: bus.reviews,
          error: false,
        });
      }
    });
    return res.status(404).json({
      message: 'Business reviews not found',
      error: true,
    });
  }
}


export default ReviewController;
