const pool = require('../modules/pool');


const search = {
    // 캣푸드 제조사 or 이름으로 검색 
    foodSearch: async(foodName, foodManu, pageStart, pageEnd) => {    
        const query = `SELECT f.foodIdx, f.foodMeat1, f.foodMeat2, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx Limit ${pageStart}, ${pageEnd}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('foodSearch ERROR');
            throw err;
        }
    },

    reviewSearch: async(profileIdx, foodName, foodManu, pageStart, pageEnd) => {
        const query = `SELECT distinct(food.foodIdx), food.foodImg, food.foodManu, food.foodName from food where (food.foodName Like '%${foodName}' or food.foodManu Like '%${foodManu}%') and food.foodIdx not in (SELECT food.foodIdx from food join review on food.foodIdx = review.foodIdx
            where review.profileIdx = ${profileIdx} order by food.foodIdx) LIMIT ${pageStart}, ${pageEnd}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('reviewSearch ERROR');
            throw err;
        }
    },

    sortRating: async(foodName, foodManu, pageStart, pageEnd) => { 
        const query = `SELECT f.foodIdx, f.foodMeat, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx ORDER BY avgRating DESC LIMIT ${pageStart}, ${pageEnd}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('sort ERROR');
            throw err;
        }
    },

    sortPrefer: async(foodName, foodManu, pageStart, pageEnd) => {    
        const query = `SELECT f.foodIdx, f.foodMeat, f.foodDry, f.foodImg, f.foodManu, f.foodName, f.foodLink,  count(r.reviewIdx) as reviewCount, r.reviewIdx, r.reviewInfo, round(avg(r.reviewRating), 1) as avgRating, round(avg(r.reviewPrefer), 1) as avgPrefer FROM food f LEFT JOIN review r ON f.foodIdx = r.foodIdx WHERE f.foodName Like "%${foodName}%" or f.foodManu Like "%${foodManu}%" GROUP BY f.foodIdx ORDER BY avgPrefer DESC LIMIT ${pageStart}, ${pageEnd}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('sort ERROR');
            throw err;
        }
    },

    userSearch: async(userId, pageStart, pageEnd) => {
        const query = `SELECT u.userIdx, u.id, p.profileIdx, p.profileImg, p.profileName, p.profileInfo FROM user u JOIN profile p ON u.userIdx = p.userIdx WHERE u.id Like "%${userId}%" LIMIT ${pageStart}, ${pageEnd}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('ERROR USER SEARCH');
            throw err;
        } 
    },

    foodALl: async() => {
        const query = `SELECT foodName FROM food`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('FOODALL ERROR');
            throw err;
        }
    },

    reviewALL: async(foodIdx) => {
        const query = `SELECT p.profileIdx, p.profileImg, p.profileName, p.profileInfo, p.profileAge, r.reviewIdx, r.reviewRating, r.reviewPrefer, f.foodIdx FROM profile p JOIN review r ON p.profileIdx = r.profileIdx JOIN food f ON f.foodIdx = r.foodIdx WHERE f.foodIdx = ${foodIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err) {
            console.log('REVIEWAll ERROR');
            throw err;
        }
    },

    recommend: async(profileIdx) => {
        const query = `select foodIdx,profileIdx from review where profileIdx=${profileIdx} and reviewPrefer in (4,5);`;
        const query2 = `select foodIdx,profileIdx from review where profileIdx not in (${profileIdx}) and reviewPrefer in (4,5);`;
        const countMyReview = `select count(reviewIdx) as reviewCount from review where profileIdx=${profileIdx};`;
        try {
            const result = await pool.queryParam(query);
            const result2 = await pool.queryParam(query2);
            const resultCount = await pool.queryParam(countMyReview);
            var arrNumber = new Array();
            for (j = 0; j < result2.length; j++){
                var count = 0;
                for (i = 0; i < result.length; i++){
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
        // 내 고양이 계정과 입맛이 유사한 profileIdx와 유사한 정도를 배열로 나타내기 위해 items 배열 생성 
        // python에서 Counter 형태로 해당 key에 대한 values의 갯수를 알려주는 dictionary 형태를 js 배열 형태로 바꿈
        var items = Object.keys(arrResult).map(function(key) {
            return [key, arrResult[key]];
        });
        
        // [1]에 맞춰서 sort
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        // 추천 리스트를 5개로 지정
        items = items.slice(0,5);

        var returnProfileIdx = new Array();
        var similarity = new Array();
        var resultProfileIdx = "(";
        for (i = 0; i < items.length; i++){
            returnProfileIdx.push(Number(items[i][0]))
        }
        for (i = 0; i < items.length; i++){
            similarity.push(Math.ceil(Number(items[i][1] / resultCount[0].reviewCount) * 100));
        }
        for (i = 0; i < returnProfileIdx.length; i++){
            resultProfileIdx = resultProfileIdx+returnProfileIdx[i] + ",";
        }
        resultProfileIdx = resultProfileIdx + "0)";
        nresultProfileIdx = resultProfileIdx.replace("(","").replace(",0)","")
        nresultProfileIdx = nresultProfileIdx.split(',')

        //배열에 아무것도 없을 때 0을 임시로 넣어뒀기 때문에 undefined를 모두 0으로 바꿔줌
        if (nresultProfileIdx == '0)'){
            var one = 0
            var two = 0
            var three = 0
            var four = 0
            var five = 0
        } else {
            one = nresultProfileIdx[0]
            two = nresultProfileIdx[1]
            three = nresultProfileIdx[2]
            four = nresultProfileIdx[3]
            five = nresultProfileIdx[4]
        }
        if (one == undefined){
            one = 0
        }
        if (two == undefined){
            two = 0
        }
        if (three == undefined){
            three = 0
        }
        if (four == undefined){
            four = 0
        }
        if (five == undefined){
            five = 0
        }
        //console.log(one, two, three, four, five)
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
        return {resultProfile, similarity, recommendFoodList};
        } catch(err) {
            console.log('recommend ERROR');
            throw err;
        }
    }
}

module.exports = search;