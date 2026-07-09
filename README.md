# 💰 Expense Tracker - MERN Stack

A full-stack Expense Tracker web application built using the **MERN Stack (MongoDB, Express.js, React + Vite, Node.js)**. The application enables users to securely manage their personal finances by tracking income and expenses, viewing analytical reports, and exporting transaction data in CSV and PDF formats.

---

# 📌 Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Architecture
- Folder Structure
- Application Workflow
- API Endpoints
- Installation
- Environment Variables
- Running the Project
- Testing
- Future Enhancements
- Screenshots
- Author

---

# 📖 Project Overview

The Expense Tracker is a secure personal finance management system that allows users to:

- Register and Login securely
- Manage Income and Expense transactions
- View dashboard analytics
- Generate reports
- Export transaction history
- Maintain personal financial records

The backend exposes REST APIs while the frontend provides an interactive user interface built with React and Vite.

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

---

## Transaction Management

- Add Transaction
- Edit Transaction
- Delete Transaction
- View All Transactions
- Search Transactions
- Filter Transactions
- Income & Expense Categories

---

## Dashboard

- Total Balance
- Total Income
- Total Expense
- Recent Transactions
- Monthly Overview
- Financial Summary Cards

---

## Reports

- Summary Report
- Monthly Report
- Category-wise Report
- Transaction Statistics

---

## Export

- Export Transactions as CSV
- Export Transactions as PDF

---

## Security

- JWT Authentication
- Password Hashing
- Input Validation
- Protected APIs
- Environment Variables

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- React Hook Form
- React Toastify
- Chart.js
- React ChartJS 2
- React Icons
- CSS

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Express Validator
- dotenv
- CORS
- Morgan

---

## Database

- MongoDB Atlas

---

## Development Tools

- Visual Studio Code
- Postman
- Git
- GitHub
- Nodemon

---

# 🏗 Project Architecture

```
                React + Vite
                      │
                      │
                  Axios API
                      │
                      ▼
              Express REST API
                      │
            Controllers
                      │
                Services Layer
                      │
                 Mongoose ODM
                      │
                MongoDB Atlas
```

---

# 📁 Project Structure

```
ExpenseTracker
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── constants
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── utils
│   │
│   ├── tests
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── config
│   │   ├── constants
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 Application Workflow

```
User
   │
   ▼
React Frontend
   │
Axios Requests
   │
Express Routes
   │
Controllers
   │
Services
   │
MongoDB Atlas
   │
Response
   │
React UI
```

---

# 🔗 Backend API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Transactions

| Method | Endpoint |
|---------|-----------|
| GET | /api/transactions |
| GET | /api/transactions/:id |
| POST | /api/transactions |
| PUT | /api/transactions/:id |
| DELETE | /api/transactions/:id |

---

## Reports

| Method | Endpoint |
|---------|-----------|
| GET | /api/reports/summary |
| GET | /api/reports/monthly |
| GET | /api/reports/category |

---

## Export

| Method | Endpoint |
|---------|-----------|
| GET | /api/export/csv |
| GET | /api/export/pdf |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ExpenseTracker.git
```

---

## Move into Project

```bash
cd ExpenseTracker
```

---

# 📦 Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file inside the frontend folder.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# ▶ Running the Project

## Backend

```bash
cd backend

npm run dev
```

Runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🧪 Testing

Backend includes automated tests for:

- Authentication
- Transactions
- Reports

Run tests:

```bash
npm test
```

---

# 🔒 Authentication Flow

```
Register
      │
      ▼
Password Hashing
      │
      ▼
Store User
      │
      ▼
Login
      │
      ▼
JWT Token
      │
      ▼
Protected APIs
```

---

# 📊 Database Collections

```
users

transactions
```

---

# 🚀 Future Enhancements

- Email Verification
- Forgot Password
- Profile Management
- Budget Planning
- Expense Limits
- Recurring Transactions
- Notifications
- Dark Mode
- Multi-Currency Support
- AI Expense Insights
- Receipt Upload
- Mobile Responsive Enhancements
- Docker Deployment
- Cloud Deployment

---

# 📷 Screenshots

Add screenshots here after completing the frontend.

Example:

```
screenshots/
│
├── login.png
├── dashboard.png
├── transactions.png
├── reports.png
└── profile.png
```

---

# 👨‍💻 Author

**Vansh Upadhyay**

Bachelor of Technology (B.Tech)

MERN Stack Developer

---

# 📄 License

This project is developed for educational and portfolio purposes.