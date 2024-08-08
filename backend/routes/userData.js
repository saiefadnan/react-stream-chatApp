const express = require('express');
const router = express.Router();
const {loginData, signinData, generateToken} = require('../controllers/userController');

router.post('/login', loginData);
router.post('/signin',signinData)
router.post('/token',generateToken);
module.exports = router;