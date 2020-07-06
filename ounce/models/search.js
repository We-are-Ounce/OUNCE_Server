const pool = require('../modules/pool');


const search = {
    // 캣푸드 제조사 or 이름으로 검색 
    foodSearch : async(keyword) => {
        const query = `SELECT foodImg, foodManu, foodName FROM food WHERE foodName Like "%${keyword}%" or foodManu Like "%${keyword}%" `;
        try {
            const result = await pool.queryParam(query);           
            return result;
        } catch (err) {
            console.log('foodSearch Error');
            throw err;
        }
    },

    userSearch : async(userId) => {
        const query = `SELECT u.userIdx, u.id, p.profileImg, p.profileName FROM user u JOIN profile p ON u.userIdx = p.userIdx WHERE u.id = "${userId}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('ERROR USER SEARCH');
            throw err;
        } 
    }    
}

module.exports = search;