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


router.post('/api/v1/businesses', BusinessController.register);
router.put('/api/v1/businesses/:id', BusinessController.update);
router.delete('/api/v1/businesses/:id', BusinessController.deleteById);
router.get('/api/v1/businesses/', Middleware.sorter, BusinessController.list);
router.get('/api/v1/businesses/:id', BusinessController.getById);
router.get('/api/v1/users', UserController.list);
router.get('/api/v1/users/:id', UserController.getUser);
router.put('/api/v1/users/:id', UserController.updateUser);
router.post('/api/v1/auth/signup', UserController.signUp);
router.post('/api/v1/auth/login', UserController.logIn);
router.get('/api/v1/auth/logout', UserController.logout);
router.get('/api/v1/businesses/:id/reviews', ReviewController.listReview);
router.post('/api/v1/businesses/:id/reviews', ReviewController.addReview);

export default router;
