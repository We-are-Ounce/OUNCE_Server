const pool = require('../modules/pool');


const search = {
    // 음식검색 
    foodSearch : async(keyword) => {
        const query = `SELECT * FROM food WHERE foodName Like "%${keyword}%"`;
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