const express = require('express');

const usersController = require('../controller/usersController');
const tokenverify = require('../middleware/checkToken');

const router = express.Router();

router.post('/register', usersController.createUser);

router.post('/login', usersController.login);

router.post('/profile', tokenverify.checkToken, usersController.profile);


module.exports = router;