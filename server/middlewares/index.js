import jwt from 'jsonwebtoken';
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
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @param {object} next The responseponse body.
   * @returns {object} response.
   */
  static sorter(request, response, next) {
    const { location, category } = request.query;

    if (location) {
      Business.findAll({ where: { location } }).then((businesses) => {
        if (businesses.length === 0) {
          return response.status(404).json({
            error: true,
            message: `No business found in ${location}`
          });
        }
        return response.status(200).json({
          error: false,
          businesses,
        });
      });
    }

    if (category) {
      Business.findAll({ where: { category } }).then((businesses) => {
        if (businesses.length === 0) {
          return response.status(404).json({
            error: true,
            message: `No business found in ${category}`
          });
        }
        return response.status(200).json({
          error: false,
          businesses,
        });
      });
    }


    next();
  }
}