var express = require('express');
var router = express.Router();

router.use('/search', require('./search'));
router.use('/review', require('./review'));

router.use('/user', require('./user'));
// multer array 추가 

router.use('/profile', require('./profile'));


module.exports = router;
