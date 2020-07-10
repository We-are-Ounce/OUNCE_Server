const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
//const AuthMiddleware = require('../middlewares/auth');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

/* 
    ✔️ update profile
    METHOD : POST
    URI : localhost:3000/user/profile
    REQUEST HEADER : JWT
    REQUEST BODY : ⭐️image file ⭐️
    RESPONSE DATA : user profile
*/
//router.post('/profile', AuthMiddleware.checkToken, UserController.updateProfile);

module.exports = router;
/*
// 2. 게시글 고유 id 값을 조회
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
    }
    const post = Post.filter(post => post.postIdx == id);
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    const result = Post.getPostById(id);
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, result));
    return;
})
*/