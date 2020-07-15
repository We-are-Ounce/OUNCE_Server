const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const searchKey = require('../models/search');
const Hangul = require('hangul-js');
const ChosungSearch = require('hangul-chosung-search-js');
const checkKeyword = require('../modules/checkKeyword');

const search = {
    /** 
    * 제품명 검색
    * @summary 제품명, 제조사명 검색
    * @param 검색 키워드
    * @return 검색 결과
    */

    searchFood: async(req, res) => {
        let {searchKeyword, pageStart, pageEnd} = req.body;
        console.log(searchKeyword);
        console.log(pageStart)
        console.log(pageEnd)

        if (!searchKeyword || !pageStart || !pageEnd) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        if (await checkKeyword.checkWord(searchKeyword)) {
            let result = await searchKey.foodSearch(searchKeyword, searchKeyword, pageStart, pageEnd);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, result));
            return;
        }
        
        // 검색키워드가 영어일 때
        const engKeyword = await searchKey.foodSearch(searchKeyword, searchKeyword, pageStart, pageEnd);
        const korKeyword = await checkKeyword.changeKeyword(searchKeyword);

        // 영어단어가 존재하지 않을 때 
        if (engKeyword.length === 0) {       
            const result = await searchKey.foodSearch(korKeyword, korKeyword, pageStart, pageEnd);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, result));
            return;
        } 

        // 제품명, 제조사명에 영어가 들어있을 때
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, engKeyword));
        return;

    },

    /** 
    * 유저검색
    * @summary 유저검색
    * @param 유저아이디
    * @return 유저의 고양이 프로필
    */
    searchUser: async(req, res) => {
        const {userId, pageStart, pageEnd} = req.body;

        // id를 넘겨주지 않을 때
        if (!userId || !pageStart || !pageEnd) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        } 
        
        const result = await searchKey.userSearch(userId, pageStart, pageEnd);

        if (result.length === 0) {
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_USER_PROFILE, result));
            return;
        }
        
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_USER, result))   
    },

    /** 
    * 제품 리뷰 전체보기
    * @summary 제품 검색 후 리뷰 전체보기
    * @param 캣푸드 인덱스
    * @return 캣 푸드 리뷰 전체
    */

    reviewAll: async(req, res) => {
        const {foodIdx} = req.body;

        // foodIdx가 넘어오지 않았을 때
        if (!foodIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await searchKey.reviewALL(foodIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_REVIEW_DETAIL, result));
    },

    /** 
    * 리뷰 평점 순으로 정렬
    * @summary 리뷰 평점 순으로 정렬
    * @param 캣푸드 인덱스
    * @return 캣 푸드에 등록된 리뷰 전체
    */

    reviewSortRating: async(req, res) => {
        const {searchKeyword, pageStart, pageEnd} = req.body;

        if (!searchKeyword || !pageStart || !pageEnd) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        if (await checkKeyword.checkWord(searchKeyword)) {
            const result = await searchKey.sortRating(searchKeyword, searchKeyword, pageStart, pageEnd);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH_RATING, result));
            return;
        }

        const korKeyword = await checkKeyword.changeKeyword(searchKeyword);
        const result = await searchKey.sortRating(korKeyword, korKeyword, pageStart, pageEnd);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH_RATING, result)); 
    },

    /** 
    * 리뷰 선호도 순으로 정렬
    * @summary 리뷰 선호도 순으로 정렬
    * @param 캣푸드 인덱스
    * @return 캣 푸드에 등록된 리뷰 전체
    */

    reviewSortPrefer: async(req, res) => {
        const {searchKeyword, pageStart, pageEnd} = req.body;

        if (!searchKeyword || !pageStart || !pageEnd) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        if (await checkKeyword.checkWord(searchKeyword)) {
            const result = await searchKey.sortPrefer(searchKeyword, searchKeyword,  pageStart, pageEnd);
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH_PREFER, result));
            return;
        }

        const korKeyword = await checkKeyword.changeKeyword(searchKeyword);

        const result = await searchKey.sortPrefer(korKeyword, korKeyword, pageStart, pageEnd);          
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH_PREFER, result));
    },
    
    recommend: async(req, res) => {
        const {profileIdx} = req.body;
        const idx = await searchKey.recommend(profileIdx);
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_RECOMMEND_SUCCESS, idx));
    }

}

module.exports = search;