const pool = require('../modules/pool');


const reviewInfo = {
    reviewAdd : async(reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo, createdAt, foodIdx, profileIdx) => {
        const fields = 'reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo, createdAt, foodIdx, profileIdx';
        const questions = `?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
        const values = [reviewRating, reviewPrefer, reviewInfo, reviewStatus, reviewSmell, reviewEye, reviewEar, reviewHair, reviewVomit, reviewMemo, createdAt, foodIdx, profileIdx];
        const query = `INSERT INTO food (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = reviewInfo;