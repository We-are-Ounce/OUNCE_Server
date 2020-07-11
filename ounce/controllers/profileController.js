let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Profile = require('../models/profile');
const jwt = require('../modules/jwt');
const profile = require('../models/profile');

module.exports = {
    //다른 고양이 계정 프로필 조회
    diffProfile:async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.diffProfile(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    },

    //다른 고양이 계정에서 리뷰 전체 조회
    diffReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.diffReviewAll(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {count:idx.length,result:idx}));
    },

    register: async(req, res) => {
        const userIdx = req.userIdx;

        const {profileImg,profileName,profileWeight,profileGender,profileNeutral,profileAge,profileInfo} = req.body;

        if (!profileImg|| !profileName || !profileWeight || !profileGender || !profileNeutral || !profileAge || !profileInfo){
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

    updateProfile : async(req, res) => {
        const userIdx = req.userIdx;
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

        const result = await profile.updateProfile(profileIdx, profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_PROFILE, {
            profileIdx : isMyProfileIdx
        }))

    },

    mainProfile: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        if (!token) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN))
            return;
        }
        const user = await jwt.verify(token);
        if (user == TOKEN_EXPIRED) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (user == TOKEN_INVALID) {
            return res.json(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (user.idx == undefined) {
            return res.json(util.fail(statusCodes.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        const idx = await profile.mainProfile(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, idx));
    }, 

    mainReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await profile.mainReviewAll(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {count:idx.length, result: idx}));
    },

    followList: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await profile.followList(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_FOLLOW_LIST_SUCCESS,{count:idx.length, result : idx}));
    },

    followerList: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await profile.followerList(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_FOLLOWER_LIST_SUCCESS,{count:idx.length, result:idx}));
    },

    requestFollow: async(req, res)=>{
        const {myprofileIdx, followingIdx} = req.body;

        if(!myprofileIdx || !followingIdx){
            res.status(statusCode.BAD_REQUEST, resMessage.NULL_VALUE, {});
        }

        const idx = await profile.requestFollow(myprofileIdx, followingIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.REQUEST_FOLLOW_SUCCESS, idx));

    },
    deleteFollow:async(req, res)=>{
        const {myprofileIdx, followingIdx } = req.body;
        if(!myprofileIdx || !followingIdx ) {
            res.status(statusCode.BAD_REQUEST, resMessage.NULL_VALUE, {})
        }
        const idx = await profile.deleteFollow(myprofileIdx, followingIdx);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_FOLLOW_SUCCESS, idx));

    }
}