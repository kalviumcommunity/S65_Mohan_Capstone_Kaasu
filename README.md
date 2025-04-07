# Kaasu - AI-Powered Family Financial Advisor & Planner

[Backend Deployment Link](https://s65-mohan-capstone-kaasu.onrender.com)

## Problem Statement  
Managing finances is a challenge for both individuals and families. Many people struggle with tracking expenses, setting budgets, and managing shared family finances. Existing solutions often:  

- Require manual data entry, making them time-consuming and prone to errors.  
- Lack AI-powered insights, preventing users from understanding their spending habits.  
- Do not offer real-time collaboration, making family finance tracking difficult.  
- Pose security risks by requiring direct bank connections.  

### This project aims to solve these problems by:  
- Automating transaction analysis using AI from uploaded PDFs.  
- Providing real-time family finance tracking for multiple users.  
- Offering AI-powered insights to help users budget smarter.  
- Ensuring security by allowing only PDF uploads instead of direct bank linking.  

## Project Idea & Brief Description  
This project is a full-stack MERN web application designed to help individuals and families manage their finances in real time using AI-powered transaction analysis.  

### Key Features  
- **AI-Powered PDF Processing** – Automatically extracts and categorizes transactions.  
- **Real-Time Family Finance Management** – Multiple users can track shared expenses.  
- **Smart Budgeting & Expense Tracking** – Interactive dashboards with insights.  
- **Alerts & Notifications** – Overspending warnings, bill reminders, and fraud detection.  
- **Secure & Private** – No direct bank linking, only PDF uploads for security.  

---

## Phase-Wise Plan & Timelines  

### Phase 1: Project Setup & UI/UX Planning  
- Set up MERN stack environment (MongoDB, Express.js, React, Node.js).  
- Design wireframes for key pages (Dashboard, Upload, Budgeting, Family Finance).  
- Define database schema for users, transactions, budgets, and family management.  

### Phase 2: Backend Development (Authentication & File Uploads)  
- Implement user authentication (JWT-based login/signup).  
- Set up Multer for handling PDF uploads.  
- Configure MongoDB models for transactions and users.  

### Phase 3: AI Integration for PDF Processing   
- Use Tesseract OCR & NLP to extract transaction details from PDF.  
- Send extracted data to the MongoDB database.  

### Phase 4: Frontend Development (Dashboard & Expense Tracking)  
- Develop Dashboard UI (display balance, spending trends, AI insights).  
- Implement real-time transaction display using WebSockets.  
- Integrate charts and graphs for better data visualization.  

### Phase 5: Family Finance Features  
- Build a family finance management system (add members, shared budgets).  
- Implement role-based access for different family members.  
- Set up family transaction tracking.  

### Phase 6: Budgeting & Notifications  
- Add budget management features (set limits, track spending).  
- Implement real-time notifications for overspending and upcoming bills.  
- Integrate AI-powered insights and recommendations.  

### Phase 7: Final Testing & Deployment  
- Unit testing and bug fixes across all features.  
- Optimize backend and AI processing for performance.  
- Deploy project on Vercel (Frontend) and Render/Heroku (Backend).  

---

## Tech Stack  
- **Frontend:** React, Redux, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **AI & OCR:** AI Api & Tesseract
- **Real-Time Updates:** WebSockets  

---

## Goal  
To create an AI-powered financial planning tool that simplifies expense tracking, budgeting, and family finance management in a real-time, user-friendly, and secure manner.  

---

## Want to Contribute ?

### Let's Build Together

Thanks for your interest in contributing!  
We welcome bug fixes, features, ideas, or even small tweaks to make things better.

---

###  Getting Started

1. **Clone & Install:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

   # Backend
   cd server && npm install && npm run dev

   # Frontend (new terminal)
   cd client && npm install && npm start

2. Add .env files using .env.example as a reference.

## How to Contribute

1. **Fork** this repo on GitHub.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/your-fork.git
   cd your-fork

3. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name or fix/issue-name
4. Make changes, then commit:
   ```bash
   git add .
   git commit -m "feat: your message"
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name or fix/issue-name
6. Open a Pull Request to the dev branch on GitHub.
- Select dev as the base branch.
- Add a clear title and description.
- Click "Create pull request"

---

### Keep it clean, test your code, and be respectful

---
