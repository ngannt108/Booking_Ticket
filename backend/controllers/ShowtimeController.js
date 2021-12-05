const Movie = require('../models/Movie');
const ShowTime = require('../models/Showtime');
const Room = require('../models/Room');
const Movietheater = require('../models/Movietheater');

class ShowTimeController {
    //THỬ
    //[GET] /movie/:bidanh/showtime   SỬA LẠI  SHOW LỊCH THEO TỪNG NGÀY TƯƠNG ỨNG
    getShowtime(req, res, next) {
        //     Movie.findOne({ biDanh: req.params.bidanh })
        //         .populate('lichChieu')
        //         .then((data) => {
        //             data.lichChieu.map((item) => {
        //                 const ngayChieu = item.ngayChieu.toLocaleString("en-AU")
        //                 const gioKetThuc = item.gioKetThuc.toLocaleString("en-AU")                   
        //             })
        //             res.status(200).json() //data.lichChieu[0].ngayChieu.toLocaleString("en-AU")
        //         })
        //         .catch(err => {
        //             err.statusCode = 400
        //             next(err)
        //         })
    }
    //[POST] /movie/:bidanh/showtime
    async add(req, res, next) {
        //req.body.ngayChieu = req.body.ngayChieu.toLocaleString("en-AU")
        // console.log(req.body.ngayChieu)

        let ngaychieu = new Date(req.body.ngayChieu)
        let showtime = new ShowTime({ ...req.body, gioKetThuc: new Date(req.body.ngayChieu) })
        // let ngaychieu = new Date(req.body.ngayChieu) //= new Date
        const movie = await Movie.findOne({ biDanh: req.params.bidanh })//

        // console.log('ngày chiếu từ form', req.body.ngayChieu)
        // console.log('ngày chiếu ', new Date(req.body.ngayChieu))
        if (movie) {
            const hour = ngaychieu.getHours() + (movie.thoiLuong / 60)  //
            const minute = ngaychieu.getMinutes() + (movie.thoiLuong % 60)//    
            showtime.gioKetThuc.setHours(hour)
            showtime.gioKetThuc.setMinutes(minute)
        }

        const dupShowtime = await ShowTime.findOne({ $and: [{ "ngayChieu": showtime.ngayChieu }, { "tenRap": showtime.tenRap }, { "tenCumRap": showtime.tenCumRap }] })
        if (dupShowtime) {
            res.status(400).json({ error: 'Không thể tạo lịch chiếu cho phim do rạp đang có lịch chiếu khác' })
            // const err = new Error('Không thể tạo lịch chiếu cho phim do rạp đang có lịch chiếu khác');
            // err.statusCode = 400
            // return next(err)
        }
        else {
            const newShowtime = await showtime.save()
            if (newShowtime) {
                const id = newShowtime._id
                console.log(id, 'id của lịch chiếu')
                const addShowtimeToMovie = await Movie.findOne({ biDanh: req.params.bidanh })
                const LichChieu = addShowtimeToMovie.lichChieu;
                addShowtimeToMovie.lichChieu = [...LichChieu, id];
                //  addShowtimeToMovie.soLuongBan = addShowtimeToMovie.soLuongBan + 1;
                const Sucessful = await addShowtimeToMovie.save()
                if (Sucessful) res.status(200).json("Tạo lịch chiếu thành công")
                else {
                    res.status(400).json({ error: 'Tạo lịch chiếu thất bại' })
                    // const err = new Error('Tạo lịch chiếu thất bại');
                    // err.statusCode = 400
                    // return next(err)
                }

            }
            else {
                res.status(400).json({ error: 'Không thể tạo lịch chiếu cho phim' })
                // const err = new Error('Không thể tạo lịch chiếu cho phim');
                // err.statusCode = 400
                // return next(err)
            }
        }



        //console.log(showtime.gioKetThuc.toLocaleString("en-AU"))

        // dateFormat(showtime.ngayChieu,"dddd s mmmm yyyy")
        // const gioKetThuc = req.body.ngayChieu//.getHours() + (req.body.thoiLuong / 60)        
        // console.log(showtime.ngayChieu.toLocaleString("en-AU"))
        // console.log(showtime.gioKetThuc.toLocaleString("en-AU"))
        //const id = showtime._id
        //console.log(showtime.ngayChieu)//


    }

    //[GET] 
    getAllChair(req, res, next) {
        Room.find({})
            .then((data) => {
                if (data)
                    res.status(200).json(data)
                else {
                    res.status(400).json({ error: 'Dữ liệu đang trục trặc' })
                    // const err = new Error('Dữ liệu đang trục trặc');
                    // err.statusCode = 400
                    // return next(err)
                }
            })
            .catch(err => {
                res.status(400).json({ error: 'Vui lòng thử lại' })
                // err = new Error('Vui lòng thử lại');
                // err.statusCode = 400
                // return next(err)

            })
    }
    //GET movie/movietheater
    getMovieTheater(req, res) {
        Movietheater.find()
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                }
                else res.status(404).json({ error: 'Không tìm thấy cụm rạp chiếu' })
            })
            .catch(err => res.status(500).json({ error: 'Hệ thống lỗi, vui lòng chờ' }))
    }

    //GET movie/room
    getRoom(req, res) {
        Room.find()
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data)
                }
                else res.status(404).json({ error: 'Không tìm thấy các rạp chiếu' })
            })
            .catch(err => res.status(500).json({ error: 'Hệ thống lỗi, vui lòng chờ' }))
    }


}
module.exports = new ShowTimeController;