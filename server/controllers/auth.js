import db from '../models/dummyUsers';

/**
 * Auth Controller
 * @class AuthController
 * */
class AuthController {
  /**
   * Signup
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static signUp(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Input Both Email and Password',
        error: true,
      });
    }
    db.users.push(req.body);
    return res.status(201).json({
      message: 'User Created Successfully',
      error: false,
    });
  }

  /**
   * Login
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static logIn(req, res) {
    const { email, password } = req.body;
    db.users.forEach((user) => {
      if (email === user.email && password === user.password) {
        return res.status(200).json({
          message: 'Logged in successfully',
          error: false,
        });
      }
    });
    return res.status(400).json({
      message: 'Unable to Log in',
      error: true,
    });
  }
}

export default AuthController;
