const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth')
const showtimeController = require('../controllers/showtimeController');
const userController = require('../controllers/UserController');
const { validationUser, isRequestValidated } = require('../middleware/Values');
// router.post('/signin', userController.signIn);
// router.post('/signUp', userController.signUp);

router.get('/:bidanh/showtime/getchair', Auth.checkPermission, Auth.checkUser, showtimeController.getAllChair);
router.get('/:id/history', Auth.checkPermission, Auth.checkUser, userController.history); ///user/:id/editPassword
router.put('/:id/editPassword', Auth.checkPermission, Auth.checkUser, validationUser, isRequestValidated, userController.editPassword);
router.get('/:id', Auth.checkPermission, Auth.checkUser, userController.info);
router.put('/:id', Auth.checkPermission, Auth.checkUser, validationUser, isRequestValidated, userController.edit);




// router.get('/infor', userController.checkPermission, userController.checkUser, userController.infor);
// //router.get('/infor', userController.checkPermission,  userController.infor);//Kiểm tra quyền cách 2
// //phim
// router.get('/show', userController.show);
// router.get('/detail/:bidanh', userController.showOne);


module.exports = router;