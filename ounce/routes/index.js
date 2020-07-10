var express = require('express');
var router = express.Router();

router.use('/review', require('./review'));
router.use('/profile', require('./profile'));

module.exports = router;
