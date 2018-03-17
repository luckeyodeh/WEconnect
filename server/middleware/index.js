import Model from '../models';

const { Business } = Model;
/**
 * Middleware
 * @class Middleware
 * */
export default class Middleware {
  /**
   * Register a new business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @param {object} next The response body.
   * @returns {object} res.
   */
  static sorter(req, res, next) {
    const { location, category } = req.query;
    const hold = [];
    if (location) {
      Business.forEach((business) => {
        if (business.location.toLowerCase() === location.toLowerCase()) {
          hold.push(business);
        }
      });
      if (hold.length === 0) {
        return res.status(404).json({
          message: 'There is no business in that location yet',
          error: true
        });
      }
      return res.status(200).json(hold);
    }
    if (category) {
      Business.forEach((business) => {
        if (business.category.toLowerCase() === category.toLowerCase()) {
          hold.push(business);
        }
      });
      if (hold.length === 0) {
        return res.status(404).json({
          message: 'There is no business that category yet',
          error: true
        });
      }
      return res.status(200).json(hold);
    }
    next();
  }
}
