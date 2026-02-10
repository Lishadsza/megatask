# Student Profile Management System

A full-stack web application for managing and displaying student profiles with visual resumes and case studies.

## Tech Stack

**Frontend:** Next.js, Tailwind CSS  
**Backend:** Node.js, Express.js

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:3000`

## Features

- Profile grid with search and filtering
- Dynamic profile detail pages
- Case studies carousel
- Video resume integration
- Responsive design (mobile & desktop)
- RESTful API

## Project Structure

```
├── backend/
│   ├── data/profiles.js    # Profile data
│   └── server.js            # Express API
└── frontend/
    ├── components/          # Reusable components
    ├── pages/               # Next.js pages
    └── styles/              # Global styles
```

## API Endpoints

- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get profile by ID

## Deployment

Ready for Vercel deployment with included `vercel.json` configuration files.