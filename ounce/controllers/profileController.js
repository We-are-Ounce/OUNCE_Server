let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Profile = require('../models/profile');
const jwt = require('../modules/jwt');
const profile = require('../models/profile');

module.exports = {
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
    },

    register: async(req, res) => {
        const userIdx = req.decoded.idx;

        const {
            profileIdx,
            profileImg,
            profileName,
            profileWeight,
            profileGender,
            profileNeutral,
            profileAge,
            profileInfo,   
        } = req.body;

        if (!profileIdx || !profileImg|| !profileName || !profileWeight || !profileGender || !profileNeutral || !profileAge || !profileInfo){
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        
        const pIdx = await profile.register(profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx);

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.REGISTER_PROFILE,{
                profileIdx: pIdx
            }));
    },

    update : async(req, res) => {
        const userIdx = req.decoded.idx;
        const {profileIdx} = req.params;

        const {
            profileImg,
            profileName,
            profileWeight,
            profileGender,
            profileNeutral,
            profileAge,
            profileInfo   
        } = req.body;

        
        const isMyProfileIdx = await profile.isMyProfileIdx(profileIdx, userIdx);

        if (!isMyProfileIdx) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_UPDATE_PROFILE));
        }

        const result = await profile.update(profileIdx, profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_PROFILE, {
            profileIdx : isMyProfileIdx
        }))

    },

    register2: async(req, res)=>{
        const{
            profileImg,profileName,profileWeight,profileGender, profileNeutral,profileAge,
            profileInfo, 
            userIdx
        } = req.body;
        if(!profileImg|| !profileName|| !profileWeight || !profileGender || !profileNeutral || !profileAge || !profileInfo || !userIdx){
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        if(userIdx ===-1){
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.REGISTER_PROFILE,{
                userIdx: userIdx
            }));
    },
    mainProfile: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.mainProfile(profileIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_PROFILE_SUCCESS, idx));
    }, 
    mainReviewAll: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.mainReviewAll(profileIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_PROFILE_SUCCESS, {count:idx.length, result: idx}));
    },
    followList: async(req, res) =>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.followList(profileIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_FOLLOW_LIST_SUCCESS,{count:idx.length, result : idx}));
    },
    editProfile: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const {profileImg, profileName, profileGender, profileWeight, profileAge, profileInfo, userIdx} = req.body;
       // const getUserIdx = await Profile.getUserIdx(profileIdx);
        const result = await Profile. editProfile(profileIdx, profileImg, profileName, profileGender, profileWeight, profileAge, profileInfo, userIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.UPDATE_PROFILE_SUCCESS,  {updateReview: result}));
    }

}