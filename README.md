# 🚀 Paper Rex - AI-Powered Portfolio Builder

![Paper Rex Portfolio Builder](https://paper-rex.netlify.app/favicon.ico) <!-- Replace with actual banner if available -->

Welcome to **Paper Rex**, a next-generation AI-powered portfolio builder. Paper Rex allows users to upload their resume, automatically extract and intelligently categorize their professional data using Google's Gemini AI, and instantly deploy stunning, interactive web portfolios.

**🔗 Live Demo:** [https://paper-rex.netlify.app/](https://paper-rex.netlify.app/)

---

## ✨ Key Features

- **📄 AI Resume Extraction:** Upload a PDF resume and let Gemini AI automatically parse your experience, education, projects, and certifications into structured JSON.
- **🧠 Smart Skill Categorization:** The AI acts as a technical recruiter, dynamically grouping a flat list of skills into beautifully named categories (e.g., "Frontend Ecosystem", "Cloud & Orchestration").
- **✨ AI Summary Enhancement:** Generate a powerful, concise professional summary based entirely on your extracted profile data with a single click.
- **🎨 6 Stunning Templates:** 
  - *Minimalist* (Clean, executive layout)
  - *Modern Tech* (Sleek, tech-focused)
  - *Midnight Developer* (Terminal/Code Editor aesthetic)
  - *Data Driven* (Dashboard-style layout)
  - *Neon Creative* (Brutalist, high-contrast)
  - *ATS Classic* (Traditional, printable)
- **💬 "Ask AI" Chatbot:** Every deployed portfolio includes a floating "Ask AI" widget. Visitors can chat with an AI assistant that knows everything about your resume and answers questions intelligently on your behalf.
- **🚀 One-Click Netlify Deployment:** Directly deploy your finished portfolio to the live internet straight from the Editor UI.
- **🔐 Secure Authentication:** Seamless Google OAuth and JWT-based email/password authentication.
- **☁️ Serverless Ready:** Handles image uploads via Base64 encoding to bypass serverless read-only filesystem limits (fully optimized for Vercel).

---

## 🏗️ Architecture & Tech Stack

**Frontend (Client)**
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + custom CSS logic for themes
- **Icons & UI:** Lucide React, Material Symbols
- **Routing:** React Router v6
- **Hosting:** Netlify

**Backend (API)**
- **Framework:** Node.js + Express
- **Database:** MySQL (via `mysql2/promise`)
- **AI Integration:** Google Generative AI (`gemini-3.5-flash-lite`)
- **Authentication:** JSON Web Tokens (JWT) & Google Auth Library
- **PDF Parsing:** `pdf-parse` for extracting text from uploaded resumes
- **Hosting:** Vercel

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://www.mysql.com/) Server running locally or remotely

### 2. Clone the Repository
\`\`\`bash
git clone https://github.com/M0NSTER01/Paper-Rex.git
cd Paper-Rex
\`\`\`

### 3. Environment Variables
You will need to set up environment variables for both the frontend and backend. See the provided \`.env.example\` file in the root directory for a full list of required keys.
1. Create \`frontend/.env\`
2. Create \`backend/.env\`

### 4. Database Setup
1. Create a MySQL database (e.g., \`paper_rex_db\`).
2. Run the initial schema. If you have the provided \`Dump*.sql\` file, import it:
   \`\`\`bash
   mysql -u root -p paper_rex_db < Dump20260830.sql
   \`\`\`

### 5. Install Dependencies & Run

**Start the Backend:**
\`\`\`bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
\`\`\`

**Start the Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
\`\`\`

---

## 🚀 Deployment Guide

### Deploying the Backend to Vercel
1. Install the Vercel CLI or connect your GitHub repo to the Vercel dashboard.
2. Set the build command to `npm install` and output directory to `./` (or leave default for Node.js).
3. Add all the backend environment variables (`DB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.) in the Vercel dashboard.
4. Deploy! Note your Vercel URL (e.g., `https://paper-rex-api.vercel.app`).

### Deploying the Frontend to Netlify
1. Connect your GitHub repo to Netlify.
2. Set the Build Command to `npm run build` and the Publish Directory to `dist`.
3. Add `VITE_BACKEND_URL` (pointing to your Vercel URL, **no trailing slash**) and `VITE_GOOGLE_CLIENT_ID` in the Netlify environment variables.
4. Deploy!

### ⚠️ Important Note on CORS and Google Auth
- **Google OAuth:** Ensure your exact Netlify frontend URL (e.g., `https://paper-rex.netlify.app`) is added to the **Authorized JavaScript origins** in your Google Cloud Console.
- **Netlify Deployments:** Ensure `VITE_BACKEND_URL` does *not* end with a trailing slash to prevent CORS preflight redirect issues on Vercel.

---

## 📝 License
This project is proprietary and built for demonstration purposes. Feel free to explore the code!
