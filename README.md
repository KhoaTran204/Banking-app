Hướng dẫn chạy dự án

Dự án gồm frontend và backend, vì vậy cần chạy ở 2 terminal khác nhau để cả hai phần hoạt động đồng thời.

1. Chạy Frontend

Mở terminal thứ nhất, di chuyển vào thư mục frontend và chạy lệnh:

npm run dev


Lệnh này sẽ khởi động giao diện người dùng (UI).
Sau khi chạy, terminal sẽ hiển thị địa chỉ để truy cập ứng dụng (thường là: http://localhost:5173 hoặc tương tự).

2. Chạy Backend

Mở terminal thứ hai, di chuyển vào thư mục backend và chạy lệnh:

nodemon


Lệnh này sẽ khởi động server backend (NodeJS + Express).
Công cụ nodemon giúp tự động chạy lại server mỗi khi bạn thay đổi mã nguồn.

Tóm tắt

Frontend và Backend là hai phần tách biệt.

Cần mở 2 terminal để chạy cùng lúc:

Terminal 1: npm run dev → chạy frontend

Terminal 2: nodemon → chạy backend

Sau đó bạn có thể truy cập ứng dụng bằng trình duyệt qua địa chỉ frontend.
