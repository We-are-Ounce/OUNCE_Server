const express = require('express');
const router = express.Router();
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const searchController = require('../controllers/searchController');

// 캣 푸드 이름으로 검색
router.post('/food', searchController.searchFood);


module.exports = router;