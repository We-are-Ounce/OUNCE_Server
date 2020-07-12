const pool = require('../modules/pool');
const table = 'profile';

const profile = {
    diffProfile : async (profileIdx) => {
        const query = `SELECT profile.profileImg, profile.profileName, profile.profileGender, profile.profileNeutral, profile.profileAge, profile.profileWeight, profile.profileInfo, (SELECT count(follow.followingIdx) FROM follow WHERE follow.followingIdx="${profileIdx}") as follower, count(follow.myprofileIdx) as following FROM profile join follow
        on profile.profileIdx = follow.myProfileIdx WHERE follow.myProfileIdx="${profileIdx}"`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('diffProfile error: ', err);
            throw err;
        }
    },

    diffReviewAll : async (profileIdx) => {
        const query = `SELECT review.reviewIdx, food.foodIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}";` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('diffReviewAll error: ', err);
            throw err;
        }
    },
    //프로필 정보 등록(고양이 사진, 고양이 이름)

    profileRegister: async (profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx) => {
        const fields = 'profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err){
            if(err.errno == 1062){
                console.log('duplicate ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('profile register ERROR', err)
            throw err;
        }
    },

    //1-2 프로필 추가
    addProfile: async(userIdx)=>{
        const query = `SELECT count(userIdx) as count FROM ${table} WHERE userIdx = ${userIdx}`
        
        try {
            const result = await pool.queryParamArr(query);
            console.log("result[0]: "+result);
            console.log("result[0].count(userIdx): "+result[0].count);
            if(result[0].count >= 4){
                return false;
            }
            return true;
        } catch(err){
            if(err.errno == 1062){
                console.log('duplicate ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('add profile ERROR', err)
            throw err;
        }
    },
    //2. 프로필 수정
    profileUpdate : async (profileIdx, profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx) => {

        const fields = 'profileImg = ?, profileName = ?, profileWeight = ?, profileGender = ?, profileNeutral = ?, profileAge = ?, profileInfo = ?, userIdx = ?';
        const values = [profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx];
        const query = `UPDATE ${table} SET ${fields} WHERE profileIdx = ${profileIdx}`;
        try {
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch(err) {
            console.log("UPDATE PROFILE ERROR");
            throw err;
        }
    },
    isMyProfileIdx : async(profileIdx, userIdx) => {
        const query = `SELECT * FROM ${table} WHERE profileIdx = ${profileIdx} and userIdx = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } 
            return true;
        } catch(err) {
            throw err;
        }
    },

    getProfileByIdx: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx="${idx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getProfileByIdx ERROR : ', err);
            throw err;
        }
    },
    //3-1 프로필 조회(상단)
    mainProfile: async(profileIdx)=>{
        const query = `SELECT profile.profileImg, profile.profileName, profile.profileGender,  profile.profileNeutral, profile.profileWeight, profile.profileInfo, (SELECT count(follow.followingIdx) FROM follow WHERE follow.followingIdx = "${profileIdx}") as follower, count(follow.myProfileIdx) as following FROM profile join follow 
        on profile.profileIdx = follow.myProfileIdx WHERE profile.profileIdx = "${profileIdx}"`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch(err){
            console.log('mainProfile error : ', err);
            throw err;
        }
    },
     //3-2 프로필 조회(하단)
    mainReviewAll: async(profileIdx)=>{
        const query = `SELECT review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx = "${profileIdx}"`
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch(err){
            console.log("mainReviewAll error : ", err);
            throw err;
        }
    },

    conversionProfile : async(profileIdx) => {
        const query = `SELECT profileIdx, profileImg, profileName, profileInfo FROM profile WHERE profileIdx = ${profileIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('ERROR Conversion Profile');
            throw err;
        }},
    //4 팔로우 목록
    followList: async(profileIdx)=>{
        const query = `SELECT profile.profileIdx,profile.profileImg, profile.profileName, profile.profileGender, profile.profileNeutral, profile.profileAge, profile.profileWeight
        FROM profile 
        join follow
        on profile.profileIdx =follow.followingIdx  WHERE follow.myProfileIdx= "${profileIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log("followList error : ", err);
            throw err;
        }
    },
    //5. 팔로워 목록
    followerList: async(profileIdx)=>{
        const query = `SELECT profile.profileIdx,profile.profileImg, profile.profileName, profile.profileGender, profile.profileNeutral, profile.profileAge, profile.profileWeight
        FROM profile 
        join follow
        on profile.profileIdx = follow.myProfileIdx WHERE follow.followingIdx = "${profileIdx}"`
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log("followerList error : ", err);
            throw err;
        }
    },
    //5-2 팔로우 신청
    requestFollow: async(myprofileIdx, followingIdx) => {
        const fields = 'myprofileIdx, followingIdx';
        const questions = `?,?`;
        const values = [myprofileIdx,followingIdx];
        const query = `INSERT INTO follow(${fields}) VALUES(${questions})`;
        try{
            const result  = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err){
            console.log("request follow ERROR : ", err.errno, err.code);
            throw err;
        }
    },
    //5-3 팔로우 취소
    deleteFollow: async(myprofileIdx) =>{
        const query = `DELETE FROM follow WHERE follow.myprofileIdx = "${myprofileIdx}"`
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log("delete follow ERROR : ", err.errno, err.code);
            throw err;
        }
        
    }
}
module.exports=  profile;
