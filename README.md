# 💊 Med Tracker - Full Stack Medicine Inventory App

A full-stack application to track medicine inventory, manage orders, and get AI-powered assistance.

## 🚀 Features

- 📊 Real-time medicine stock tracking
- 📅 Automatic order date calculation (9-day buffer)
- ✏️ Editable stock and daily dose (click to edit)
- ➕ Add/Remove pending strips
- 🛒 Single-click order placement
- 🤖 AI-powered medicine assistant (Google Gemini)
- 🗑️ Add/Delete medicines

## 🛠️ Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- H2 Database
- Google Gemini AI API

**Frontend:**
- React 18
- Vite
- Axios

## 📦 Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Get FREE Google Gemini API Key
# Visit: https://makersuite.google.com/app/apikey
# Copy your API key

# Add API key to application.properties
# Replace YOUR_API_KEY_HERE with your actual key

# Run backend
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🤖 AI Assistant

Ask questions like:
- "Which medicines need to be ordered?"
- "How many days of MetXl 50 do I have left?"
- "What's my current inventory status?"
- "When should I order Nodosis?"

## 📝 API Endpoints

- `GET /api/medicines` - Get all medicines
- `POST /api/medicines` - Add new medicine
- `DELETE /api/medicines/{id}` - Delete medicine
- `POST /api/medicines/{id}/add-strips` - Add pending strips
- `POST /api/medicines/place-order` - Place order
- `PUT /api/medicines/{id}/stock` - Update stock
- `PUT /api/medicines/{id}/dose` - Update dose
- `POST /api/ai/ask` - Ask AI assistant

## 📄 License

MIT License
