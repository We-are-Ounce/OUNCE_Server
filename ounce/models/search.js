const pool = require('../modules/pool');


const search = {
    // 캣푸드 제조사 or 이름으로 검색 
    foodSearch : async(foodName, foodManu) => {    
        const query = `SELECT f.foodIdx, f.foodMeat, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('foodSearch ERROR');
            throw err;
        }
    },

    sortRating : async(foodName, foodManu) => {    
        const query = `SELECT f.foodIdx, f.foodMeat, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx ORDER BY avgRating`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('sort ERROR');
            throw err;
        }
    },

    sortPrefer : async(foodName, foodManu) => {    
        const query = `SELECT f.foodIdx, f.foodMeat, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx ORDER BY avgPrefer`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('sort ERROR');
            throw err;
        }
    },

    userSearch : async(userId) => {
        const query = `SELECT u.userIdx, u.id, p.profileIdx, p.profileImg, p.profileName, p.profileInfo FROM user u JOIN profile p ON u.userIdx = p.userIdx WHERE u.id Like "%${userId}%"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('ERROR USER SEARCH');
            throw err;
        } 
    },

    foodALl : async() => {
        const query = `SELECT * FROM food`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('FOODALL ERROR');
            throw err;
        }
    },

    reviewALL : async(foodIdx) => {
        const query = `SELECT p.profileIdx, p.profileName, p.profileInfo, p.profileAge, r.reviewIdx, r.reviewRating, r.reviewPrefer, f.foodIdx FROM profile p JOIN review r ON p.profileIdx = r.profileIdx JOIN food f ON f.foodIdx = r.foodIdx WHERE f.foodIdx = ${foodIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('REVIEWAll ERROR');
            throw err;
        }
    }


}

module.exports = search;