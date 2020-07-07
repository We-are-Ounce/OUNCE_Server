var express = require('express');
var router = express.Router();

router.use('/search', require('./search'));
router.use('/review', require('./review'));

module.exports = router;
