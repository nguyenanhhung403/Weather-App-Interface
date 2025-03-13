# Weather Forecast App

## 🌤 Giới thiệu
Weather Forecast App là một ứng dụng web giúp người dùng tra cứu thời tiết hiện tại và dự báo 5 ngày tiếp theo của bất kỳ thành phố nào trên thế giới.

## 🚀 Công nghệ sử dụng
- **Frontend:** ReactJS + Vite
- **CSS Framework:** TailwindCSS
- **API:** [WeatherAPI](https://www.weatherapi.com/)

## 📦 Cài đặt và chạy dự án
### 1️⃣ Clone repository
```sh
git clone https://github.com/your-username/weather-forecast.git
cd weather-forecast
```

### 2️⃣ Cài đặt dependencies
```sh
npm install
```

### 3️⃣ Cấu hình API Key (Ẩn API Key)
**⚠️ Không để lộ API Key trên GitHub!**

Tạo file `.env` trong thư mục gốc và thêm:
```sh
VITE_WEATHER_API_KEY=your_api_key_here
```
Sau đó, trong mã nguồn sử dụng:
```js
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
```

Thêm `.env` vào `.gitignore` để tránh bị push lên GitHub:
```sh
echo "\.env" >> .gitignore
```

### 4️⃣ Chạy ứng dụng
```sh
npm run dev
```
Mở trình duyệt tại `http://localhost:5173`.

## 🔥 Tính năng chính
✅ Tìm kiếm thời tiết theo thành phố.
✅ Xem nhiệt độ hiện tại, điều kiện thời tiết.
✅ Xem dự báo thời tiết 5 ngày tiếp theo.
✅ Giao diện đẹp, sử dụng TailwindCSS.


## 📜 Giấy phép
Dự án này được phát hành dưới giấy phép MIT. Bạn có thể tự do sử dụng, sửa đổi và chia sẻ.

---
💡 **Contributions** luôn được chào đón! Nếu bạn muốn đóng góp, hãy tạo một pull request hoặc mở một issue.

🚀 **Happy coding!**

