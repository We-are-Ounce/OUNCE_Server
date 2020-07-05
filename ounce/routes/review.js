var express = require('express');
var router = express.Router();
const reviewControllers = require('../controllers/reviewController')
//내가 쓴 리뷰 제조사만 필터링
router.get('/:profileIdx/category', reviewControllers.myReviewManu);

//내가 쓴 리뷰 필터링 조건 받아왔을 때 처리부분
router.get('/:profileIdx/filter', reviewControllers.myReviewFilter);

//내 계정 중 선택된 고양이 별 내가 쓴 리뷰 하나 클릭 시 상세 조회
router.get('/myreview/:reviewIdx', reviewControllers.myReviewOne);

//내 계정 중 선택된 고양이 별 내가 쓴 리뷰 전체 조회
router.get('/:profileIdx', reviewControllers.myReviewAll);

//총점순으로 정렬
router.get('/:profileIdx/rating', reviewControllers.sortByRating);

//기호도순으로 정렬
router.get('/:profileIdx/prefer', reviewControllers.sortByPrefer);

//시간순으로 정렬
router.get('/:profileIdx/date', reviewControllers.sortByDate);
module.exports = router;