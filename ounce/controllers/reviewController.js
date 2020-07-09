const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const review = require('../models/review');

const reviewInfo = {

    reviewAdd : async(req, res) => {

        // 리뷰 (평점, 선호도, 한줄소개, 변상태, 변냄새, 트리블(눈, 귀, 털, 구토), 메모)
        const {reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo, createdAt, foodIdx, profileIdx} = req.body;
        
        // // 필수 파라미터가 부족할 때 
        // if (!reviewRating || !reviewPrefer || !reviewInfo) {
        //     res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        //     return;
        // }

        const result = await review.reviewAdd(reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo, createdAt, foodIdx, profileIdx);
        
        res.statusCode(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_REVIEW_ADD, result));    
    }
}

module.exports = reviewInfo;