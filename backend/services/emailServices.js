const nodemailer = require('nodemailer');
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
class emailService {
    async sendEmail(req, res) {
        const name = req.body.name
        const cinemaClusterName = req.body.cinemaClusterName
        const movieName = req.body.movieName
        const QRCode = req.body.QRCode
        const showtimeDate = req.body.showtimeDate
        const showtimeTime = req.body.showtimeTime
        //  const QR = req.params.QRCode
        console.log('QR', QRCode)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const url = nodemailer.getTestMessageUrl(QRCode)
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'CGV', // sender address
            to: process.env.SEND_TO, // list of receivers
            subject: 'Hello ✔', // Subject line
            //text: 'Hello world?', // plain text body
            html: `<p style='text-align: justify;'><span style='color: #b96ad9;'><strong>Xin ch&agrave;o ${name},</strong></span></p>
            <p style="text-align: justify;">CGV c&aacute;m ơn qu&yacute; kh&aacute;ch đ&atilde; thực hiện mua v&eacute;:</p>
            <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic; text-align: justify;">Phim ${movieName}&nbsp;chiếu v&agrave;o<span style="background-color: #ffffff;"> <strong>${showtimeDate}</strong></span> l&uacute;c <strong>${showtimeTime}&nbsp;</strong>tại rạp ${cinemaClusterName}.</p>
            <p><img src= {uri: ${QRCode}}/></p>
            <p>Tr&acirc;n trọng,<br />CGV team</p>`,
            //"<p><img  style='text-align: justify;' width='59' height='59' />Tr&acirc;n trọng,<br />CGV team</p>", // html body  data:image/png;base64,

        });

        if (info)
            res.status(200).json('Đã gửi email')
        else res.status(400).json('Gửi email thất bại')

    }
}
module.exports = new emailService();
