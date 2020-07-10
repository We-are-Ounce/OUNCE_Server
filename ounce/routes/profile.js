const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
//const AuthMiddleware = require('../middleware/auth');

router.post('/register/:userIdx', profileController.register);
//router.get('/:profileIdx',profileController.register);
//router.get('/home', ProfileController.home);

module.exports = router;