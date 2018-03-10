import express from 'express';
import { BusinessController, AuthController, ReviewController } from '../controllers';


const router = express.Router();

// Register a User
router.post('/auth/signup', AuthController.signUp);
// Login a User
router.post('/auth/login', AuthController.logIn);

// Register a business
router.post('/businesses', BusinessController.register);
// Get all Businesses
router.get('/businesses', BusinessController.list);

// Update a Business Profile
router.put('/businesses/:id', BusinessController.update);
// Delete a Business Profile
router.delete('/businesses/:id', BusinessController.deleteById);
// Get a Business
router.get('/businesses/:id', BusinessController.getById);

// Add a review
router.post('/businesses/:id/reviews', ReviewController.addReview);
// Get All Reviews
router.get('/businesses/:id/reviews', ReviewController.listReview);


module.exports = router;
