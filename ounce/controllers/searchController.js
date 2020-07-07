const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const searchKey = require('../models/search');
const Inko = require('inko');
const Hangul = require('hangul-js');
const ChosungSearch = require('hangul-chosung-search-js');

const search = {
    searchFood : async(req, res) => {
        // 캣푸드 이름 검색 키워드
        var {keyword} = req.body;
  
        // 검색키워드가 영어인지 한글인지 구분하기 위해 정규식 사용
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        var inko = new Inko();

        // 검색키워드가 한글일 때 
        if (korean.test(keyword)) {
            // 한글을 제대로 쳤다면
            if (Hangul.isComplete(keyword)) {
                let result = await searchKey.foodSearch(keyword, keyword);
                
                // 검색한 결과가 존재할 때 
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, result));
                return;
            }
            // 한글에 오타가 있거나 완성된 단어가 아닐 때
            else {
                // 입력한 글자가 자음일 때
                if (Hangul.isConsonant(keyword)) {
                    const food = await searchKey.foodALl();
                    foodData = [];
                    for (i = 0; i < food.length; ++i) {
                        if (ChosungSearch.isSearch(keyword, food[i].foodManu) || ChosungSearch.isSearch(keyword, food[i].foodName)) {
                            const foodM = food[i].foodManu;
                            const foodN = food[i].foodName;             
                            const consonantKeyword = await searchKey.foodSearch(foodN, foodM); 
                            if (consonantKeyword.length != 0) foodData.push(consonantKeyword);
                        }
                    }

                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, foodData));
                    return;
                }

                else if (!Hangul.isConsonant(keyword)) {
                    // 모음일 때
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_SEARCH, {

                    }));

                    return;
                }
                // 오타일 때 
                else {
                    // 오타일 때 처리해주기
                    const errorKeyword = Hangul.a(Hangul.d(keyword));
                    const resultKeyword = await searchKey.foodSearch(keyword. keyword);

                    res.status(status.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, resultKeyword));
                    return;
                }
            }
        }

        // 검색키워드가 영어일 떄
        else {
            // 영어단어로 검색해서 존재하는지 테스트 먼저 해보기
            const engKeyword = await searchKey.foodSearch(keyword, keyword);
            // 영어를 한글로 변환함 
            const result = inko.en2ko(keyword);

            // 영어단어가 존재하지 않을 때 
            if (engKeyword.length === 0) {
            
                // 한글을 제대로 쳤다면
                if (Hangul.isComplete(result)) {
                    const EngKeyword = await searchKey.foodSearch(result, result);
            
                    // 검색한 결과가 존재할 때 
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, EngKeyword));
                    return;
                }
                // 한글을 제대로 치지 않았다면
                else {
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, {}));
                    return;
                }

                // 영어 단어가 이름 or 제조사로 존재할 때 (한글을 영어로 오타친게 아닐 경우)
            } else {
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, engKeyword));
                return;
            }
        }

    },

    // 유저검색
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

    // 리뷰 등록
    reviewAll : async(req, res) => {
        const foodIdx = req.params.foodIdx;
        console.log(foodIdx);

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