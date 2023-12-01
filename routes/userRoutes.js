const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', userController.signup);

router.get('/List',userController.getUserList);

router.post('/signin', userController.signin);

router.get('/profile', authMiddleware.verifyToken, 
userController.getProfile);
router.put('/profile', authMiddleware.verifyToken, 
userController.editProfile);
router.delete('/profile', authMiddleware.verifyToken, 
userController.deleteProfile);


module.exports = router; 