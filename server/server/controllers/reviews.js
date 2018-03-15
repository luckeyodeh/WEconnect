const Review = require('../models').Review;

module.exports = {
  create(req, res) {
    return Review
      .create({
        content: req.body.content,
        rating: req.params.rating,
      })
      .then(review => res.status(201).send(review))
      .catch(error => res.status(400).send(error));
  },

  /* update(req, res) {
    return Review
      .find({
        where: {
          id: req.params.reviewId,
          business: req.params.businessId,
        },
      })
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            message: 'Review Not Found',
          });
        }

        return review
          .update({
            content: req.body.content || review.content,
            rating: req.body.rating || review.rating,
          })
          .then(updatedReview => res.status(200).send(updatedReview))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }, */

  destroy(req, res) {
    return Review
      .find({
        where: {
          id: req.params.reviewId,
          businessId: req.params.businessId,
        },
      })
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            message: 'Review Not Found',
          });
        }

        return review
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
