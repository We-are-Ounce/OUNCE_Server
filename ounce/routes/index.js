var express = require('express');
var router = express.Router();

router.use('/search', require('./search'));

module.exports = router;
