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
    //1. 프로필 등록
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
    //2. 프로필 추가
    addProfile: async(req, res)=>{
        const userIdx = req.userIdx;
        const pIdx = await profile.addProfile(userIdx);

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.ADD_PROFILE_SUCCESS,{
                possibleAddProfile : pIdx
            }
        ))
    },
    //3. 프로필 수정
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
    //4. 프로필 조회(상단)
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
    //4-2 프로필 조회(하단)
    mainReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await profile.mainReviewAll(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {count:idx.length, result: idx}));
    },
    //5. 팔로우 목록 조회
    followList: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await profile.followList(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_FOLLOW_LIST_SUCCESS,{count:idx.length, result : idx}));
    },
    //5-2. 팔로워 목록 조회
    followerList: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await profile.followerList(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_FOLLOWER_LIST_SUCCESS,{count:idx.length, result:idx}));
    },
    //5-3 팔로우 신청
    requestFollow: async(req, res)=>{
        const {myprofileIdx, followingIdx} = req.body;
        if(!myprofileIdx || !followingIdx){
            res.status(statusCode.BAD_REQUEST, resMessage.NULL_VALUE, {});
        }

        const idx = await profile.requestFollow(myprofileIdx, followingIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.REQUEST_FOLLOW_SUCCESS, idx));

    },
    //5-4 팔로우 취소
    deleteFollow:async(req, res)=>{
        const {myprofileIdx, followingIdx } = req.body;
        if(!myprofileIdx || !followingIdx ) {
            res.status(statusCode.BAD_REQUEST, resMessage.NULL_VALUE, {})
        }
        const idx = await profile.deleteFollow(myprofileIdx, followingIdx);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_FOLLOW_SUCCESS, idx));

    }
}