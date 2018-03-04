const express = require('express');

const router = express.Router();
router.use('/businesses', require('./businesses'));

module.exports = router;