# Deployment Guide: Nexum

This guide will walk you through deploying your "Free Stack" for **Nexum**:

- **Database**: Neon (PostgreSQL)
- **Backend**: Render (Node.js API)
- **Frontend**: Vercel (React App)

---

## 1. Database Setup (Neon)

1. Go to [Neon.tech](https://neon.tech) and sign up (free).
2. Create a new project named `nexum`.
3. **Copy the Connection String**. It will look like:
    `postgres://neondb_owner:Hik7.../neondb?sslmode=require`
4. Save this for the next step.

## 2. Backend Setup (Render)

1. Go to [Render.com](https://render.com) and sign up.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. **Settings**:
    - **Name**: `nexum-api`
    - **Root Directory**: `.` (leave empty or dot)
    - **Build Command**: `npm install`
    - **Start Command**: `node src/server.js`
    - **Plan**: Free
5. **Environment Variables** (Scroll down):
    - Key: `DATABASE_URL`
    - Value: Paste your Neon connection string from Step 1.
6. Click **Create Web Service**.
7. Wait for it to deploy. **Copy the Service URL** (e.g., `https://nexum-api.onrender.com`).

## 3. Frontend Setup (Vercel)

1. Go to [Vercel.com](https://vercel.com) and sign up.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. **Configure Project**:
    - **Root Directory**: Click "Edit" and select `frontend`.
    - **Framework Preset**: Vite (should auto-detect).
5. **Environment Variables**:
    - Key: `VITE_API_URL`
    - Value: Paste your Render Backend URL (e.g., `https://nexum-api.onrender.com`).
      *Important: Do not include a trailing slash `/` at the end.*
6. Click **Deploy**.

## 4. Final Configuration

Once the frontend is deployed:

1. Go to your `frontend/vercel.json` file in your code.
2. Update the destination URL in `rewrites` to match your actual Render URL, just in case the environment variable approach has edge cases with rewrites (though the code change we made should handle it directly).
    *Tip: Since we updated `api.js` to use `VITE_API_URL`, the `vercel.json` rewrite modification is technically optional but good as a backup/proxy.*

## Testing

Open your Vercel URL. You should see your Dashboard. If the spinner keeps spinning:

1. Check the Console (F12) for errors.
2. Verify your Render service is "Live". (Note: Free tier spins down after inactivity, so the first request might take 50 seconds).
