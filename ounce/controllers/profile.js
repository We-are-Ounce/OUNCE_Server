const ProfileModel = require('../models/profile');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');


module.exports = {
    register: async(req, res)=>{
        const{
            profileImg,
            profileName
        } = req.body;
        const userIdx = req.params.userIdx;ex
        if(!profileImg|| !profileName  ){
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        if( profileIdx ===-1){
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.REGISTER_PROFILE,{
            profileIdx: profileIdx,
            profileImg: profileImg,
            profileName: profileName
            }));
    }    

}