# 🚀 Quick MongoDB Setup - Choose One Option

## ⚡ Option 1: MongoDB Atlas (Cloud) - **EASIEST** ⭐ Recommended

### Why MongoDB Atlas?
- ✅ **FREE** (M0 Sandbox tier)
- ✅ **No installation needed**
- ✅ **Works immediately**
- ✅ **5 minutes setup**

### Step-by-Step:

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Click "Try Free" → Sign up with email

2. **Create Free Cluster:**
   - Click "Build a Database"
   - Choose **FREE (M0)** tier
   - Select closest region (e.g., AWS, N. Virginia)
   - Click "Create"

3. **Create Database User:**
   - Go to **Database Access** (left menu)
   - Click "Add New Database User"
   - Choose "Password" → Username: `fertilizer_user` → Password: `create_a_strong_password` (save it!)
   - Set privileges: **Atlas admin**
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to **Network Access** (left menu)
   - Click "Add IP Address"
   - Click **"Allow Access from Anywhere"** (for development)
   - Click "Confirm"

5. **Get Connection String:**
   - Go to **Database** (left menu)
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string (looks like):
     ```
     mongodb+srv://fertilizer_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

6. **Update Backend .env File:**
   
   Edit: `C:\Users\nithi\AI-FERTLIZER\backend\.env`
   
   Replace the `MONGODB_URI` line with:
   ```env
   MONGODB_URI=mongodb+srv://fertilizer_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/fertilizer_db?retryWrites=true&w=majority
   ```
   
   **Important:** Replace `YOUR_PASSWORD` and the cluster URL!

7. **Test Connection:**
   ```powershell
   cd C:\Users\nithi\AI-FERTLIZER\backend
   node test-mongo-connection.js
   ```

   ✅ Should see: `✅ MongoDB Connected Successfully!`

---

## 💻 Option 2: Local MongoDB Installation

### Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** Latest (e.g., 7.0)
   - **Platform:** Windows
   - **Package:** MSI
3. Click "Download"

### Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Follow installer:
   - Check "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (GUI tool - optional)
   - Click "Install"

### Step 3: Verify Installation

Open **NEW** PowerShell and check:

```powershell
mongod --version
```

Should show MongoDB version info.

### Step 4: Start MongoDB Service

**Method 1: Using Windows Services (Easiest)**

1. Press `Windows + R`
2. Type: `services.msc` → Press Enter
3. Find **"MongoDB Server (MongoDB)"**
4. Right-click → **Start** (if not running)
5. Status should show **"Running"**

**Method 2: Using PowerShell (Admin)**

Open PowerShell **as Administrator**:

```powershell
net start MongoDB
```

### Step 5: Test Connection

```powershell
# Open MongoDB shell
mongosh
```

Should see: `Connected to: mongodb://127.0.0.1:27017/`

Type `exit` to exit.

### Step 6: Update Backend .env

The `.env` file is already configured for local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/fertilizer_db
```

No changes needed if using local MongoDB!

### Step 7: Test Backend Connection

```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
node test-mongo-connection.js
```

✅ Should see: `✅ MongoDB Connected Successfully!`

---

## 🧪 Quick Test

After setup, run this test:

```powershell
cd C:\Users\nithi\AI-FERTLIZER\backend
node test-mongo-connection.js
```

**Success Output:**
```
🔍 Testing MongoDB Connection...
✅ MongoDB Connected Successfully!
✅ Database: fertilizer_db
✅ Host: localhost (or cluster address)
✅ Database Ping Successful!
🎉 MongoDB is ready to use!
```

**Error Output:**
If you see errors, check:
- MongoDB service is running (local) or connection string is correct (Atlas)
- Password is correct in connection string (Atlas)
- IP is whitelisted (Atlas)

---

## ✅ Next Steps

Once MongoDB is connected:

1. **Start Backend:**
   ```powershell
   cd C:\Users\nithi\AI-FERTLIZER\backend
   npm start
   ```

2. **Verify Connection:**
   Should see: `✓ Connected to MongoDB`

3. **Start Other Services:**
   - Terminal 2: AI Model (`python app.py`)
   - Terminal 3: Frontend (`npm start`)

---

## 💡 Recommendation

**For Quick Start:** Use **MongoDB Atlas** (Option 1) - it's faster and easier!

**For Production:** Use **Local MongoDB** or dedicated MongoDB Atlas cluster.

---

## 📖 Need More Help?

See detailed guide: `MONGODB_SETUP.md`








