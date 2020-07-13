const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const Profile = require('../models/profile');

module.exports = {
    //다른 고양이 계정 프로필 조회
    diffProfile : async(req, res) => {
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

    profileRegister: async(req, res) => {
        const userIdx = req.userIdx;
        const profileImg = req.file.location;
        const {
            profileName,
            profileWeight,
            profileGender,
            profileNeutral,
            profileAge,
            profileInfo,   
        } = req.body;

        if (profileImg === undefined|| !profileName || !profileWeight || !profileGender || !profileNeutral || !profileAge || !profileInfo){
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        
        const pIdx = await Profile.profileRegister(profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx);

        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.REGISTER_PROFILE,{
                profileIdx: pIdx
        }));
    },
    //2. 프로필 개수 제한
    limitProfile: async(req, res)=>{
        const userIdx = req.userIdx;
        const pIdx = await Profile.addProfile(userIdx);

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
        const profileImg = req.file.location;
        const {
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
        // 어디에 쓸지 userIdx
        const userIdx = req.userIdx;

        const idx = await Profile.mainProfile(profileIdx);

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, idx));
    }, 

    //4-2 프로필 조회(하단)
    mainReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.mainReviewAll(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {count:idx.length, result: idx}));
    },
    //5. 팔로우 목록 조회
    followList: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.followList(profileIdx);
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_FOLLOW_LIST_SUCCESS,{count:idx.length, result : idx}));
    },
    
    //5-2. 팔로워 목록 조회
    followerList: async(req, res)=>{
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.followerList(profileIdx);
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

    },

    conversionProfile : async(req, res) => {
        const profileIdx = req.params.profileIdx;
        
        const result = await Profile.conversionProfile(profileIdx);

        if (result.length === 0) {
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_PROFILE, result));
            return;
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_PROFILE_READ, result));
        
    }

}