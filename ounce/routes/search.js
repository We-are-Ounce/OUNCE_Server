const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// 캣 푸드 제조사명, 이름으로 검색
router.post('/food', searchController.searchFood);
// 유저 검색
router.post('/user', searchController.searchUser);
// 리뷰작성하기 위해서 제조사, 제품명 검색
router.post('/toWrite/:profileIdx', searchController.toWrite);
// 검색 후 전체 리뷰 리스트
router.post('/reviewAll', searchController.reviewAll);
// 유사한 입맛 고양이 추천 리스트
router.post('/recommend', searchController.recommend);
// 검색 후 전체 리뷰 리스트 평균 총점 정렬
router.post('/reviewAll/avgRating', searchController.reviewSortRating);
// 검색 후 전체 리뷰 리스트 평균 기호도 정렬
router.post('/reviewAll/avgPrefer', searchController.reviewSortPrefer);

module.exports = router;