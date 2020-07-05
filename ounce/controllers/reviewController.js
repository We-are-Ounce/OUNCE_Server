let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Review = require('../models/review');
module.exports ={
        //총점 순으로 정렬
        sortByRating: async(req, res)=>{
            const profileIdx = req.params.profileIdx;
            const idx = await Review.sortByRating(profileIdx);
            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
        },

        //기호도 순으로 정렬
        sortByPrefer: async(req, res)=>{
            const profileIdx = req.params.profileIdx;
            const idx = await Review.sortByPrefer(profileIdx);
            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
        },

        //시간 순으로 정렬
        sortByDate: async(req, res)=>{
            const profileIdx = req.params.profileIdx;
            const idx = await Review.sortByDate(profileIdx);
            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
        },

    //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 전체 조회
    myReviewAll: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Review.myReviewAll(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 하나 클릭 시 상세 조회
    myReviewOne: async(req, res)=>{
        const reviewIdx = req.params.reviewIdx;
        const idx = await Review.myReviewOne(reviewIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

        //내 계정 중 선택된 고양이 별 내가 쓴 리뷰 제조사만 필터링
        myReviewManu: async(req, res)=>{
            const profileIdx = req.params.profileIdx;
            const idx = await Review.myReviewManu(profileIdx);
            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
        } ,

        //내가 쓴 리뷰 필터링 조건 받아왔을 때 처리부분
        myReviewFilter: async(req, res)=>{
            var {foodManu, foodDry, foodMeat} = req.body;
            console.log(foodManu, foodDry, foodMeat);
            if (foodManu.length!=0){
            foodManu = '"'+foodManu.join('","')+'"';
            } else{
                foodManu = `SELECT foodManu FROM food`
            }
            if (foodMeat.length!=0){
            foodMeat = '"'+foodMeat.join('","')+'"';
            }else{
                foodMeat = `SELECT foodMeat FROM food`
            }
            const profileIdx = req.params.profileIdx;
            const idx = await Review.myReviewFilter(foodManu, foodDry, foodMeat,profileIdx);
            return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
        }
}