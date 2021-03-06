const express = require('express');
const router = express.Router();
const profileControllers = require('../controllers/profileController')
const middleware = require('../modules/middlewares');
const upload = require('../modules/multer');

router.post('/register', middleware.userJwt, upload.single('profileImg'),  profileControllers.profileRegister);
router.put('/edit/:profileIdx', middleware.userJwt, upload.single('profileImg'), profileControllers.updateProfile);

//다른 고양이의 프로필
//(입맛이 비슷하다며 추천 받은 고양이든, 집사를 검색하여 찾아낸 고양이든) 한 고양이 프로필 선택 시 해당 고양이가 그동안 먹여본 캣푸드의 평점 목록(홈화면) 조회
router.get('/', profileControllers.diffProfile);
//다른 고양이의 리뷰 목록 조회
router.get('/review/:profileIdx', profileControllers.diffReviewAll)
router.post('/limitProfile', middleware.userJwt, profileControllers.limitProfile);

//프로필조회
router.get('/mainProfile/:profileIdx', middleware.userJwt, profileControllers.mainProfile);
router.get('/mainReviewAll/:profileIdx', middleware.userJwt, profileControllers.mainReviewAll);
//팔로우 리스트
router.get('/followingList/:profileIdx', profileControllers.followList);
router.get('/followerList/:profileIdx', profileControllers.followerList);
//프로필 전환
router.get('/conversion/:profileIdx', middleware.userJwt, profileControllers.conversionProfile);
//팔로우 신청
router.post('/requestFollow',profileControllers.requestFollow);
// 팔로우 취소
router.delete('/deleteFollow', profileControllers.deleteFollow);

module.exports = router;