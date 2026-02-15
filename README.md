# Payviah

**Payviah** is a community-based Buy Now, Pay Later (BNPL) system built on trust, grace, and stability. Service of ANW Foundations.

## Features

- **Community Trust Score**: Build reputation by paying effectively.
- **Reliability Meter**: Track your stability and essential spending.
- **Grace Periods**: Request grace when life happens, without hidden fees.

## Tech Stack

- **Frontend Demo**: React + Vite (Hosted on GitHub Pages)
- **Backend (Future)**: Node.js + Express
- **Database (Future)**: PostgreSQL

## Getting Started

### Should I Clone or Fork?

**Clone** if you want to:
- Run the application locally for personal use or testing
- Explore the codebase without making contributions
- Use it as a reference or learning resource

**Fork** if you want to:
- Make changes and contribute back to the project via Pull Requests
- Create your own version with custom modifications
- Experiment with changes while keeping a connection to the original repository

### Local Setup Instructions

#### Prerequisites
- **Node.js** (v16 or higher) and **npm**
- **PostgreSQL** (Optional, for backend development)
- **Git**

#### 1. Clone the Repository
```bash
git clone https://github.com/FREEqueenC/Payviah.git
cd Payviah
```

#### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

#### 3. Run the Application

**Option A: Frontend Only (Demo Mode)**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` with simulated data.

**Option B: Full Stack (Backend + Frontend)**

1. Set up your environment variables:
```bash
# Create a .env file in the root directory
echo "DATABASE_URL=your_postgresql_connection_string" > .env
```

2. Build the frontend:
```bash
npm run build
```

3. Start the backend server:
```bash
npm start
```
The full application will run on `http://localhost:3000`.

**Option C: Development Mode (Backend with Auto-Reload)**
```bash
npm run dev
```

#### 4. Database Setup (Optional)

If you want to run the backend with a real database:

1. Create a PostgreSQL database
2. Run the schema setup:
```bash
psql -U your_username -d your_database -f schema.sql
psql -U your_username -d your_database -f seed_data.sql
```

### Project Structure
- `/src` - Backend Node.js API
- `/frontend` - React frontend application
- `schema.sql` - Database schema
- `DEPLOYMENT.md` - Production deployment guide

## Note
This is currently a **Frontend Demo** running with simulated data for preview purposes. No real transactions are processed.
