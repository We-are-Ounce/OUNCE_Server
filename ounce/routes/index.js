var express = require('express');
var router = express.Router();

/* GET home page. */

router.use('/user', require('./user'));
// multer array 추가 

router.use('/review', require('./review'));

router.use('/profile', require('./profile'));

module.exports = router;
