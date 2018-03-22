import express from 'express';

// Controller
import { UserController, BusinessController, ReviewController } from '../../controllers';
// import UserController from '../../controller/UserController';
// import BusinessController from '../../controller/BusinessController';
// import ReviewController from '../../controller/ReviewController';

// Middleware
import Middleware from '../../middlewares';


const router = express.Router();

// REDIRECT '/' to '/api/v1'
router.get('/', (req, res) => {
  res.redirect('/api/v1');
});
// Redirect '/' to '/api-docs'
router.get('/api/v1', (req, res) => {
  res.redirect('/api-docs');
});
// POST register business
router.post('/api/v1/businesses', BusinessController.register);
// PUT update business
router.put('/api/v1/businesses/:id', BusinessController.update);
// DELETE delete business
router.delete('/api/v1/businesses/:id', BusinessController.deleteById);
// GET get all businesses
router.get('/api/v1/businesses/', Middleware.sorter, BusinessController.list);
// Get a Business
router.get('/api/v1/businesses/:id', BusinessController.getById);
// GET get all reviews
router.get('/api/v1/businesses/:id/reviews', ReviewController.listReview);
// POST add reviews
router.post('/api/v1/businesses/:id/reviews', ReviewController.addReview);

export default router;
