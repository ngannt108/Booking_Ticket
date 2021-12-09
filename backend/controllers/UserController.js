
const User = require('../models/User');
const TicketBooking = require('../models/TicketBooking');
const bcrypt = require('bcrypt');

class UserController {
    // với re là reqiure và res là response


    //-----TỪ KHÚC NÀY TRỞ ĐI CHƯA GÁN route-----
    //[GET] /user/info/:id
    info(req, res, next) {
        User.find({ _id: req.params.id })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({ error: 'Không tìm thấy thông tin người dùng này' })
                // err = new Error('Không tìm thấy thông tin người dùng này');
                // // err = new Error('Hệ thống đang xử lý, hãy chờ giây lát');
                // err.statusCode = 404
                // return next(err)
            })
    }


    //[GET] /user/find/:tenTaiKhoan
    // async find(req, res, next) {
    //     const data = await User.find({ tentaiKhoan: req.params.tenTaiKhoan })
    //     if (data) res.status(200).json(data)
    //     else {
    //         const err = new Error('Hệ thống đang xủ lý, vui lòng đợi');
    //         err.statusCode = 500
    //         return next(err)
    //     }

    // }


    //[PUT] user/:id
    edit(req, res, next) {
        if (req.body.SDT && req.body.hoTen && req.body.email) {
            User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
                .then(() => {
                    res.status(200).json('Bạn đã chỉnh sửa được thông tin!')
                })
                .catch(err => {
                    //err = new Error('Chỉnh sửa thất bại, không tìm thấy người dùng');
                    err.statusCode = 404
                    return next(err)
                })

        } else {
            res.status(404).json({ error: 'Bạn vẫn còn thiếu thông tin' })
            // const err = new Error('Bạn vẫn còn thiếu thông tin');
            // err.statusCode = 404
            // return next(err)
        }
    }
    //[GET] user/logOut
    logOut(req, res) {
        if (localStorage.getItem('token')) {  //if (req.cookies.token)
            localStorage.setItem('token', '')
            // res.cookie('token', '', { maxAge: 1 });
            //res.json('Đã đăng xuất')
            //res.json(data)
        } else res.json('Bạn chưa đăng nhập!')
    }
    //[GET] user/search
    find(req, res, next) {
        let filter, query;
        if (req.query.name) {
            filter = req.query.name;
            query = { hoTen: filter }
        }

        else {
            filter = req.query.tentaiKhoan
            query = { tentaiKhoan: filter }
        }//PHẢI GHI ĐÚNG HỌ VÀ TÊN => CHƯA HIỆU QUẢ
        User.find(query)//{ "hoTen": name }
            .then((data) => {
                if (data.length == 0) {
                    const err = new Error('Không tìm thấy người dùng');
                    err.statusCode = 404
                    return next(err)
                }
                else {
                    res.status(200).json(data)
                }

            })
            .catch(err => {
                err.statusCode = 404
                return next(err)
            })
    }

    //[GET] user/:id/history
    history(req, res, next) {  //CHẠY ĐƯỢC, NHƯNG NẾU LẤY MỖI thời gian và thông tin lịch chiếu thì 'undetifined'
        TicketBooking.find({ 'tentaiKhoan': req.params.id })
            .populate('tentaiKhoan')
            .populate('maLichChieu')
            .then((data) => {
                console.log(data.maLichChieu)
                if (data)
                    res.status(200).json({ data: data.thoiGianDat, movie: data.maLichChieu })
                else {
                    res.status(404).json({ error: 'Vui lòng thử lại' })
                    // const err = new Error('Vui lòng thử lại');
                    // err.statusCode = 404
                    // return next(err)
                }
            })
            .catch(err => {
                //err = new Error('Chỉnh sửa thất bại, không tìm thấy người dùng');
                err.statusCode = 404
                return next(err)
            })
        // const userhistory = await ticket.find({ 'tentaiKhoan._id': req.params.id })
        // console.log('lịch sử', userhistory)
        // .then((data) => {
        //     console.log(data)
        //     if (data)
        //         res.status(200).json("Lịch sử bao gồm:", data)
        //     else {
        //         const err = new Error('Vui lòng thử lại');
        //         err.statusCode = 404
        //         return next(err)
        //     }
        // })
        // .catch(err => {
        //     //err = new Error('Chỉnh sửa thất bại, không tìm thấy người dùng');
        //     err.statusCode = 404
        //     return next(err)
        // })

    }


    // checkPermission(req, res, next) { //dùng try catch để bắt lỗi khi chưa đăng nhập/ chưa tìm thấy token (do checkPermission là xử lý đồng bộ)
    //     try {
    //         var token = req.cookies.token;
    //         var id = jwb.verify(token, 'user');
    //         // var objectToken = jwb.verify(token, 'user');
    //         // if(objectToken.maLoaiNguoiDung === '1') next();
    //         // else res.json('Không có quyền xem thông tin cá nhân của user');
    //         User.findOne({ _id: id })
    //             .then(data => {
    //                 if (data) {
    //                     req.data = data; //gán dữ liệu để những middleware sau có thể sử dụng req.data
    //                     next();
    //                 }
    //                 else res.json('Không có quyền truy cập');
    //             })
    //             .catch();
    //     } catch (err) { res.json('Lỗi token') };

    // }
    // checkUser(req, res, next) {
    //     if (req.data.maLoaiNguoiDung == '1')
    //         next();
    //     else res.json('Không có quyền xem thông tin cá nhân của user');
    // }


    // //Phim
    // show(req, res) {
    //     Phim.find({})
    //         .then(data => {
    //             if (data)
    //                 res.json(data)
    //             else res.json('chưa có dữ liệu')
    //         })
    //         .catch(err => res.json('Hệ thống đang lỗi, vui lòng chờ!'))

    // }

    // showOne(req, res) {
    //     Phim.findOne({ biDanh: req.params.bidanh })
    //         .then(data => {
    //             if (data)
    //                 res.json(data)
    //             else res.json('chưa có dữ liệu về phim')
    //         })
    //         .catch(err => res.json('Hệ thống đang lỗi, vui lòng chờ!'))

    // }
    //[GET] /admin/user
    getAllUser(req, res, next) {
        User.find({})
            .then(data => {
                //if (data === true)
                res.status(200).json(data)
                // else {
                //     const err = new Error('Không tìm thấy thông tin người dùng này');
                //     err.statusCode = 404
                //     return next(err)
                // }
            })
            .catch(err => {
                res.status(404).json({ error: 'Không tìm thấy thông tin người dùng' })
                // err = new Error('Không tìm thấy thông tin người dùng');
                // // err = new Error('Hệ thống đang xử lý, hãy chờ giây lát');
                // err.statusCode = 404
                // return next(err)
            })
    }

    //[PUT] /user/:id/editPassword
    editPassword(req, res, next) {
        //console.log(req.body)
        User.findById(req.params.id)
            .then(user => {
                console.log('người dùng', user)
                if (bcrypt.compareSync(req.body.matKhau, user.matKhau)) {
                    if (req.body.matKhauMoi === req.body.nhapLaiMatKhau) {
                        const hashPassword = bcrypt.hashSync(req.body.matKhauMoi, 10);
                        User.findByIdAndUpdate(req.params.id, { matKhau: hashPassword })
                            .then(res.status(200).json('Cập nhật thành công'))
                            .catch((err) => {
                                res.status(500).json({ error: 'Cập nhật thất bại' })
                                // err = new Error('Cập nhật thất bại');
                                // err.statusCode = 500
                                // return next(err)
                            })
                    }
                    else {
                        res.status(500).json({ error: 'Mật khẩu chưa đồng nhất' })
                        // const err = new Error('Mật khẩu chưa đồng nhất');
                        // err.statusCode = 500
                        // return next(err)
                    }
                }
                else {
                    res.status(500).json({ error: 'Mật khẩu chưa đúng' })
                    // const err = new Error('Mật khẩu chưa đúng');
                    // err.statusCode = 500
                    // return next(err)
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Vui lòng thử lại' })
                // err = new Error('Vui lòng thử lại');
                // // err = new Error('Hệ thống đang xử lý, hãy chờ giây lát');
                // err.statusCode = 500
                // return next(err)
            })


    }

}
module.exports = new UserController;