# 💊 MedTracker Full-Stack App

A smart medicine inventory management system built with **Spring Boot** and **React**. This app helps track medicine stock, calculates daily dosages, and provides a "Suggested Order" list to ensure you never run out of essential prescriptions.

## 🚀 Features
* **Automatic Inventory Tracking:** Calculates "Days Remaining" based on current stock and daily dosage.
* **Smart Suggestions:** Automatically calculates how many strips to order for a 30-day supply.
* **Manual Override:** A "+1 Strip" button to log purchases even when not strictly required by the system.
* **Urgency Highlighting:** Rows turn red when stock levels drop below a 7-day supply.

---

## 🛠️ Tech Stack
* **Frontend:** React (Vite), Axios, CSS3
* **Backend:** Java 21+, Spring Boot 3.x, Spring Data JPA
* **Database:** H2 (File-based persistence)
* **Utilities:** Lombok, Maven

---

## ⚙️ Setup Instructions

### 1. Prerequisites
* **JDK 21** or higher
* **Node.js** (LTS version)
* **Maven** (included in wrapper)

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend

Run the Spring Boot application:


./mvnw spring-boot:run
The server will start on http://localhost:8080. The database will automatically seed with the initial 13 medicines.

3. Frontend Setup
Open a new terminal and navigate to the frontend folder:


cd frontend
Install dependencies:


npm install
Start the development server:

npm run dev
The UI will usually be available at http://localhost:5173 (or 5174)

Project Structure
   MedTracker-App/
├── backend/           # Spring Boot Project
│   ├── src/main/java  # Java Logic (Model, Service, Controller)
│   └── data/          # H2 Database storage file
└── frontend/          # React Project (Vite)
    ├── src/App.jsx    # Main Dashboard UI
    └── src/main.jsx   # React Entry point
