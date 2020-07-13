const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Review = require('../models/review');
const moment = require('moment');
const profile = require('../models/profile');

// 리뷰등록
module.exports = {
    reviewAdd : async(req, res) => {
        const userIdx = req.userIdx;

        // 리뷰 (평점, 선호도, 한줄소개, 변상태, 변냄새, 트리블(눈, 귀, 털, 구토), 메모
        const {reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx} = req.body;

        // 필수 파라미터가 부족할 때 
        if (!reviewRating || !reviewPrefer || !reviewInfo | userIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const isMyProfileIdx = await profile.isMyProfileIdx(profileIdx, userIdx);

        if (!isMyProfileIdx) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_UPDATE_REVIEW));
        }

        const result = await Review.reviewAdd(reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx, userIdx);

        
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_REVIEW_ADD));    
    },

    limitReview: async(req, res) => {
        const {profileIdx, foodIdx} = req.body;

        if (!profileIdx, !foodIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const rIdx = await Review.addReview(profileIdx, foodIdx);

        if (!rIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, resMessage.NO_ADD_REVIEW, {
                unPossibleAddReview : rIdx
            }))
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_REVIEW, {
            PossibleAddReview : rIdx
        }))

    },

      //총점 순으로 정렬
    sortByRating: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Review.sortByRatding(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //기호도 순으로 정렬
    sortByPrefer: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Review.sortByPrefer(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //시간 순으로 정렬
    sortByDate: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Review.sortByDate(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 전체 조회
    myReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Review.myReviewAll(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 하나 클릭 시 상세 조회
    myReviewOne: async(req, res) => {
        const reviewIdx = req.params.reviewIdx;
        const idx = await Review.myReviewOne(reviewIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 제조사만 필터링
    myReviewManu: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Review.myReviewManu(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //내가 쓴 리뷰 필터링 조건 받아왔을 때 처리부분
    myReviewFilter: async(req, res) => {
        var {foodManu, foodDry, foodMeat} = req.body;
        if (foodManu.length != 0){
        foodManu = '"' + foodManu.join('","') + '"';
        } else{
            foodManu = `SELECT foodManu FROM food`
        }
        if (foodMeat.length != 0) {
        foodMeat = '"' + foodMeat.join('","') + '"';
        } else {
            foodMeat = `SELECT foodMeat FROM food`
        }
        if (foodDry.length == 0) {
            foodDry = `SELECT foodDry FROM food`
        } else {
            foodDry = '"' + foodDry.join('","') + '"';
        }
        const profileIdx = req.params.profileIdx;
        const idx = await Review.myReviewFilter(foodManu, foodDry, foodMeat, profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    updateReview: async(req, res) => {
        const reviewIdx = req.params.reviewIdx;
        const userIdx = req.userIdx;
        const {reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx} = req.body;
        const checkMyReview = await Review.checkMyReview(userIdx,reviewIdx);
        if(!checkMyReview){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_UPDATE_POST));
        }
      
        const result = await Review.updateReview(reviewIdx, reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx, userIdx);
        //성공하면
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_UPDATE_SUCCESS, {updateReview: result}));
    },

    deleteReview : async (req,res)=> {
        const userIdx = req.userIdx;
        const reviewIdx = req.params.reviewIdx;
        if(!reviewIdx){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        }

        // 내가쓴 글이 아니라면 삭제 불가
        const checkMyReview = await Review.checkMyReview(userIdx,reviewIdx);
        if (!checkMyReview){
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_DELETE_POST));
        }
        const result = await Review.deleteReview(reviewIdx);
        return await res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_POST,{deleteReview:result}));
    },
    
}