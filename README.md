# Student Profile Management System

A modern, responsive web application for managing and showcasing student profiles with skills, case studies, and video resumes.

## 🚀 Live Demo

**Frontend:** https://megataskfrontendd.vercel.app  
**Backend API:** https://megataskbackend.vercel.app

## ✨ Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- 👤 Student profile cards with avatars and details
- 🎯 Detailed profile pages with skills and case studies
- 🎥 Video resume integration
- 📊 Case insights carousel
- 📧 Contact information and social links
- 🎨 Modern UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- Next.js
- React
- Tailwind CSS
- Vercel (Deployment)

**Backend:**
- Node.js
- Express
- CORS
- Vercel (Deployment)

## 📦 Installation

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

## 🌐 Environment Variables

**Frontend (.env.production):**
```
NEXT_PUBLIC_API_URL=https://megataskbackend.vercel.app
```

## 📁 Project Structure

```
megatask/
├── frontend/
│   ├── components/
│   │   ├── ProfileCard.js
│   │   ├── CaseInsightsSection.js
│   │   └── EmptyState.js
│   ├── pages/
│   │   ├── index.js
│   │   └── profile/[id].js
│   └── styles/
│       └── globals.css
├── backend/
│   ├── server.js
│   └── data/
│       └── profiles.js
└── README.md
```

## 👥 Student Profiles

The system includes 6 student profiles:
- Sarah John
- Saman S
- Sera Rodriguez
- David John
- Jessica N
- Deru Thompson

## 📄 License

MIT

## 👨‍💻 Author

NMIMS Bangalore - PRME & AACSB Accredited