import data from '../models';

const { Business, Review } = data;

/**
 * Business Controller.
 * @class ReviewController
 * */
class ReviewController {

/**
   * Add a new Review
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} response.
   */
  static createReview(req, res) {
    const { userId } = req;
    Business.findById(businessId).then((business) => {
      if (!business) {
        return res.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review
        .create({
          content: req.body.content,
          star: req.body.star,
          businessId: req.params.businessId,
        })
        .then(review => res.status(201).send(review))
        .catch(error => res.status(400).send(error));
    });

  }
  /**
   * Get all Reviews
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} response.
   */
  static getReviews(req, res) {
    Business
      .findById(request.params.businessid)
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        return Review
          .findAll({
            where: {
              businessId: req.params.businessId
            }
          })
          .then((reviews) => {
            if (reviews.length === 0) {
              return res.status(404).json({
                message: 'No review for this business'
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

  
}
export default ReviewController