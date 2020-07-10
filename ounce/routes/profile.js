const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const profileController = require('../controllers/profile');
//const AuthMiddleware = require('../middleware/auth');

router.post('/register/:userIdx', profileController.register);
//router.get('/:profileIdx',profileController.register);
=======
const ProfileController = require('../controllers/profile');
const profileControllers = require('../controllers/profileController')
//const AuthMiddleware = require('../middlewares/auth');
const middlewares = require('../modules/middlewares');
router.post('/register', middlewares.userJwt, ProfileController.register);
>>>>>>> a1cce9c3488ea0a112d9ffa1d2bbf21248fbc2ef
//router.get('/home', ProfileController.home);
//다른 고양이의 프로필
//(입맛이 비슷하다며 추천 받은 고양이든, 집사를 검색하여 찾아낸 고양이든) 한 고양이 프로필 선택 시 해당 고양이가 그동안 먹여본 캣푸드의 평점 목록(홈화면) 조회
router.get('/:profileIdx', profileControllers.diffProfile);

//다른 고양이의 리뷰 목록 조회
router.get('/review/:profileIdx', profileControllers.diffReviewAll);
module.exports = router;