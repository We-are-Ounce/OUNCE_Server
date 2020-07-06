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
                let result = await searchKey.foodSearch(keyword);

                // 검색한 결과가 존재하지 않을 때
                if (result.length === 0) {
                    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_SEARCH, result));
                    return;
                }
                
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
                            const consonantKeyword = await searchKey.foodConsonantSearch(foodN, foodM); 
                            if (consonantKeyword.length != 0) foodData.push(consonantKeyword);
                        }
                    }

                    // 검색결과가 존재하지 않을 때
                    if (foodData.length === 0) {
                        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_SEARCH, foodData));
                        return;
                    }

                    // 
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
                    console.log(errorKeyword);
                    const resultKeyword = await searchKey.foodSearch(keyword);

                    // 검색한 결과가 존재하지 않을 때
                    if (result.length === 0) {
                        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_SEARCH, result));
                        return;
                    }


                    res.status(status.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, resultKeyword));
                    return;
                }
            }
        }

        // 검색키워드가 영어일 떄
        else {
            
        }
 
        const beforeResult = await searchKey.foodSearch(keyword);
        if (beforeResult.length > 0) {
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, beforeResult));
            return;
        }

        // 만약 영어로 검색했는데 그게 오타인 이름 체크 => 영어를 한글로 변환해주는 라이브러리
        keyword = inko.en2ko(keyword);
    
        
        const result = await searchKey.foodSearch(keyword);


        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, result));
    },

    reviewAdd : async(req, res) => {
        
    },

    // 유저검색
    searchUser : async(req, res) => {
        const {userId} = req.body;

        const result = await searchKey.userSearch(userId);

        if (result.length === 0) {
            res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.NO_USER, result));
            return;
        }
        
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_USER, result))
        
    }

}

module.exports = search;