const pool = require('../modules/pool');
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
    }
}

module.exports = profile;