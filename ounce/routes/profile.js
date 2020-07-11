const express = require('express');
const router = express.Router();
const profileControllers = require('../controllers/profileController')
const middlewares = require('../modules/middlewares');
const upload = require('../modules/multer');
router.post('/register', middlewares.userJwt, upload.single('profile'),  profileControllers.register);
router.put('/edit/:profileIdx', middlewares.userJwt, profileControllers.updateProfile);
//router.get('/home', ProfileController.home);
//다른 고양이의 프로필
//(입맛이 비슷하다며 추천 받은 고양이든, 집사를 검색하여 찾아낸 고양이든) 한 고양이 프로필 선택 시 해당 고양이가 그동안 먹여본 캣푸드의 평점 목록(홈화면) 조회
router.get('/:profileIdx', profileControllers.diffProfile);

//다른 고양이의 리뷰 목록 조회
router.get('/review/:profileIdx', profileControllers.diffReviewAll);

module.exports = router;