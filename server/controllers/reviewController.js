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
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static listReview(request, response) {
    Business.findById(request.params.id).then((business) => {
      if (!business) {
        return response.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review.findAll().then((reviews) => {
        if (reviews.length === 0) {
          return response.status(404).json({
            error: true,
            message: 'No review found'
          });
        }
        return response.status(200).json({
          error: false,
          reviews,
        });
      }).catch(() => response.status(500).json({
        error: true,
        message: 'Server Error'
      }));
    });
  }

  /**
   * Add a new Review
   *
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static addReview(request, response) {
    const { content, star } = request.body;
    const { userId } = request;
    const businessId = request.params.id;
    Business.findById(businessId).then((business) => {
      if (!business) {
        return response.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review.create({
        content, star, userId, businessId
      }).then(review => response.status(201).json({
        error: false,
        review,
      })).catch(() => {
        response.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
    });
  }
}
