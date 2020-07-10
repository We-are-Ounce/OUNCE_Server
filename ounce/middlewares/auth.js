const jwt = require('../modules/jwt');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {

    checkToken: async (req, res, next) => {
        var token = req.headers.token;

        if (!token) {
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }
        const user = await jwt.verify(token);

        if (user === TOKEN_EXPIRED) {
            return res.status(statusCode.UNAUTHORIZED)
                .send(util.fail(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
        }
        if (user === TOKEN_INVALID) {
            return res.status(statusCode.UNAUTHORIZED)
                .send(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }
        if (user.idx === undefined) {
            return res.status(statusCode.UNAUTHORIZED)
                .send(util.fail(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
        }

        req.decoded = user;
        next();
    }
}
module.exports = authUtil;