const pool = require('../modules/pool');

const review = {
    reviewDetail : async(foodIdx) => {
        const query = `SELECT p.profileIdx, p.profileName, p.profileInfo, p.profileAge, r.reviewIdx, r.reviewRating, r.reviewPrefer, f.foodIdx FROM profile p JOIN review r ON p.profileIdx = r.profileIdx JOIN food f ON f.foodIdx = r.foodIdx WHERE f.foodIdx = ${foodIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('REVIEW DETAIL ERROR');
            throw err;
        }
    }
}

module.exports = review;