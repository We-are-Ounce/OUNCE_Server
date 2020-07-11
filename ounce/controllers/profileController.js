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

        console.log(profileImg,profileName,
            profileWeight,
            profileGender,
            profileNeutral,
            profileAge,
            profileInfo,   )
        if (profileImg===undefined|| !profileName || !profileWeight || !profileGender || !profileNeutral || !profileAge || !profileInfo){
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

        
        const isMyProfileIdx = await Profile.isMyProfileIdx(profileIdx, userIdx);

        if (!isMyProfileIdx) {
            return await res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.PERMISSION_DENIED_UPDATE_PROFILE));
        }

        const result = await Profile.ProfileUpdate(profileIdx, profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_UPDATE_PROFILE, {
            profileIdx : isMyProfileIdx
        }))

    },

    mainProfile: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        // 어디에 쓸지 userIdx
        const userIdx = req.userIdx;

        const idx = await Profile.mainProfile(profileIdx);

        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, idx));
    },

    mainReviewAll: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.mainReviewAll(profileIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_PROFILE_SUCCESS, {count:idx.length, result: idx}));
    },

    followList: async(req, res) => {
        const profileIdx = req.params.profileIdx;
        const idx = await Profile.followList(profileIdx);
        return res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.READ_FOLLOW_LIST_SUCCESS,{count:idx.length, result : idx}));
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