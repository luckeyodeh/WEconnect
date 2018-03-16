import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import Model from '../models';

const { User } = Model;

/**
 * Business Controller.
 * @class BusinessController
 * */
export default class UserController {
  /**
   * List all users
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static list(req, res) {
    User.findAll({})
      .then((users) => {
        if (users.length === 0) {
          return res.status(400).send({
            error: true,
            message: 'No user found'
          });
        }
        res.status(200).send({
          error: false,
          users,
        });
      }).catch(() => {
        res.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
  }
  /**
   * Signup
   *
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static signUp(req, res) {
    const {
      email, password, firstName, lastName
    } = req.body;

    if (!isEmail(email) || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: 'Enter Valid Input',
        error: true,
      });
    }

    User.findOne({ where: { email: email.trim().toLowerCase() } })
      .then((userExists) => {
        if (userExists) {
          return res.status(400).json({
            error: true,
            message: 'Account exists for that email'
          });
        }
      });

    const hash = bcrypt.hashSync(password, 10);
    User.create({
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password: hash,
    }).then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 14 });
      return res.status(201).json({
        error: false,
        message: 'User created and logged in',
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
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
    User.findOne({ where: { email: email.trim().toLowerCase() } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
          return res.status(400).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SALT, { expiresIn: 86400 * 14 });

        return res.status(200).json({
          error: false,
          message: 'Logged in Successfully',
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
        });
      });
  }

  /**
   * Log out
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static logout(req, res) {
    res.setHeader('x-access-token', null);
    return res.status(200).send({
      error: false,
      message: 'User has been logged out',
      token: null
    });
  }

  /**
   * Get User
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static getUser(req, res) {
    User.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'User not found',
        });
      }
      return res.status(200).json({
        error: false,
        message: 'User found',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    });
  }
  /**
   * Update user details
   * @param {object} req The request body of the request.
   * @param {object} res The response body.
   * @returns {object} res.
   */
  static updateUser(req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'User not found'
          });
        }

        if (req.userId !== user.id) {
          return res.status(400).json({
            error: true,
            message: 'You do not have the permission to update this user'
          });
        }

        User.update({
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
        }, {
          where: { id: req.params.id, },
        }).then((updatedUser) => {
          if (!updatedUser) {
            return res.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return res.status(200).json({
            error: false,
            message: 'User updated',
            data: updatedUser
          });
        });
      });
  }
}
