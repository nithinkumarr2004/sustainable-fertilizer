const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/fertilizer', require('./routes/fertilizer'));

// Health check
app.get('/api/health', async (req, res) => {
  const { getFertilizerPrediction } = require('./services/aiService');
  const mongoose = require('mongoose');
  
  let aiStatus = 'unknown';
  try {
    const axios = require('axios');
    const AI_URL = process.env.AI_MODEL_API_URL || 'http://localhost:5000';
    const response = await axios.get(`${AI_URL}/health`, { timeout: 2000 });
    aiStatus = response.data.status === 'healthy' || response.data.status === 'ready' ? 'online' : 'error';
  } catch (err) {
    aiStatus = `offline (${err.message})`;
  }

  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'production',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    ai_model_service: {
      status: aiStatus,
      url: process.env.AI_MODEL_API_URL || 'http://localhost:5000 (default)'
    }
  });
});

// Error handling middleware
app.use(require('./middleware/errorHandler'));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fertilizer_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✓ Connected to MongoDB');
    console.log('✓ Database:', mongoose.connection.name);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 Make sure MongoDB is running!');
    console.error('   - Local: Start MongoDB service or run mongod');
    console.error('   - Atlas: Check connection string in .env');
    // Don't exit - let server start but requests will fail gracefully
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
