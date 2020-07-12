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
    },

    recommend : async(profileIdx) => {
        const query = `select foodIdx,profileIdx from review where profileIdx=${profileIdx} and reviewPrefer in (4,5);`;
        const query2 = `select foodIdx,profileIdx from review where profileIdx not in (${profileIdx}) and reviewPrefer in (4,5);`;
        const countMyReview = `select count(reviewIdx) as reviewCount from review where profileIdx=${profileIdx};`;
        try {
            const result = await pool.queryParam(query);
            const result2 = await pool.queryParam(query2);
            const resultCount = await pool.queryParam(countMyReview);
            var arrNumber = new Array();
            for (j=0; j<result2.length; j++){
                var count=0;
                for (i=0; i<result.length; i++){
                    if (result[i].foodIdx == result2[j].foodIdx){
                        count++;
                        arrNumber.push(result2[j].profileIdx);
                    }
                }
            }
            function Counter(array) {
                array.forEach(val => this[val] = (this[val] || 0) + 1);
            }
            arrResult = new Counter(arrNumber);
            // Create items array
        var items = Object.keys(arrResult).map(function(key) {
            return [key, arrResult[key]];
        });
        
        // [1]에 맞춰서 sort
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        items = items.slice(0,5);
        var returnProfileIdx = new Array();
        var similarity = new Array();
        var resultProfileIdx = "(";
        for (i=0; i<items.length; i++){
            returnProfileIdx.push(Number(items[i][0]))
        }
        for (i=0; i<items.length; i++){
            similarity.push(Math.ceil(Number(items[i][1]/resultCount[0].reviewCount)*100));
        }
        for (i=0; i<returnProfileIdx.length; i++){
            resultProfileIdx=resultProfileIdx+returnProfileIdx[i]+",";
        }
        resultProfileIdx = resultProfileIdx+"0)";
        nresultProfileIdx = resultProfileIdx.replace("(","").replace(",0)","")
        nresultProfileIdx = nresultProfileIdx.split(',')
        console.log(nresultProfileIdx)
        var one = nresultProfileIdx[0]
        var two = nresultProfileIdx[1]
        var three = nresultProfileIdx[2]
        var four = nresultProfileIdx[3]
        var five = nresultProfileIdx[4]
        console.log(one, two, three, four, five)
        const query3 = `select profileIdx, profileImg, profileName from profile where profileIdx in ${resultProfileIdx}`;
        const resultProfile = await pool.queryParam(query3);
        const query4 = `(
            select food.foodImg, review.profileIdx
            from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx=${one}
            order by review.profileIdx
            LIMIT 3
          )
          UNION ALL
          (
            select food.foodImg, review.profileIdx
            from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx=${two}
            order by review.profileIdx
            LIMIT 3
          )
          UNION ALL
          (
            select food.foodImg, review.profileIdx
            from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx=${three}
            order by review.profileIdx
            LIMIT 3
          )
          UNION ALL
          (
            select food.foodImg, review.profileIdx
            from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx=${four}
            order by review.profileIdx
            LIMIT 3
          )
          UNION ALL
          (
            select food.foodImg, review.profileIdx
            from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx=${five}
            order by review.profileIdx
            LIMIT 3
          )`
        const recommendFoodList = await pool.queryParam(query4);
        console.log(recommendFoodList)
        return {resultProfile, similarity, recommendFoodList};
        } catch(err) {
            console.log('recommend ERROR');
            throw err;
        }
    },

}

module.exports = search;