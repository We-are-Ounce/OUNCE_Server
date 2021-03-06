const pool = require('../modules/pool');
const table = 'review';

const review = {
   reviewAdd: async(reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx, userIdx) => {
        const fields = 'reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx, userIdx';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, createdAt, foodIdx, profileIdx, userIdx];
        const query = `INSERT INTO review (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err) {
            throw err;
        }
    },
    sortByRating: async (profileIdx, pageStart, pageEnd) => {
        const query = `SELECT review.reviewIdx, review.profileIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.reviewRating desc LIMIT ${pageStart}, ${pageEnd};`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByRating error: ', err);
            throw err;
        }
    },
    sortByPrefer: async (profileIdx, pageStart, pageEnd) => {
        const query = `SELECT review.reviewIdx, review.profileIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.reviewPrefer desc LIMIT ${pageStart}, ${pageEnd};`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByPrefer error: ', err);
            throw err;
        }
    },
    sortByDate: async (profileIdx, pageStart, pageEnd) => {
        const query = `SELECT review.reviewIdx, review.profileIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM ${table} join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" order by review.createdAt desc LIMIT ${pageStart}, ${pageEnd};`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('sortByDate error: ', err);
            throw err;
        }
    },
    myReviewOne: async (reviewIdx) => {
        const query = `SELECT food.foodIdx, food.foodImg, food.foodManu, food.foodName, food.foodDry, food.foodMeat1, food.foodMeat2, review.createdAt, review.reviewRating, review.reviewPrefer, review.reviewInfo, review.reviewStatus, review.reviewSmell, review.reviewEye, review.reviewEar, review.reviewHair, review.reviewVomit, review.reviewMemo FROM review join food on review.foodIdx = food.foodIdx where reviewIdx="${reviewIdx}";`
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('myReviewOne error: ', err);
            throw err;
        }
    },
    myReviewAll: async (profileIdx, pageStart, pageEnd) => {
        const query = `SELECT review.reviewIdx, food.foodIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" LIMIT ${pageStart}, ${pageEnd};` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewAll error: ', err);
            throw err;
        }
    },
    myReviewManu: async (profileIdx) => {
        const query = `SELECT distinct food.foodManu FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}";` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewManu error: ', err);
            throw err;
        }
    },
    myReviewFilter: async (foodManu, foodDry, foodMeat, profileIdx) => {
        //query에서 foodMeat 가져오는 부분 합집합과 교집합 성공한거같아,,,
        const query = `SELECT review.reviewIdx, food.foodImg, food.foodManu, food.foodName, review.reviewInfo, review.reviewRating, review.reviewPrefer, review.createdAt FROM review join food on review.foodIdx = food.foodIdx where review.profileIdx="${profileIdx}" and ((food.foodManu IN (${foodManu})) and (food.foodDry IN (${foodDry})) and ((food.foodMeat1 IN (${foodMeat}) or (food.foodMeat2 IN (${foodMeat})))));` 
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log(' myReviewFilter error: ', err);
            throw err;
        }
    },
    checkReview: async (reviewIdx) => {
        const query = `SELECT * FROM ${table} where reviewIdx="${reviewIdx}"`;
        try {
            const result = await pool.queryParamArr(query);

            if (result.length > 0) {
                return true;
            }
            return false;
        } catch (err) {
            console.log('checkReview error: ', err);
            throw err;
        }
    },
    updateReview: async (reviewIdx, reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, foodIdx, profileIdx, userIdx) => {
        const fields = 'reviewRating = ?, reviewPrefer = ?, reviewInfo = ?, reviewMemo = ?, reviewStatus = ?, reviewSmell = ?, reviewEye = ?, reviewEar = ?, reviewHair = ?, reviewVomit = ?, foodIdx = ?, profileIdx = ?, userIdx = ?';
        const query = `UPDATE ${table} SET ${fields} WHERE reviewIdx="${reviewIdx}"`;
        const values = [reviewRating, reviewPrefer, reviewInfo, reviewMemo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, foodIdx, profileIdx, userIdx];
        try {
            const result = await pool.queryParamArr(query, values);
            return true;
        } catch (err) {
            console.log('updateReview error: ', err);
            throw err;
        }
    },
    deleteReview: async (reviewIdx) => {
        const query = `DELETE FROM ${table} where reviewIdx="${reviewIdx}"`;
    
        try {
            const result = await pool.queryParamArr(query);
            return true;

        } catch (err) {
            console.log('deleteReview error: ', err);
            throw err;
        }
    },
    checkMyReview: async (userIdx, reviewIdx, profileIdx) =>{
        const query = `SELECT * FROM ${table} WHERE userIdx ="${userIdx}" and reviewIdx = "${reviewIdx}" and profileIdx = ${profileIdx}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            }
            return true;
        } catch(err) {
            console.log('checkMyReview ERROR :'+ err);
            throw err;
        }
    },
    // 리뷰 추가 (프로필 하나당 제품 리뷰 하나씩 제한)
    addReview: async(profileIdx, foodIdx)=>{
        const query = `SELECT count(reviewIdx) as count FROM ${table} WHERE profileIdx = "${profileIdx}"and foodIdx = "${foodIdx}"`
        
        try {
            const result = await pool.queryParamArr(query);
            if (result[0].count >= 2) {
                return false;
            }
            return true;
        } catch(err) {
            if (err.errno == 1062) {
                console.log('duplicate ERROR : ', err.errno, err.code);
                throw err;
            }
            console.log('add profile ERROR', err)
            throw err;
        }
}
}

module.exports = review;

