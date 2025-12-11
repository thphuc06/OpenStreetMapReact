# Coffee Shop Finder

Ứng dụng web tìm kiếm quán cafe gần đây với bản đồ tương tác, định tuyến, dự báo thời tiết và chatbot tư vấn cafe.

## Tính năng chính

- Tìm kiếm quán cafe trên bản đồ (OpenStreetMap)
- Hiển thị tuyến đường và thời gian di chuyển
- Dự báo thời tiết (hiện tại, theo giờ, theo ngày)
- Dịch thuật English - Vietnamese
- Chatbot tư vấn chuyên gia cafe với AI
- Xác thực người dùng (Google, Email, Anonymous)
- Lưu lịch sử tìm kiếm

## Model AI & Phương pháp

### Model: Llama 3.2 1B Instruct
- **Nhà phát triển**: Meta AI
- **Kích thước**: 1B parameters
- **Loại**: Large Language Model (LLM) - Instruction-tuned
- **Đặc điểm**: Mô hình ngôn ngữ nhỏ gọn, tối ưu cho inference nhanh

### Phương pháp triển khai
1. **API Integration**: Sử dụng Hugging Face Inference API
2. **System Prompt Engineering**: Tùy chỉnh prompt để định hướng model trở thành chuyên gia cafe
3. **Context Management**: Duy trì lịch sử hội thoại để chatbot hiểu ngữ cảnh
4. **Temperature Setting**: 0.7 - Cân bằng giữa sáng tạo và nhất quán

### Kiến trúc hệ thống
```
Frontend (React + TypeScript)
    ↓ HTTP Request
Backend (Flask Python)
    ↓ API Call
Hugging Face Inference API
    ↓ Response
Llama 3.2 1B Model
```

### Cấu hình model
```python
model="meta-llama/Llama-3.2-1B-Instruct"
max_tokens=500
temperature=0.7
```

## Tech Stack

**Frontend**: React, TypeScript, Vite, Leaflet
**Backend**: Flask, Hugging Face API
**Database**: Firebase (Authentication + Firestore)
**Deployment**: Firebase Hosting + Railway
**APIs**: OpenStreetMap, OpenWeather, Google Translate

## Cài đặt

### Frontend

```bash
# Clone repository
git clone https://github.com/thphuc06/OpenStreetMapReact.git
cd OpenStreetMapReact

# Install frontend dependencies
npm install

# Run frontend
npm run dev
```

### Backend

```bash
# Navigate to backend folder
cd backend

# Create Python virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
# Copy .env.example and fill in your API key
cp .env.example .env

# Get your Hugging Face API key from: https://huggingface.co/settings/tokens
# Then edit .env file and replace 'your_huggingface_api_key_here' with your actual key
# Example: HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx

# Run backend
python app.py
```

## Cấu trúc project

```
OpenStreetMapReact/
├── src/                    # Frontend React
│   ├── components/         # UI Components
│   ├── services/          # API Services
│   └── firebaseConfig.ts  # Firebase config
├── backend/               # Backend Flask
│   ├── app.py            # Main API (Translation + Chatbot)
│   └── requirements.txt  # Python dependencies
├── .gitignore            # Git ignore rules
└── README.md
```

## Deployment

### Deploy Backend lên Railway

1. Tạo tài khoản tại [Railway.app](https://railway.app)
2. Tạo new project từ GitHub repository
3. **QUAN TRỌNG**: Thêm Environment Variables trong Railway Dashboard:
   - Key: `HUGGINGFACE_API_KEY`
   - Value: `your_actual_api_key_here`
4. Railway sẽ tự động deploy khi có commit mới

### Deploy Frontend lên Firebase

```bash
# Build frontend
npm run build

# Deploy to Firebase
firebase deploy
```

### Links

- **Production**: https://weather-f2f43.web.app
- **Backend API**: https://openstreetmapreact-production.up.railway.app
- **CI/CD**: GitHub Actions tự động deploy

## Tác giả

[thphuc06](https://github.com/thphuc06)
