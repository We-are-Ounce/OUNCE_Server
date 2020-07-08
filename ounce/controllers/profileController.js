let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Profile = require('../models/profile');
module.exports ={
    //다른 고양이 계정 프로필 조회
    diffProfile:async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.diffProfile(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },
    

    //다른 고양이 계정에서 리뷰 전체 조회
    diffReviewAll: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.diffReviewAll(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {count:idx.length,result:idx}));
    }
}