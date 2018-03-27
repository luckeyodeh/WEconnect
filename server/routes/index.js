import express from 'express';
import { UserController, BusinessController, ReviewController } from '../../controllers';
import Middleware from '../../middlewares';


const router = express.Router();


router.post('/api/v1/businesses', Middleware.auth, BusinessController.addBusiness);
router.put('/api/v1/businesses/:id', Middleware.auth, BusinessController.updateBusiness);
router.delete('/api/v1/businesses/:id', Middleware.auth, BusinessController.deleteBusiness);
router.get('/api/v1/businesses/', Middleware.isType, BusinessController.getAllBusinesses);
router.get('/api/v1/businesses/:id', BusinessController.getABusiness);
router.get('/api/v1/users', UserController.list);
router.get('/api/v1/users/:id', UserController.getUser);
router.put('/api/v1/users/:id', Middleware.auth, UserController.editUser);
router.post('/api/v1/auth/signup', UserController.signup);
router.post('/api/v1/auth/login', UserController.login);
router.get('/api/v1/businesses/:id/reviews', ReviewController.getReviews);
router.post('/api/v1/businesses/:id/reviews', Middleware.auth, ReviewController.createReview);

export default router;
