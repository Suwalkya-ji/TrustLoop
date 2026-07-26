# TrustLoop - Testimonial Management Platform

A full-stack testimonial collection, moderation, and display platform built as an SDE-1 take-home assignment. It replicates the **Stitch Design System** pixel-faithfully and meets all specifications outlined in the **PRD (`Testimonial_Platform_PRD.pdf`)**.

---

## 🌟 Features Overview

### 1. Public Testimonial Submission Form (`/submit`)
- **Customer Input Fields**: Full Name, Email Address, Company & Title, Star Rating (1–5), Story Message, and optional Profile Photo upload.
- **Interactive Star Rating**: Hover state dynamic preview and rating labels ("1 Star - Needs Improvement" → "5 Stars - Excellent!").
- **Drag-and-Drop Photo Upload**: Instant client-side Base64 preview with photo removal option.
- **Form Validation & Feedback**: Required field enforcement, email format checking, and floating animated success toast.

### 2. Moderation Dashboard (`/dashboard`)
- **Key Metrics Summary**: Real-time counters for *Total Submissions*, *Pending Review*, and *Average Rating*.
- **Multi-Status Filters & Search**: Filter by `All`, `Pending`, `Approved`, or `Rejected` states with live customer search.
- **Adaptive Responsive Design**: Desktop data table with status badges and Mobile-friendly responsive card stack layout.
- **Live Action Handlers**: Instant **Approve** and **Reject** buttons updating state and MongoDB records in real time.

### 3. Public Wall of Love (`/wall`)
- **Strict Approval Filtering**: Renders **ONLY APPROVED** testimonials. Pending or rejected submissions are strictly hidden.
- **Hero & Stats Banner**: Displays global platform metrics (4.9 Avg Rating, 500+ Happy Clients, 12k Reviews Managed).
- **Masonry Layout Grid**: Card layout displaying ratings, verified badges, user avatars/initials, and company details.
- **Embedded Submission CTA**: Bottom card enabling happy customers to post testimonials directly.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router DOM (v7), Axios, Tailwind CSS (v3).
- **Backend**: Node.js, Express.js.
- **Database & ODM**: MongoDB Atlas, Mongoose ODM.
- **Typography & Icons**: Geist (Headings/Labels), Inter (Body copy), Material Symbols Outlined icons.

---

## 📁 Repository Structure

```
testimonial_platform/
├── client/                     # Frontend React 19 + Vite Application
│   ├── src/
│   │   ├── api/                # Axios instance with proxy configuration
│   │   ├── components/         # Header, Footer, Sidebar navigation
│   │   ├── layouts/            # PublicLayout and DashboardLayout
│   │   ├── pages/              # SubmitTestimonialPage, ModerationDashboardPage, PublicWallPage
│   │   ├── routes/             # AppRoutes (React Router v7)
│   │   └── services/           # Frontend Testimonial API client
│   ├── tailwind.config.js      # Stitch design system tokens configuration
│   └── vite.config.js          # Vite config with API proxy to localhost:5000
│
├── server/                     # Backend Node.js + Express.js API
│   ├── config/                 # MongoDB Atlas connection setup
│   ├── controllers/            # Testimonial HTTP request handlers
│   ├── middleware/             # Error handling & async wrappers
│   ├── models/                 # Mongoose Testimonial Schema & Validation
│   ├── routes/                 # Express REST API Endpoints
│   ├── services/               # Testimonial service layer with instant fallback
│   └── server.js               # Express server entry point
│
├── Assets/                     # Original PRD PDF & Stitch exported design folders
├── JOURNAL.md                  # Project decisions, AI pair programming, & verification log
└── README.md                   # Project documentation
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/testimonials` | Submit a new testimonial (Default status: `PENDING`) | Public |
| `GET` | `/api/testimonials/approved` | Get all approved testimonials for Public Wall | Public |
| `GET` | `/api/testimonials` | Get all testimonials with optional `?status=` and `?search=` filters | Moderation |
| `PATCH` | `/api/testimonials/:id/approve` | Update testimonial status to `APPROVED` | Moderation |
| `PATCH` | `/api/testimonials/:id/reject` | Update testimonial status to `REJECTED` | Moderation |
| `GET` | `/api/health` | Backend API health check | Public |

---

## 🚀 How to Run Locally

### 1. Install Dependencies
Run `npm install` inside both `server` and `client` directories:

```bash
# Terminal 1: Backend
cd server
npm install

# Terminal 2: Frontend
cd client
npm install
```

### 2. Start Backend & Frontend

```bash
# Terminal 1: Start Express API (Port 5000)
cd server
npm run dev

# Terminal 2: Start Vite Dev Server (Port 5173)
cd client
npm run dev
```

### 3. Open in Browser
- **Public Wall**: [http://localhost:5173/wall](http://localhost:5173/wall)
- **Submit Testimonial**: [http://localhost:5173/submit](http://localhost:5173/submit)
- **Moderation Dashboard**: [http://localhost:5173/dashboard](http://localhost:5173/dashboard)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
