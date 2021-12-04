const Movie = require('../models/Movie');
const ShowTime = require('../models/Showtime');
const Room = require('../models/Room');

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
        let showtime = new ShowTime({ ...req.body, gioKetThuc: req.body.ngayChieu })
        let ngaychieu = new Date(req.body.ngayChieu) //= new Date
        console.log('ngày chiếu', req.body.ngayChieu)
        const hour = ngaychieu.getHours() + (showtime.thoiLuong / 60)
        const minute = ngaychieu.getMinutes() + (showtime.thoiLuong % 60)
        console.log(hour)
        showtime.gioKetThuc.setHours(hour)
        showtime.gioKetThuc.setMinutes(minute)

        //console.log(showtime.gioKetThuc.toLocaleString("en-AU"))

        // dateFormat(showtime.ngayChieu,"dddd s mmmm yyyy")
        // const gioKetThuc = req.body.ngayChieu//.getHours() + (req.body.thoiLuong / 60)        
        // console.log(showtime.ngayChieu.toLocaleString("en-AU"))
        // console.log(showtime.gioKetThuc.toLocaleString("en-AU"))
        const id = showtime._id
        //console.log(showtime.ngayChieu)//
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

}
module.exports = new ShowTimeController;