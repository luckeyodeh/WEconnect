const businessesController = require('../controllers').businesses;
const reviewsController = require('../controllers').reviews;

module.exports = (app) => {
  /* app.get('/api/v1', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  })); */

  app.post('/api/v1/businesses', businessesController.create);
  app.get('/api/v1/businesses', businessesController.list);
  app.get('/api/v1/businesses/:businessId', businessesController.retrieve);
  app.put('/api/v1/businesses/:businessId', businessesController.update);
  app.delete('/api/v1/businesses/:businessId', businessesController.destroy);

  app.post('/api/v1/businesses/:businessId/reviews', reviewsController.create);
  /* app.put('/api/v1/businesses/:businessId/reviews/:reviewId', reviewsController.update); */
  app.delete('/api/v1/businesses/:businessId/reviews/:reviewId', reviewsController.destroy);
  app.all('/api/v1/businesses/:businessId/reviews', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
