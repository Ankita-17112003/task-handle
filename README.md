# Task Manager — MERN Deployment Practice Project

Ye ek simple full-stack MERN app hai jo specially deployment practice ke liye banaya gaya hai.

## Structure
```
mern-deploy-practice/
├── backend/       # Express + MongoDB API
└── frontend/      # React (Vite) app
```

## Features
- Task add karo
- Task complete/incomplete mark karo (click karke)
- Task delete karo

---

## Step 1: Local pe run karna (optional, pehle test karne ke liye)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# .env me apna MongoDB URI daalo (local ya Atlas)
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## Step 2: MongoDB Atlas Setup
1. https://www.mongodb.com/cloud/atlas pe free account banao
2. Free (M0) cluster create karo
3. Database Access me ek user banao (username + password)
4. Network Access me "Allow access from anywhere" (0.0.0.0/0) add karo
5. "Connect" → "Drivers" se connection string copy karo
   - Format: `mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager`

---

## Step 3: Backend Deploy (Render.com)
1. Is `backend/` folder ko apne GitHub repo me push karo
2. https://render.com pe account banao, GitHub connect karo
3. "New Web Service" → apna repo select karo
4. Settings:
   - **Root Directory:** `backend` (agar dono folders same repo me hain)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment tab me ye variables add karo:
   - `MONGO_URI` = tumhara Atlas connection string
   - `CLIENT_URL` = tumhare frontend ka URL (deploy hone ke baad update karna)
   - `PORT` = 5000 (Render khud bhi assign karta hai, but safe hai add karna)
6. Deploy karo — tumhe ek URL milega jaise `https://your-app.onrender.com`
7. Browser me `https://your-app.onrender.com` khol ke check karo — `{"message": "Task Manager API is running"}` dikhna chahiye

---

## Step 4: Frontend Deploy (Vercel)
1. `frontend/` folder ko GitHub pe push karo
2. https://vercel.com pe GitHub repo import karo
3. Framework: Vite (auto-detect ho jayega)
4. Environment Variables me add karo:
   - `VITE_API_URL` = `https://your-app.onrender.com/api/tasks`
5. Deploy karo — tumhe live URL milega jaise `https://your-app.vercel.app`

---

## Step 5: CORS Fix (important!)
Backend deploy hone ke baad, Render dashboard me jaake `CLIENT_URL` env variable update karo apne Vercel URL se, aur redeploy karo. Isse CORS error nahi aayega.

---

## Step 6: Test
- Frontend URL kholo
- Task add karo, complete mark karo, delete karo
- Agar error aaye to:
  - Browser console check karo (F12)
  - Render logs check karo (Render dashboard → Logs tab)
  - Env variables sahi se set hain ya nahi double-check karo

---

## Troubleshooting
| Problem | Solution |
|---|---|
| CORS error | `CLIENT_URL` backend me sahi Vercel URL se match karna chahiye |
| "Backend se connect nahi ho paya" | `VITE_API_URL` frontend env me check karo |
| MongoDB connection fail | Atlas me Network Access aur password check karo |
| Render free tier slow start | Free tier "sleep" ho jata hai inactivity pe, pehla request slow hoga (normal hai) |
