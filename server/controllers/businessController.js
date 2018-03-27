import data from '../models';

const { Business } = data;

/**
 * Business Controller.
 * @class BusinessController
 * */
class BusinessController {
  /**
   * Register business
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @returns {object} response.
   */
  static addBusiness(req, res) {
    const {
      name, details, location, category
    } = req.body;

    const { userId } = req;

    if (!name || !details || !location || !category) {
      return res.status(403).json({
        error: true,
        message: 'Some fields are missing'
      });
    }

    // Check whether business has been chosen
    Business.find({ where: { name } }).then((regBusiness) => {
      if (regBusiness.name === name) {
        return res.status(403).json({
          error: true,
          message: 'Business name chosen already',
        });
      }

    // Create a business
      Business
        .create({
          name: req.body.name,
          details: req.body.details,
          location: req.body.location,
          category: req.body.category,
        })
        .then(() => res.status(201).send(regBusiness))
        .catch(error => res.status(400).send(error));
    });
  }

  /**
   * Update a business
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @returns {object} response.
   */
  static updateBusiness(req, res) {
    Business.findById(req.params.businessid)
      .then((regBusiness) => {
        if (!regBusiness) {
          return res.status(404).json({
            error: true,
            message: 'Requested business not available'
          });
        }

        if (req.userId !== regBusiness.userId) {
          return res.status(401).json({
            error: true,
            message: 'Permission required to update this business'
          });
        }


        // Update the business
        Business.update({
          name: req.body.name || regBusiness.name,
          details: req.body.details || regBusiness.details,
          location: req.body.location || regBusiness.location,
          category: req.body.category || regBusiness.category,
        })
          .then(() => res.status(200).send(regBusiness))  // Send back the updated business.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  /**
   * Delete a business
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @returns {object} response.
   */
  static deleteBusiness(req, res) {
    Business
      .findById(req.params.businessId)
      .then(() => {
        Business
          .destroy({
            where: {
              id: parseInt(req.params.businessId, 10)
            }
          })
          .then(() => {
            res.status(200).json({
              message: 'Business deleted successfully',
            });
          })
          .catch(() => res.status(500).send('Internal server error'));
      });
  }
  /**
   * List all businesses
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @returns {object} response.
   */
  static getAllBusinessess(req, res) {
    Business
      .findAll({})
      .then((allBusiness) => {
        if (allBusiness.length > 0) {
          return res.status(200).send({
            status: 'Success',
          });
        }
        return res.status(404).json({
          message: 'No business found'
        });
      })
      .catch(() => res.status(500).send('Internal server error'));
  }
  /**
   * Get a business
   *
   * @param {object} req The request.
   * @param {object} res The response.
   * @returns {object} response.
   */
  static getABusiness(req, res) {
    Business
      .findById(parseInt(req.params.businessId, 10))
      .then((business) => {
        res.status(200).json({
          message: 'Business found!',
          Business: business
        });
      })
      .catch(() => res.status(500).send('Internal sever Error'));
  }
}

export default BusinessController;