const pool = require('../modules/pool');
const table = 'profile';

const profile = {
    //프로필 정보 등록(고양이 사진, 고양이 이름)
    register: async(profileImg, profileName)=>{
        const fields = 'profileImg, profileName';
        const questions = `?,?`;
        const values = [profileImg, profileName];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insetId;
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