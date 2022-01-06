# Booking_Ticket
Để có thể chạy được ứng dụng, máy tính phải có các yêu cầu sau:
- Cài đặt npm.
- Cài đặt NodeJS phiên bản 14.
- Cài đặt ReactJS phiên bản 17.
- Có Windows Terminal hoặc Command Prompt.

Các bước để tiến hành cài đặt:

***Bước 1***: Clone hoặc download project từ link github ([Link github](https://github.com/ngannt108/Booking_Ticket))

***Bước 2***: Khởi chạy back-end.

Sau khi clone project về máy, mở command line (terminal) tại thư mục và thực hiện lệnh:

`cd backend`

Tạo file .env trong thư mục backend:

- Chuẩn bị các biến môi trường như sau: 

| Tên biến | Mô tả |
| --- | --- |
| EMAIL_ACCOUNT | Địa chỉ thực hiện việc gửi mail |
| EMAIL_PASSWORD | Mật khẩu của địa chỉ gửi mail |
| SEND_TO | Địa chỉ sẽ nhận mail |

Tiếp theo thực hiện các lệnh:

`npm install`

`npm start`

***Bước 3***: Khởi chạy front-end (admin và user)

Nếu bạn đang đứng trong thư mục ***Booking_Ticket\backend***, cần di chuyển về thư mục ***Booking_Ticket*** bằng cách thực hiện câu lệnh sau:

`cd ..`

Tiếp theo thực hiện các lệnh:

`npm install`

`npm start`


