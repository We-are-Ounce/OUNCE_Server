const express = require('express');
const router = express.Router();
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const reviewController = require('../controllers/reviewController');

router.get('/detail/:foodIdx', reviewController.reviewDetail);
router.post('/add', reviewController.reviewAdd);

module.exports = router;
