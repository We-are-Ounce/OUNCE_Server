const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile');
//const AuthMiddleware = require('../middlewares/auth');

router.post('/register', ProfileController.register);
//router.get('/home', ProfileController.home);

module.exports = router;