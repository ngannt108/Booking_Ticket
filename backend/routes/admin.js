const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');
const showtimeController = require('../controllers/ShowtimeController');
const accountController = require('../controllers/AccountController');
const userController = require('../controllers/userController');
const { validationMovie, validationUser, isRequestValidated } = require('../middleware/Values');
const Auth = require('../middleware/Auth')
const multer = require("multer");
//const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });
//Movie
router.post('/upload', Auth.checkPermission, Auth.checkAdmin, upload.single('file'));
router.post('/movie', Auth.checkPermission, Auth.checkAdmin, validationMovie, isRequestValidated, movieController.adđ);

router.post('/movie/:bidanh/showtime', Auth.checkPermission, Auth.checkAdmin, validationMovie, isRequestValidated, showtimeController.add);
router.get('/movie/topShowtimes', Auth.checkPermission, Auth.checkAdmin, movieController.top20Showtimes);
router.get('/movie/topMovies', Auth.checkPermission, Auth.checkAdmin, movieController.top20Movies);
router.delete('/movie/:bidanh', Auth.checkPermission, Auth.checkAdmin, movieController.delete);
router.put('/movie/:bidanh', Auth.checkPermission, Auth.checkAdmin, validationMovie, isRequestValidated, movieController.edit);
//User
router.get('/user/search', Auth.checkPermission, Auth.checkAdmin, userController.find);
router.get('/user', Auth.checkPermission, Auth.checkAdmin, userController.getAllUser);






module.exports = router;