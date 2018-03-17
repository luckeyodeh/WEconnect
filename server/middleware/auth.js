import jwt from 'jsonwebtoken';

/**
   * Checks if a user is logged in
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @param {object} next Passes control to next middleware
   * @returns {object} next
   */
const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.SALT, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: 'User not logged in'
      });
    }
    req.userId = decoded.id;
    return next();
  });
};

export default auth;
