const pool = require('../modules/pool');
const { value } = require('../config/database');
const table = 'profile';

const profile = {
    diffProfile : async (profileIdx) => {
        const query = `SELECT profile.profileImg, profile.profileName, profile.profileGender, profile.profileNeutral, profile.profileAge, profile.profileWeight, profile.profileInfo, (SELECT count(follow.followingIdx) FROM follow WHERE follow.followingIdx="${profileIdx}") as follower, count(follow.myprofileIdx) as following FROM profile join follow
        on profile.profileIdx = follow.myprofileIdx WHERE follow.myprofileIdx="${profileIdx}"`;
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
    }
    //사진, 이름, 성별, 나이, 몸무게, 소개, 총 리뷰개수, 팔로잉 수, 팔로워 수
/* getProfile : async(userIdx,profileImg,profileName , profileAge, profileWeight, reviewCount, following, follower )=>{
        const reviewCount = 'SELECT profileImg, profileName, profileAge, profileWeight COUNT (review.reviewIdx),COUNT (follow.profileIdx), COUNT(follow.followingIdx) FROM profile INNER JOIN  ';
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch (err){
            console.log('getProfile ERROR : ', err);
            throw err;
        }
    },*/

}
module.exports=  profile;
