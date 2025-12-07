Banking App – Hướng dẫn Cài đặt & Chạy Dự án

Dự án bao gồm hai phần hoạt động độc lập: Frontend và Backend.
Để hệ thống hoạt động đầy đủ, bạn cần khởi chạy hai terminal khác nhau.

🚀 1. Cài đặt & Chạy Frontend (Terminal 1)

Mở Terminal 1

Di chuyển vào thư mục frontend:

cd frontend


Cài đặt dependency:

npm install


Chạy frontend:

npm run dev


👉 Sau khi chạy, ứng dụng frontend sẽ hiển thị địa chỉ http://localhost:5173/

⚙️ 2. Cài đặt & Chạy Backend (Terminal 2)

Mở Terminal 2

Di chuyển vào thư mục backend:

cd backend


Cài đặt dependency:

npm install


Chạy server backend bằng nodemon:

nodemon


👉 Backend sẽ chạy trên port cấu hình http://localhost:8080/

🔗 3. Vì sao phải chạy bằng 2 terminal?

Frontend và Backend là hai ứng dụng độc lập:

Frontend hiển thị giao diện.

Backend xử lý API, database, xác thực,...

Hai phần này phải chạy song song, vì vậy cần mở 2 terminal.

🎯 4. Truy cập ứng dụng

Sau khi cả frontend và backend chạy thành công:

Mở trình duyệt

Truy cập frontend theo địa chỉ hiển thị (vd: http://localhost:5173)

Frontend sẽ tự động gọi API từ backend
