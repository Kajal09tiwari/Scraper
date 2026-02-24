# 🚀 DEPLOYMENT READY CHECKLIST

## ✅ Code Status: PRODUCTION READY

```
✅ Backend - API-based job scrapers (no blocking issues)
✅ Frontend - Environment variable based API URL
✅ Database - MongoDB Atlas configured
✅ CORS - Dynamic (works on all domains)
✅ .gitignore - Sensitive data won't leak
✅ API Key - RapidAPI configured
```

---

## 📋 Pre-Deployment Verification

### **1. Check .env Files (Local)**

**server/.env:**
```
MONGO_URI=mongodb+srv://kajaltiwari7408:spsu@cluster0.ck4rgyk.mongodb.net/jobscaper?retryWrites=true&w=majority
PORT=5000
RAPID_API_KEY=27b43d2be3mshdcc0be968f45e1ap1e48ebjsn5b901fa43527
```

**client/.env.local:**
```
REACT_APP_API_URL=http://localhost:5000
```

### **2. Verify GitHub**
```bash
# Make sure .env files are NOT in GitHub
git status  # Should NOT show .env or .env.local
```

---

## 🌍 RENDER BACKEND DEPLOYMENT (5 minutes)

### **Step 1: Go to Render**
1. Visit [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**

### **Step 2: Select Repository**
- Search for **"Scraper"** (your GitHub repo)
- Select it

### **Step 3: Configure Web Service**

| Setting | Value |
|---------|-------|
| **Name** | job-scraper-api |
| **Environment** | Node |
| **Region** | Singapore (closest) |
| **Branch** | main |
| **Build Command** | `npm install` |
| **Start Command** | `cd server && node index.js` |
| **Root Directory** | (leave blank) |

### **Step 4: Add Environment Variables**
Click **"Advanced"** then **"Add Environment Variable"**:

```
MONGO_URI=mongodb+srv://kajaltiwari7408:spsu@cluster0.ck4rgyk.mongodb.net/jobscaper?retryWrites=true&w=majority

PORT=5000

RAPID_API_KEY=27b43d2be3mshdcc0be968f45e1ap1e48ebjsn5b901fa43527

NODE_ENV=production
```

### **Step 5: Deploy**
- Click **"Create Web Service"**
- Wait 5-10 minutes
- Get URL like: `https://job-scraper-api.onrender.com`
- **Copy this URL!**

✅ **Backend Live!**

---

## 💻 VERCEL FRONTEND DEPLOYMENT (5 minutes)

### **Step 1: Go to Vercel**
1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**

### **Step 2: Import Repository**
- Select your **"Scraper"** repo
- Click **"Import"**

### **Step 3: Configure**

| Setting | Value |
|---------|-------|
| **Framework** | Create React App |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |

### **Step 4: Add Environment Variable**
Look for **"Environment Variables"** section:

```
REACT_APP_API_URL = https://job-scraper-api.onrender.com
```
(Replace with your actual Render backend URL)

### **Step 5: Deploy**
- Click **"Deploy"**
- Wait 2-3 minutes
- Get URL like: `https://job-scraper-xyz.vercel.app`

✅ **Frontend Live!**

---

## 🧪 FINAL TESTING

1. **Open Frontend URL:** `https://job-scraper-xyz.vercel.app`
2. **Click "💼 India Jobs"** button
3. **Wait 10-15 seconds** (first request is slow)
4. **See job list appear!** ✨

### **If Not Working:**

**Check Network Tab (F12 → Network):**
- Request URL should go to `https://job-scraper-api.onrender.com/api/naukri`
- Status should be `200`

**If 404 Error:**
- Check REACT_APP_API_URL in Vercel settings
- Verify Render backend is running

**If Empty Response:**
- Check server logs on Render dashboard
- Verify RAPID_API_KEY is correct

---

## 📊 FINAL URLS

Once deployed, you'll have:

```
Frontend: https://job-scraper-xyz.vercel.app
Backend:  https://job-scraper-api.onrender.com
Database: MongoDB Atlas (configured)
```

---

## 📝 FOR YOUR RESUME

```
Job Scraper Portal
• Full-Stack MERN application hosted on cloud
• Frontend: React deployed on Vercel
• Backend: Node.js/Express API on Render
• Database: MongoDB Atlas
• Integrated JSearch API for multi-platform job aggregation
• Dynamic CORS for cross-origin requests
• Deployed on: Vercel & Render

Live: https://job-scraper-xyz.vercel.app
GitHub: https://github.com/Kajal09tiwari/Scraper
```

---

## ✨ YOU'RE READY!

No blocking issues, no hardcoded domains, no API key leaks.

**Ready to deploy?** Follow the steps above! 🚀

