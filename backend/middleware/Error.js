// class Error {
//     errorHandler(err, req, res, next) {
//        let statusCode = err.statusCode === 200 ? 500 : err.statusCode
//         if (err.code === 11000) {
//             //err.statusCode=400          
//             for (let key in err.keyValue) {
//                 err.message=`${key} đã bị trùng, vui lòng nhập lại`
//             }
//         }
// /

//         if (err.errors) {
//             //err.statusCode =400;
//             err.message = []
//             for (let error in err.errors) {
//                 err.message.push(err.errors[error].properties.message)
//             }

//         }
//         res.status(statusCode).json({   //err.statusCode
//             message: err.message,
//         })
//     }
// }
// module.exports = new Error;