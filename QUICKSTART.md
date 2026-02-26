# 🚀 Quick Start Guide - Running the Project

This guide will help you get the Smart Fertilizer Optimization System up and running step by step.

## Prerequisites Checklist

Before starting, ensure you have:
- ✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- ✅ **Python** (v3.8 - v3.12) - [Download](https://www.python.org/downloads/)
  - ⚠️ **Important**: Python 3.13+ may have compatibility issues with older packages
- ✅ **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **npm** or **yarn** (comes with Node.js)

## Step-by-Step Setup

### Step 1: Start MongoDB

**Windows:**
```powershell
# If MongoDB is installed as a service, start it from Services
# Or start MongoDB manually:
mongod --dbpath="C:\data\db"
```

**Linux/Mac:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# OR
mongod
```

**Alternative:** Use MongoDB Atlas (cloud) and update the connection string in backend `.env`

### Step 2: Setup AI Model (Python)

Open a **new terminal window** and run:

```powershell
# Navigate to ai-model directory
cd C:\Users\nithi\AI-FERTLIZER\ai-model

# Install Python dependencies
pip install -r requirements.txt

# If pip install fails, try upgrading pip first:
python -m pip install --upgrade pip

# Generate sample dataset (if not already generated)
python generate_dataset.py

# Train the ML models
python train_model.py

# Start Flask API server
python app.py
```

✅ **Success indicators:**
- Terminal shows: `✓ Models loaded successfully!`
- Terminal shows: `Starting Flask API server...`
- Server running on: `http://localhost:5000`

**Keep this terminal window open!**

### Step 3: Setup Backend (Node.js)

Open a **second new terminal window** and run:

```powershell
# Navigate to backend directory
cd C:\Users\nithi\AI-FERTLIZER\backend

# Install dependencies
npm install

# Create .env file (copy from template)
copy env.template .env

# Edit .env file and update if needed (defaults should work):
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/fertilizer_db
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# AI_MODEL_API_URL=http://localhost:5000

# Start backend server
npm start
# OR for development with auto-reload:
npm run dev
```

✅ **Success indicators:**
- Terminal shows: `✓ Connected to MongoDB`
- Terminal shows: `✓ Server running on port 3000`

**Keep this terminal window open!**

### Step 4: Setup Frontend (React)

Open a **third new terminal window** and run:

```powershell
# Navigate to frontend directory
cd C:\Users\nithi\AI-FERTLIZER\frontend

# Install dependencies (this may take a few minutes)
npm install

# Create .env file (copy from template)
copy env.template .env

# Edit .env file if needed (defaults should work):
# REACT_APP_API_URL=http://localhost:3000/api

# Start React development server
npm start
```

✅ **Success indicators:**
- Browser automatically opens at `http://localhost:3000`
- Or navigate manually to `http://localhost:3001` (if 3000 is taken)
- React app loads with the Home page

**Keep this terminal window open!**

## 🎉 You're All Set!

You should now have **3 terminal windows running**:
1. **Terminal 1**: Flask AI API (`http://localhost:5000`)
2. **Terminal 2**: Node.js Backend (`http://localhost:3000`)
3. **Terminal 3**: React Frontend (`http://localhost:3000` or `3001`)

## 📱 Using the Application

1. **Browse the Home Page**: Navigate through Home, About Fertilizers, News & Events
2. **Register/Login**: Click "Sign Up" to create an account or "Login" if you have one
3. **Get Recommendations**: 
   - After login, click "Prediction Tool" in the navbar
   - Enter soil parameters (N, P, K, pH, Moisture, Temperature, Crop Type)
   - Click "Get Recommendation"
   - View AI-powered fertilizer recommendations
4. **View Dashboard**: Check your statistics and charts
5. **View History**: See all your past recommendations

## 🔧 Troubleshooting

### Issue: MongoDB Connection Failed
```
Solution: 
- Ensure MongoDB is running
- Check if MongoDB service is started (Windows: Services app)
- Verify connection string in backend/.env
```

### Issue: AI Model API Not Responding
```
Solution:
- Check if Flask server is running on port 5000
- Verify models are trained (check for .pkl files in ai-model/)
- Run: python ai-model/app.py again
```

### Issue: Frontend Can't Connect to Backend
```
Solution:
- Verify backend is running on port 3000
- Check REACT_APP_API_URL in frontend/.env
- Ensure CORS is enabled in backend (should be by default)
```

### Issue: Python Package Installation Fails
```
Solution:
- Use Python 3.8 - 3.12 (not 3.13+)
- Try: python -m pip install --upgrade pip
- Try: pip install --upgrade setuptools
- If using Python 3.13+, consider using a virtual environment with Python 3.12
```

### Issue: Port Already in Use
```
Solution:
- Change PORT in backend/.env to another port (e.g., 3001)
- Update REACT_APP_API_URL in frontend/.env accordingly
- Or kill the process using the port
```

## 🧪 Test the System

### Test AI Model API Directly:
```powershell
# In a new terminal
curl -X POST http://localhost:5000/predict -H "Content-Type: application/json" -d "{\"nitrogen\": 45, \"phosphorus\": 30, \"potassium\": 35, \"ph\": 6.5, \"moisture\": 55, \"temperature\": 25, \"crop_type\": \"Wheat\"}"
```

### Test Backend API:
```powershell
# Register a test user
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"password123\"}"
```

## 📝 Next Steps

- Explore all pages: Home, About Fertilizers, News & Events
- Create an account and get fertilizer recommendations
- View your dashboard with analytics and charts
- Check your recommendation history

---

**Need Help?** Check the main `README.md` for detailed documentation and API endpoints.








