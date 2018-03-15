const Business = require('../models').Business;
const Review = require('../models').Review;

module.exports = {
  create(req, res) {
    return Business
      .create({
        name: req.body.name,
        details: req.body.details,
        location: req.body.location,
        category: req.body.category,
      })
      .then(business => res.status(201).send(business))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Business
      .findAll({
        include: [{
          model: Review,
          as: 'reviews',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Review, as: 'reviews' }, 'createdAt', 'ASC'],
        ],
      })
      .then(businesses => res.status(200).send(businesses))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Business
      .findById(req.params.businessId, {
        include: [{
          model: Review,
          as: 'reviews',
        }],
      })
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Business Not Found',
          });
        }
        return res.status(200).send(business);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Business
      .findById(req.params.businessId, {
        include: [{
          model: Review,
          as: 'reviews',
        }],
      })
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Business Not Found',
          });
        }
        return business
          .update({
            name: req.body.name || business.name,
            details: req.body.details || business.details,
            location: req.body.location || business.location,
            category: req.body.category || business.category,
          })
          .then(() => res.status(200).send(business))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Business
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(400).send({
            message: 'Business Not Found',
          });
        }
        return business
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
