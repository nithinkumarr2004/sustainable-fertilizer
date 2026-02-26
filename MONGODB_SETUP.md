# 🍃 MongoDB Setup & Connection Guide

This guide will help you set up and connect MongoDB to your project.

---

## Option 1: Local MongoDB (Windows) - Recommended for Development

### Step 1: Install MongoDB (if not installed)

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows → MSI package
   - Download and install

2. **During Installation:**
   - Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (optional GUI tool)

### Step 2: Verify MongoDB Installation

Open PowerShell and check if MongoDB is installed:

```powershell
mongod --version
mongosh --version
```

### Step 3: Start MongoDB Service

**Method 1: Using Windows Services (Easiest)**
1. Press `Windows + R`
2. Type: `services.msc` and press Enter
3. Find "MongoDB Server (MongoDB)" in the list
4. Right-click → **Start** (if it's stopped)
5. Status should show **Running**

**Method 2: Using PowerShell (Admin)**
```powershell
# Open PowerShell as Administrator
net start MongoDB
```

**Method 3: Manual Start (if service not installed)**
```powershell
# Create data directory (first time only)
mkdir C:\data\db

# Start MongoDB manually
mongod --dbpath C:\data\db
```

### Step 4: Verify MongoDB is Running

**Test Connection:**
```powershell
# Open a new PowerShell window
mongosh
```

**Or using old mongo client:**
```powershell
mongo
```

**✅ Success:** You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/
Using MongoDB: 7.x.x
Using Mongosh: 2.x.x
```

**To exit:** Type `exit` and press Enter

---

## Option 2: MongoDB Atlas (Cloud) - Recommended for Production

### Step 1: Create MongoDB Atlas Account

1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Choose **Free Shared Cluster (M0)**

### Step 2: Create a Cluster

1. Click "Build a Database"
2. Select **FREE** tier (M0 Sandbox)
3. Choose a cloud provider and region (closest to you)
4. Click "Create"

### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose **Password** authentication
4. Create username and password (save these!)
5. Set privileges to **Atlas admin** or **Read and write to any database**
6. Click "Add User"

### Step 4: Whitelist Your IP Address

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (or add your IP)
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to **Database** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<password>` with your actual password

---

## 🔧 Configure Backend to Connect to MongoDB

### Step 1: Navigate to Backend Directory

```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
```

### Step 2: Create .env File

```powershell
# Copy the template
copy env.template .env
```

### Step 3: Edit .env File

**For Local MongoDB:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fertilizer_db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
AI_MODEL_API_URL=http://localhost:5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fertilizer_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
AI_MODEL_API_URL=http://localhost:5000
NODE_ENV=development
```

**⚠️ Important:** Replace `username` and `password` in the Atlas connection string!

### Step 4: Test Connection

Start your backend server:

```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
npm start
```

**✅ Success indicators:**
- Terminal shows: `✓ Connected to MongoDB`
- No error messages about connection

**❌ If you see errors:**
- Check MongoDB is running (local) or connection string is correct (Atlas)
- Verify the connection string in `.env`
- Check if database name is correct

---

## 🧪 Quick Connection Test

### Test Local MongoDB Connection

```powershell
# Open PowerShell
mongosh

# Or test connection directly
mongosh mongodb://localhost:27017/fertilizer_db

# You should see: Connected to mongodb://127.0.0.1:27017/
```

### Test from Node.js (Quick Test)

Create a test file `test-mongo.js`:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fertilizer_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});
```

Run it:
```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
node test-mongo.js
```

---

## 🔍 Troubleshooting

### Issue: "MongoServerError: Authentication failed"

**Solution:**
- Check username/password in connection string
- Verify database user exists in MongoDB Atlas
- Ensure IP address is whitelisted (for Atlas)

### Issue: "MongoServerSelectionError: connect ECONNREFUSED"

**Solution:**
- MongoDB service is not running
- Start MongoDB service: `net start MongoDB`
- Or check Services app → Start MongoDB service

### Issue: "Cannot find module 'mongoose'"

**Solution:**
```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
npm install
```

### Issue: Port 27017 Already in Use

**Solution:**
- Another MongoDB instance is running
- Kill the process using port 27017
- Or use a different port in connection string

### Issue: Database Name Not Found

**Solution:**
- MongoDB creates databases automatically
- Just make sure connection string is correct
- Database will be created on first write

---

## 📝 Summary

**For Local MongoDB:**
1. Install MongoDB Community Server
2. Start MongoDB service (Windows Services)
3. Update `.env`: `MONGODB_URI=mongodb://localhost:27017/fertilizer_db`
4. Run backend: `npm start`

**For MongoDB Atlas:**
1. Create free account on MongoDB Atlas
2. Create cluster and database user
3. Whitelist your IP address
4. Copy connection string
5. Update `.env`: `MONGODB_URI=mongodb+srv://username:password@cluster...`
6. Run backend: `npm start`

---

## ✅ Verification

Once connected, you should see in your backend terminal:
```
✓ Connected to MongoDB
✓ Server running on port 3000
```

Your MongoDB is now connected! 🎉

---

**Need Help?** 
- MongoDB Local: https://docs.mongodb.com/manual/installation/
- MongoDB Atlas: https://docs.atlas.mongodb.com/getting-started/








