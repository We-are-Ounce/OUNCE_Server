var express = require('express');
var router = express.Router();

router.use('/review', require('./review'));

router.use('/user', require('./user'));
// multer array 추가 
router.use('/profile', require('./profile'));
router.use('/search', require('./search'));

module.exports = router;
