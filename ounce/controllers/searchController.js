const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const searchKey = require('../models/search');
const Inko = require('inko');
const Hangul = require('hangul-js');
const ChosungSearch = require('hangul-chosung-search-js');

const search = {
    /** 
    * 제품명 검색
    * @summary 제품명, 제조사명 검색
    * @param 검색 키워드
    * @return 검색 결과
    */

    searchFood : async(req, res) => {
        let {keyword} = req.body;
        
        // 검색키워드가 영어인지 한글인지 구분하기 위해 정규식 사용
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        const inko = new Inko();

        // 검색키워드가 한글일 때 
        if (korean.test(keyword)) {
            // 한글을 제대로 쳤다면
            if (Hangul.isComplete(keyword)) {
                // 오타검증
                const errorKeyword = Hangul.a(Hangul.d(keyword));

                let result = await searchKey.foodSearch(errorKeyword, errorKeyword);
                
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, result));
                return;
            }

            // 입력한 글자가 자음일 때
            if (Hangul.isConsonant(keyword)) {
                // 오타검증 ex) ㅇㅏ or ㅁ => 이런 상황이 해당 if문에 들어옴
                const errorKeyword = Hangul.a(Hangul.d(keyword));
                const food = await searchKey.foodALl();
                foodData = [];
                
                for (i = 0; i < food.length; ++i) {
                    if (ChosungSearch.isSearch(errorKeyword, food[i].foodManu) || ChosungSearch.isSearch(errorKeyword, food[i].foodName)) {
                        const foodM = food[i].foodManu;
                        const foodN = food[i].foodName;             
                        const consonantKeyword = await searchKey.foodSearch(foodN, foodM); 
                        if (consonantKeyword.length != 0) foodData.push(consonantKeyword);
                    }
                }

                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, foodData));
                return;
            }


            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, {}));
            return;
        }

        // 검색키워드가 영어일 때

        const engKeyword = await searchKey.foodSearch(keyword, keyword);

        // 영어를 한글로 변환함 
        const korKeyword = inko.en2ko(keyword);

        // 영어단어가 들어있는 제조사명, 제품명이 존재하지 않을 때 
        if (engKeyword.length === 0) {
        
            // 한글을 제대로 쳤다면
            if (Hangul.isComplete(korKeyword)) {
                const EngKeyword = await searchKey.foodSearch(korKeyword, korKeyword);
        
                // 검색한 결과가 존재할 때 
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, EngKeyword));
                return;
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, {}));
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
    searchUser : async(req, res) => {
        const {userId} = req.body;

        // id를 넘겨주지 않을 때
        if (!userId) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        } 
        
        const result = await searchKey.userSearch(userId);

        if (result.length === 0) {
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_USER, result));
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

    reviewAll : async(req, res) => {
        const {foodIdx} = req.body;

        // foodIdx가 넘어오지 않았을 때
        if (!foodIdx) {
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }

        const result = await searchKey.reviewALL(foodIdx);

        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_REVIEW_DETAIL, result));
    },
}

module.exports = search;