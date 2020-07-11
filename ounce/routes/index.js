var express = require('express');
var router = express.Router();

router.use('/search', require('./search'));
router.use('/review', require('./review'));

router.use('/user', require('./user'));

router.use('/profile', require('./profile'));


module.exports = router;
