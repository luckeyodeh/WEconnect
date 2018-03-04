const express = require('express');

const router = express.Router();
router.use('/businesses', require('./businesses'));
router.use('/auth', require('./auth'));

module.exports = router;