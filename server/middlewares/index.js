import jwt from 'jsonwebtoken';
import data from '../models';

const { Business } = data;

/**
 * Middleware
 * @class Middleware
 * */
export default class Middleware {
  /**
   * Register business
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @param {object} next to next middleware.
   * @returns {object} response.
   */
  static isType(req, res, next) {
    const { location, category } = req.query;

    if (location) {
      Business.findAll({ where: { location } }).then((regBusinesses) => {
        if (regBusinesses.length === 0) {
          return res.status(404).json({
            error: true,
            message: `No business in ${location} yet`
          });
        }
        return res.status(200).json({
          error: false,
          regBusinesses,
        });
      });
    }

    if (category) {
      Business.findAll({ where: { category } }).then((regBusinesses) => {
        if (regBusinesses.length === 0) {
          return res.status(404).json({
            error: true,
            message: `No business in ${category} yet`
          });
        }
        return res.status(200).json({
          error: false,
          regBusinesses,
        });
      });
    }
    next();
  }

  /**
   * Authentication
   * @param {object} req The request.
   * @param {object} res The response.
   * @param {object} next to next middleware
   * @returns {object} next
   */
  static auth(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, process.env.SALT, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'User not authenticated'
        });
      }
      req.userId = decoded.id;
      return next();
    });
  }
}
