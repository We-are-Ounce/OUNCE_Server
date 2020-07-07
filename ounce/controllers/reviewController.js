const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

const reviewInfo = {

    reviewAdd : async(req, res) => {

        // 리뷰 (평점, 선호도, 한줄소개, 변상태, 변냄새, 트리블(눈, 귀, 털, 구토), 메모)
        const {reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo} = req.body;
        
        // 필수 파라미터가 부족할 때 
        if (!reviewRating || !reviewPrefer || !reviewInfo) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
       
    
    }
}

module.exports = reviewInfo;