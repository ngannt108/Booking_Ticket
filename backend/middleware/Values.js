const { check, validationResult } = require('express-validator');
exports.validationMovie = [

    check('tenPhim')
        .notEmpty()
        .withMessage('Bạn chưa nhập tên phim'),
    // check('tenPhim')
    //     .exists()
    //     .withMessage('Phim đã tồn tại'),
    check('ngayKhoiChieu')
        .notEmpty()
        .withMessage('Nhập ngày chiếu của phim'),
    check('hinhAnh')
        .notEmpty()
        .withMessage('Vui lòng chọn hình ảnh cho phim')

]
exports.validationUser = [
    check('tenTaiKhoan')
        .notEmpty()
        .withMessage('Vui lòng nhập tên tài khoản'),
    check('matKhau')
        .notEmpty()
        .withMessage('Bạn chưa nhập mật khẩu'),
    check('email')
        .notEmpty()
        .withMessage('Vui lòng nhập gmail'),
    check('email')
        .isEmail()
        .withMessage('Vui lòng nhập đúng định dạng mail'),
    check('SDT')
        .isMobilePhone()
        .withMessage('Định dạng số điện thoại chưa phù hợp')

]
exports.validationSignIn = [
    check('taiKhoan')
        .notEmpty()
        .withMessage('Vui lòng nhập tên tài khoản'),
    check('matKhau')
        .notEmpty()
        .withMessage('Bạn chưa nhập mật khẩu'),


]
exports.validationSignUp = [
    check('tenTaiKhoan')
        .notEmpty()
        .withMessage('Vui lòng nhập tên tài khoản'),
    check('matKhau')
        .notEmpty()
        .withMessage('Bạn chưa nhập mật khẩu'),
    check('email')
        .notEmpty()
        .withMessage('Vui lòng nhập gmail'),
    check('email')
        .isEmail()
        .withMessage('Vui lòng nhập đúng định dạng mail'),

]
exports.isRequestValidated = (req, res, next) => {

    const errors = validationResult(req)
    if (errors.array().length > 0) {
        var err = []
        for (var i = 0; i < errors.array().length; i++) {
            err.push(' **')
            err.push(errors.array()[i].msg)
        }
        return res.status(400).json({ error: err })//errors.array()[0].msg })
    }
    next();
}