const express = require('express');
const Auth = require('../middleware/Auth')
const { validationUser, isRequestValidated } = require('../middleware/Values');
const router = express.Router();

const accountController = require('../controllers/AccountController');
router.post('/signin', validationUser, isRequestValidated, accountController.signIn);
router.post('/signUp', validationUser, isRequestValidated, accountController.signUp);




module.exports = router;