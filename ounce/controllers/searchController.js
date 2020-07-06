const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const searchKey = require('../models/search');
var Inko = require('inko');

const search = {
    searchFood : async(req, res) => {
        // 캣푸드 이름 검색 키워드
        var {keyword} = req.body;

        var inko = new Inko();

        // 검색어가 영어라면 if문 아래로 
        if ((keyword[0] < "AC00") || (keyword[0] > "D7A3")) {
            const beforeResult = await searchKey.foodSearch(keyword);
            if (beforeResult.length > 0) {
                res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SUCCESS_SEARCH, beforeResult));
                return;
            }
            // 만약 영어로 검색했는데 그게 오타인 이름 체크 => 영어를 한글로 변환해주는 라이브러리
            keyword = inko.en2ko(keyword);                
        }    
        
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