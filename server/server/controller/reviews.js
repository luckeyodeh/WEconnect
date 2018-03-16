import Model from '../models';

const { Business } = Model;
const { Review } = Model;
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
    Business.findById(req.params.id).then((business) => {
      if (!business) {
        return res.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review.findAll().then((reviews) => {
        if (reviews.length === 0) {
          return res.status(404).json({
            error: true,
            message: 'No review found'
          });
        }
        return res.status(200).json({
          error: false,
          reviews,
        });
      }).catch(() => res.status(500).json({
        error: true,
        message: 'Server Error'
      }));
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
    const { content, star } = req.body;
    const userId = 2;
    const businessId = req.params.id;
    Business.findById(businessId).then((business) => {
      if (!business) {
        return res.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review.create({
        content, star, userId, businessId
      }).then(review => res.status(201).json({
        error: false,
        review,
      })).catch(() => {
        res.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    });
  }
}
