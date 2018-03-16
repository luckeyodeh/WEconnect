import db from '../models-dum/dummyBusinesses';

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

    if (!req.body.name) {
      return res.status(400).json({
        message: 'Business Name Missing',
        error: true
      });
    }

    const id = db.business.length + 1;
    const newBusiness = {
      id, name, details, category, location
    };
    db.business.push(newBusiness);
    return res.status(201).json({
      message: 'New Business Added',
      error: false,
      business: newBusiness,
    });
  }

  /**
   * Update a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static update(req, res) {
    const { id } = req.params;
    let editBusiness;
    db.business.forEach((bus) => {
      if (bus.id === parseInt(id, 10)) {
        bus.name = req.body.name || bus.name;
        bus.details = req.body.details || bus.details;
        bus.location = req.body.location || bus.location;
        bus.category = req.body.category || bus.category;

        editBusiness = bus;
      }
    });
    if (editBusiness) {
      return res.status(200).json({
        message: 'Business Updated',
        error: false,
        business: editBusiness,
      });
    }
    return res.status(404).json({
      message: 'Business Not Found',
      error: true
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
    const { id } = req.params;

    db.business.forEach((bus, i) => {
      if (bus.id === parseInt(id, 10)) {
        db.business.splice(i, 1);
        return res.status(200).json({
          message: 'Business Deleted',
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
   * List all businesses
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static list(req, res) {
    return res.status(200).json({
      businesses: db.business,
      error: false,
    });
  }
  /**
   * Get a business
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static getById(req, res) {
    const { id } = req.params;

    db.business.forEach((bus) => {
      if (parseInt(id, 10) === bus.id) {
        return res.status(200).json({
          message: 'Success',
          error: false,
          business: bus,
        });
      }
    });
    return res.status(404).json({
      message: 'Business Not Found',
      error: true
    });
  }
}
