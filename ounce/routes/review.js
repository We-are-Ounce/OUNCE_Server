const express = require('express');
const router = express.Router();
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const reviewControllers = require('../controllers/reviewController');
// search reviewALl 
router.post('/add', reviewControllers.reviewAdd);

//내가 쓴 리뷰 제조사만 필터링
router.get('/:profileIdx/category', reviewControllers.myReviewManu);

//내가 쓴 리뷰 필터링 조건 받아왔을 때 처리부분
router.get('/:profileIdx/filter', reviewControllers.myReviewFilter);

//내 계정 중 선택된 고양이 별 내가 쓴 리뷰 하나 클릭 시 상세 조회
router.get('/detail/:reviewIdx', reviewControllers.myReviewOne);

//내 계정 중 선택된 고양이 별 내가 쓴 리뷰 전체 조회
router.get('/:profileIdx', reviewControllers.myReviewAll);

//총점순으로 정렬
router.get('/:profileIdx/rating', reviewControllers.sortByRating);

//기호도순으로 정렬
router.get('/:profileIdx/prefer', reviewControllers.sortByPrefer);

//시간순으로 정렬
router.get('/:profileIdx/date', reviewControllers.sortByDate);

//내가 쓴 리뷰 수정
router.put('/update/:reviewIdx', reviewControllers.updateReview);

//내가 쓴 리뷰 삭제
router.delete('/delete/:profileIdx/:reviewIdx', reviewControllers.deleteReview);

module.exports = router;