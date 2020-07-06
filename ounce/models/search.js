const pool = require('../modules/pool');


const search = {
    // 캣푸드 제조사 or 이름으로 검색 
    foodSearch : async(keyword) => {    
        const query = `SELECT f.foodIdx, f.foodImg, f.foodManu, f.foodName, count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewRating, r.reviewPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${keyword}%" or f.foodManu Like "%${keyword}%" GROUP BY f.foodIdx`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('foodSearch ERROR');
            throw err;
        }
    },

    userSearch : async(userId) => {
        const query = `SELECT u.userIdx, u.id, p.profileImg, p.profileName, p.profileInfo FROM user u JOIN profile p ON u.userIdx = p.userIdx WHERE u.id Like "%${userId}%"`;
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

    // 캣푸드 제조사 or 이름으로 검색 (자음이 들어왔을 떄 ) 
    foodConsonantSearch : async(foodName, foodManu) => {    
        const query = `SELECT f.foodIdx, f.foodImg, f.foodManu, f.foodName, count(f.foodIdx) as reviewCount, r.reviewIdx, r.reviewRating, r.reviewPrefer FROM food f JOIN review r WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('foodSearch Error');
            throw err;
        }
    },
    

}

module.exports = search;