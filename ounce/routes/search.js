const express = require('express');
const router = express.Router();
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const searchController = require('../controllers/searchController');

// 캣 푸드 제조사명, 이름으로 검색
router.post('/food', searchController.searchFood);
// 유저 검색
router.post('/user', searchController.searchUser);

// search/review;


module.exports = router;