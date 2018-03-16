import Model from '../models';

const { Business } = Model;

/**
 * Business Controller.
 * @class BusinessController
 * */
export default class BusinessController {
  /**
   * Register a new business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static register(req, res) {
    const {
      name, details, location, category
    } = req.body;

    const { userId } = req;

    if (!name || !details || !location || !category) {
      return res.status(400).json({
        error: true,
        message: 'some fields missing,'
      });
    }

    Business.create({
      name, details, location, category, userId,
    }).then(business => res.status(201).json({
      error: false,
      business,
    })).catch(e => res.status(500).json({
      error: true,
      message: e,
    }));
  }

  /**
   * Update a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static update(req, res) {
    const {
      name, details, location, category
    } = req.body;
    Business.findById(req.params.id)
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            error: true,
            message: 'Business not found'
          });
        }
        if (req.userId !== business.userId) {
          return res.status(400).json({
            error: true,
            message: 'You do not have the permission to update this business'
          });
        }
        Business.update({
          name: name || business.name,
          details: details || business.details,
          location: location || business.location,
          category: category || business.category
        }, {
          where: { id: req.params.id, },
        }).then((updatedBusiness) => {
          if (!updatedBusiness) {
            return res.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return res.status(200).json({
            error: false,
            message: 'Business updated',
            data: updatedBusiness
          });
        });
      }).catch(() => {
        res.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
  }

  /**
   * Delete a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static deleteById(req, res) {
    Business.findById(req.params.id).then((business) => {
      if (!business) {
        return res.status(404).json({
          error: true,
          message: 'No business found',
        });
      }
      if (req.userId !== business.userId) {
        return res.status(400).json({
          error: true,
          message: 'You do not have the permission to delete this business'
        });
      }
      Business.destroy({
        where: { id: req.params.id }
      }).then((deleteStatus) => {
        if (!deleteStatus) {
          res.status(500).json({
            error: true,
            message: 'Unable to delete Business'
          });
        }
        return res.status(200).json({
          error: false,
          message: 'Business Deleted',
        });
      });
    });
  }

  /**
   * List all businesses
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static list(req, res) {
    const { location, category } = req.query;

    if (location) {
      Business.findAll({ where: { location } }).then((businesses) => {
        if (businesses.length === 0) {
          return res.status(404).json({
            error: true,
            message: `No business found in ${location}`
          });
        }
        return res.status(200).json({
          error: false,
          businesses,
        });
      });
    }

    if (category) {
      Business.findAll({ where: { category } }).then((businesses) => {
        if (businesses.length === 0) {
          return res.status(404).json({
            error: true,
            message: `No business found in ${category}`
          });
        }
        return res.status(200).json({
          error: false,
          businesses,
        });
      });
    }

    Business.findAll({}).then((businesses) => {
      if (businesses.length === 0) {
        return res.status(404).json({
          error: true,
          message: 'No business found'
        });
      }
      return res.status(200).json({
        error: false,
        businesses,
      });
    }).catch(e => res.status(500).json({
      error: true,
      message: e
    }));
  }
  /**
   * Get a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static getById(req, res) {
    Business.findById(req.params.id).then((business) => {
      if (!business) {
        return res.status(404).json({
          error: true,
          message: 'No business found',
        });
      }
      return res.status(200).json({
        error: false,
        business,
      });
    }).catch(() => res.status(500).json({
      error: true,
      message: 'Server error'
    }));
  }
}
