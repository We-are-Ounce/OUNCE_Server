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

    register: async (profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx) => {
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

    update : async (profileIdx, profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx) => {
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
    mainReviewAll: async(profileIdx)=>{
        const query = `SELECT review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx = "${profileIdx}"`
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch(err){
            console.log("mainReviewAll error : ", err);
            throw err;
        }
    }
    }
module.exports=  profile;
