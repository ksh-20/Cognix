# 🤖 Cognix – A personal AI Chatbot assistant

Cognix is a **full-stack AI-powered conversational chatbot** with secure authentication, persistent conversations, and a modern chat UI.  
It supports **multi-conversation chats, JWT-based authentication, and AI integration**.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- Password hashing using **bcrypt**
- JWT-based authentication & protected routes
- Secure user-specific data access

### 💬 AI Chat System
- Conversation-based chat
- Multiple conversations per user
- Persistent chats stored in MongoDB
- Messages saved and restored on page refresh
- AI-generated responses via Gemini API

### 🧭 Chat Management
- Create new chats automatically
- Rename chats (double-click to edit)
- Delete chats
- Sidebar with chat history

### 🎨 UI & UX
- Modern chat UI built with **React + Tailwind CSS**
- Dark mode integration
- Typing indicator animation
- Auto-scroll to latest message
- Responsive layout

---

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)
- Tailwind CSS
- React Router
- Context API (for Auth State Management)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)

### AI
- Google Gemini API

---

## 📁 Project Structure

``` bash
Cognix/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ └── chatController.js
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ └── Conversation.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ └── chatRoutes.js
│ │ ├── middlewares/
│ │ │ └── authMiddleware.js
│ │ ├── services/
│ │ │ └── aiService.js
│ │ ├── config/
│ │ │ └── db.js
│ │ └── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatWindow.tsx
│ │ │ ├── Message.tsx
│ │ │ ├── InputBox.tsx
│ │ │ ├── TypingIndicator.tsx
│ │ │ └── UserMenu.tsx
│ │ ├── pages/
│ │ │ ├── Login.tsx
│ │ │ └── Register.tsx
│ │ ├── services/
│ │ │ ├── authService.ts
│ │ │ └── chatService.ts
│ │ ├── context/
│ │ │ └── AuthContext.tsx
│ │ ├── routes/
│ │ │ └── ProtectedRoute.tsx
│ │ ├── index.css
│ │ ├── App.tsx
│ │ └── main.tsx
│
├── .gitignore
└── README.md

```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=5001
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

---

## ▶️ Running the Project Locally

### 1. Backend Setup
``` bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
``` bash
cd frontend
npm install
npm run dev
```

---

## 🔐 API Overview

### Auth Routes
``` bash
POST /api/auth/register
POST /api/auth/login
```

### Chat Routes(Protected)
``` bash
GET    /api/chats
GET    /api/chats/:id
POST   /api/chats/message
PUT    /api/chats/:id
DELETE /api/chats/:id
```

---

## 🧠 Key Learnings

1. Secure authentication using JWT & bcrypt
2. Proper separation of frontend and backend concerns
3. Conversation-based data modeling in MongoDB
4. Handling protected routes in React
5. State rehydration on page reload

---

## 📌 Future Enhancements

1. Auto load past message when chat is loaded
2. Token refresh & auto logout on expiry
3. Chat search functionality
4. AI model selection
5. Deployment

---

## 👨‍💻 Author

Kshitij S

---