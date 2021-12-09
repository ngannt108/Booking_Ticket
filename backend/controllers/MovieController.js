const { NativeDate } = require("mongoose");
const Movie = require("../models/Movie");
const ShowTime = require("../models/Showtime");
const TicketBooking = require("../models/TicketBooking");

class MovieController {
  //[GET] /movie/:bidanh
  showDetail(req, res, next) {
    Movie.find({ biDanh: req.params.biDanh })
      .populate("lichChieu")
      .populate({
        path: "lichChieu",
        populate: { path: "tenCumRap" },
      })
      .populate({
        path: "lichChieu",
        populate: { path: "tenRap" },
      })
      .then((data) => {
        //console.log(data)
        if (data.length != 0) res.status(200).json(data);
        else {
          res.status(404).json("Không tìm thấy thông tin phim");
          // const err = new Error('Không tìm thấy thông tin phim');
          // err.statusCode = 404
          // return next(err)
        } //res.status(404).json('Không tìm thấy thông tin phim')
      })
      .catch((err) => {
        res.status(500).json("Không tìm thấy thông tin phim");
        // err = new Error('Hệ thống đang xử lý, vui lòng chờ');
        // err.statusCode = 500
        // return next(err)
      });
  }
  //[GET]
  show(req, res, next) {
    Movie.find({ daXoa: false })
      .then((data) => {
        console.log(data);
        if (data.length != 0) res.status(200).json(data);
        else {
          res.status(404).json("Chưa có phim nào");
          // const err = new Error('Chưa có phim nào');
          // err.statusCode = 404
          // return next(err)
        }
      })
      .catch((err) => {
        res.status(500).json("Hệ thống đang xử lý, vui lòng chờ");
        // err = new Error('Hệ thống đang xử lý, vui lòng chờ');
        // err.statusCode = 500
        // return next(err)
      });
  }
  //[PUT] /movie/edit/:bidanh
  edit(req, res, next) {
    Movie.findOneAndUpdate({ biDanh: req.params.bidanh }, req.body, {
      runValidator: true,
    })
      .then((data) => {
        if (data) {
          res.status(200).json("Cập nhật thành công");
        } else {
          res.status(404).json("Cập nhật thất bại");
          // const err = new Error('Cập nhật thất bại');
          // err.statusCode = 404
          // return next(err)
        }
      })
      .catch((err) => {
        res.status(500).json("Hệ thống đang xử lý, vui lòng chờ");
        // err = new Error('Hệ thống đang xử lý, vui lòng chờ');
        // err.statusCode = 500
        // return next(err)
      });
  }
  //[DELETE] /movie/delete/:bidanh
  async delete(req, res, next) {
    Movie.find({ biDanh: req.params.bidanh })
      .populate("lichChieu")
      .then((movie) => {
        console.log("phim", movie[0].lichChieu);
        var count = 0;
        movie[0].lichChieu.map((lichchieu) => {
          // console.log('lịch chiếu', lichchieu)
          const ngaychieu = new Date(lichchieu.ngayChieu);
          if (ngaychieu > Date.now()) {
            count++;
          }
        });
        console.log("Kiểm tra lịch chiếu chưa thỏa:", count);
        if (count == 0) {
          Movie.findOneAndUpdate({ biDanh: req.params.bidanh }, { daXoa: true })
            .then(() => res.status(200).json({ message: "Xóa thành công" }))
            .catch((err) => {
              res.status(500).json("Hệ thống đang xử lý, vui lòng chờ");
              // err = new Error('Hệ thống đang xử lý, vui lòng chờ');
              // err.statusCode = 500
              // return next(err)
            });
        } else res.status(400).json({ message: "Xóa không thành công" });
      });

    // Movie.findOneAndDelete({ biDanh: req.params.bidanh })
    //     .then(data => {
    //         if (data) {
    //             ShowTime.findOneAndDelete({ biDanh: req.params.bidanh })
    //                 .then(() => res.status(200).json('Xóa thành công'))
    //                 .catch(er => {
    //                     const err = new Error('Xóa thất bại');
    //                     err.statusCode = 404
    //                     return next(err)
    //                 })
    //             //CHƯA XÓA LỊCH CHIẾU LIÊN QUAN TỚI PHIM
    //         }
    //         else {
    //             const err = new Error('Không tìm thấy thông tin phim');
    //             err.statusCode = 404
    //             return next(err)
    //         }
    //     })
    //     .catch(err => {
    //         err = new Error('Hệ thống đang xử lý, vui lòng chờ');
    //         err.statusCode = 500
    //         return next(err)
    //     })
  }

  //[POST] /movie
  add(req, res, next) {
    const ngaykhoichieu = new Date(req.body.ngayKhoiChieu);
    const movie = new Movie(req.body);
    console.log("ngày chiếu", ngaykhoichieu);
    movie.ngayKhoiChieu = ngaykhoichieu; //.toISOString()
    movie
      .save()
      .then(() => res.status(200).json(movie))
      .catch((err) => {
        res.status(500).json({ message: "Thêm phim thất bại" });
        // err = new Error('Việc thêm phim thất bại');
        // err.statusCode = 404
        // return next(err)
      });
  }
  //[GET] topMoives
  top20Movies(req, res, next) {
    Movie.find({ soLuongBan: { $gt: 0 } })
      .sort({ soLuongBan: -1 })
      .limit(10)
      .then((data) => {
        if (data.length > 0)
          res
            .status(200)
            .json({
              message: "Top 20 phim được xem nhiều của rạp",
              top10: data,
            });
        else
          res
            .status(200)
            .json({
              message: "Top 20 phim được xem nhiều của rạp",
              top10: "Chưa có sách nào được bán",
            });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  }
  //[GET] topShowtimes
  //LẤY THỜI GIAN KHÁCH chọn CHIẾU -> lưu 1 mảng để thống kê số lần mua -> xếp hạng (CHƯA LÀM ĐƯỢC)
  async top20Showtimes(req, res, next) {
    const ticket = await TicketBooking.find({}).populate("maLichChieu");
    res.json(ticket);
    ticket.find({ "maLichChieu.ngayChieu": { $gt: "maLichChieu.ngayChieu" } });
  }
}
module.exports = new MovieController();
