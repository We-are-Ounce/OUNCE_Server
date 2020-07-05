const pool = require('../modules/pool');
const table = 'review';

const review = {
    sortByRating : async (profileIdx) => {
        const query = `SELECT  review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.reviewRating desc;`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByRating error: ', err);
            throw err;
        }
    },
    sortByPrefer : async (profileIdx) => {
        const query = `SELECT  review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.reviewPrefer desc;`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByPrefer error: ', err);
            throw err;
        }
    },
    sortByDate : async (profileIdx) => {
        const query = `SELECT  review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.createdAt desc;`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByDate error: ', err);
            throw err;
        }
    },
    myReviewOne : async (reviewIdx) => {
        const query = `SELECT * FROM ${table} where reviewIdx="${reviewIdx}";`
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('myReviewOne error: ', err);
            throw err;
        }
    },
    myReviewAll : async (profileIdx) => {
        const query = `SELECT review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}";` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewAll error: ', err);
            throw err;
        }
    },
    myReviewManu : async (profileIdx) => {
        const query = `SELECT review.reviewIdx, food.foodManu FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}";` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewManu error: ', err);
            throw err;
        }
    },
    myReviewFilter : async (foodManu, foodDry, foodMeat, profileIdx) => {
        //query에서 foodMeat 가져오는 부분 합집합과 교집합 성공한거같아,,,
        const query = `SELECT review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" and ((food.foodManu IN (${foodManu})) and (food.foodDry IN (${foodDry})) and ((food.foodMeat1 IN (${foodMeat}) or (food.foodMeat2 IN (${foodMeat})))));` 
        console.log(query);
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewFilter error: ', err);
            throw err;
        }
    }
}

module.exports = review;