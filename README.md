# 🦇 NightBat AI

NightBat AI is an AI-powered document analysis platform that helps users understand and interact with documents more efficiently. Users can upload PDF, DOCX, or TXT files to generate summaries, extract key points, create flashcards, take quizzes, and chat with the document through an intuitive interface.

The application is designed with a modern responsive UI, secure authentication, and a clean user experience suitable for both desktop and mobile devices.

---

# ✨ Features

### 📄 Document Upload
- Upload PDF, DOCX, and TXT files
- Drag & Drop support
- File validation
- Document history

### 🤖 AI Document Analysis
- Automatic document summarization
- Key point extraction
- Action item generation
- Well-structured AI responses

### 💬 AI Chat
- Chat with uploaded documents
- Context-aware conversations
- Chat history
- Clear conversation option

### 📚 AI Flashcards
- Automatically generated flashcards
- Previous/Next navigation
- Flip card animation
- Copy flashcard content

### 📝 AI Quiz
- AI-generated multiple-choice questions
- Question palette navigation
- Quiz timer
- Progress tracking
- Previous attempts
- Detailed quiz analysis
- Quiz history

### 📊 Quiz Analytics
- Score percentage
- Accuracy calculation
- Correct answers
- Wrong answers
- Skipped questions
- Time taken
- Performance badge

### 🎨 User Experience
- Fully responsive design
- Dark & Light mode
- Smooth animations
- Toast notifications
- Modern UI components
- Loading indicators

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Token Refresh

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Lucide React
- Context API

## Backend

- Python
- Django
- Django REST Framework (DRF)
- JWT Authentication
- Gunicorn
- WhiteNoise
- Django CORS Headers

## Database

- PostgreSQL

## Artificial Intelligence

- Google Gemini API

## Deployment

- Frontend : Vercel
- Backend : Render

---

# 📁 Project Structure

```text
NightBat/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── api/
│   ├── users/
│   ├── documents/
│   ├── chat/
│   ├── flashcards/
│   ├── quiz/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/sai-ganesh-mallavolu/nightbat.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Backend Setup

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Migrations

```bash
python manage.py migrate
```

Start Development Server

```bash
python manage.py runserver
```

---

# ⚙ Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables.

```env
SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_database_url

GEMINI_API_KEY=your_gemini_api_key

ACCESS_TOKEN_LIFETIME=...

REFRESH_TOKEN_LIFETIME=...
```

---

# 📸 Application Preview

The application includes the following pages:

- Home
- Login
- Register
- Upload Document
- Document Analysis
- AI Chat
- Flashcards
- Quiz
- Quiz Results
- History
- Previous Attempts



---

# 📈 Future Improvements

- Support for large PDF extraction (100+ page documents)
- OCR support for scanned PDF documents
- Voice interaction with documents
- Export flashcards as PDF
- AI-generated study plans
- Multi-language support
- Document comparison
- Advanced document search
- Collaboration and document sharing
- Analytics dashboard
- Personalized learning recommendations
- Cloud storage integration (Google Drive, OneDrive, Dropbox)
- Offline document access
- Email and notification support

---

# 💡 Learning Outcomes

This project helped strengthen practical experience with:

- Building full-stack web applications
- Designing REST APIs using Django REST Framework
- Implementing JWT authentication
- Working with PostgreSQL databases
- Integrating AI services into real-world applications
- Managing application state in React
- Building reusable React components
- Creating responsive user interfaces using Tailwind CSS
- Deploying frontend and backend applications

---

# 👨‍💻 Author

**Mallavolu Sai Ganesh**

     Email: <mailto:mallavolusaiganesh@gmail.com>

---
