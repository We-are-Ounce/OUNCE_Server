const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            password,
            email
        } = req.body;
        if (!id || !password || !email) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await UserModel.checkUser(id)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        const idx = await UserModel.signup(id, hashed, salt, email);
        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }

        const user = await UserModel.getUserById(idx);

        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }

        const {
            token,
            refreshToken
        } = await jwt.sign(user[0]);

        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CREATED_USER, {
                accessToken: token
                //, refreshToken: refreshToken
            }));
            
    },
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(id);
        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
        }

        const {
            token,
            refreshToken
        } = await jwt.sign(user[0]);

        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
                accessToken: token
                //, refreshToken: refreshToken
            }));
    },
    /*updateProfile: async (req, res) => {
        //데이터 불러오기
        const userIdx = req.decoded.userIdx;
        const profileImg = req.file.location;
        // data check - undefined
        if(profileImg == undefined || !userIdx ){
            return res.status(CODE.OK).send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
        }
        //image type check
        const type = req.file.mimetype.split('/')[1];
        if(type !=='jpeg' && type !=='jpg' && type !=='png'){
            return res.status(CODE.OK).send(util.fail(CODE.OK, MSG.UNSUPPORTED_TYPE));
        }
        //call model - database
        const result = await UserModel.updateProfile(userIdx, profileImg);
        res.status(CODE.OK).send(util.fail(CODE.OK, MSG.UPDATE_PROFILE_SUCCESS, result));
    }*/
}