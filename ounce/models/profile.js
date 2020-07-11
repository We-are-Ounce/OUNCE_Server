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
    register: async(profileImg, profileName, profileWeight, profileGender, profileNeutral, profileAge, profileInfo, userIdx) => {
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

    /* register2: async(profileWeight, profileGender)=>{
    getProfileByIdx: async (profileIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx="${idx}"`;
        try {
            return await pool.queryParam(query);
        } catch (err) {
            console.log('getProfileByIdx ERROR : ', err);
            throw err;
        }
    }*?
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
    },
/* followList: async(profileIdx)=>{
        const query = `SELECT profile.profileImg, profile.profileName, profile.profileWeight, profile.profileAge, profile.profileGender PROM profile LEFT JOIN follow ON profile.profileIdx= follow.followingIdx WHERE profile.profileIdx = "${profileIdx}"`;
        try{
            const result = await pool.queryParamArr(query);
            return result;
        } catch(err){
            console.log("followList error : ", err);
            throw err;
        }
    }*/
    editProfile: async(profileIdx, profileImg, profileName,  profileGender, profileNeutral, profileWeight, profileAge,profileInfo)=>{
        const fields = 'profileImg=?, profileName=?,profileWeight=?, profileGender=?, profileNeutral=?, profileAge=?, profileInfo=?';
        const query = `UPDATE ${table} SET ${fields} WHERE profileIdx=${profileIdx}`;
        const values = [profileImg, profileName,profileWeight, profileGender, profileNeutral,profileAge,profileInfo];
        console.log(profileIdx);
        try{
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch(err){
            console.log('edit profile error : ', err);
            throw err;
        }
    }
    /*getUserIdx: async(profileIdx)=>{
        const query = `SELECT userIdx FROM ${table} WHERE profileIdx = "${profileIdx}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length == 0){
                return false;
            }else return true;
        }catch(err){
            console.log("check my profile ERROR : ", err);
            throw err;
        }
        }*/
    }
module.exports=  profile;
