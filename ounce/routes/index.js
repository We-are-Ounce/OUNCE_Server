var express = require('express');
var router = express.Router();

router.use('/review', require('./review'));


module.exports = router;
