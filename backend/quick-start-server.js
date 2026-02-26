/**
 * Quick Server Start with Better Error Messages
 * This helps debug connection issues
 */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fertilizer_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    port: PORT,
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is responding!',
    timestamp: new Date().toISOString()
  });
});

// Load routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/fertilizer', require('./routes/fertilizer'));

// Error handling
app.use(require('./middleware/errorHandler'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /api/health',
      'GET /api/test',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/soil/submit',
      'GET /api/soil/history',
      'POST /api/fertilizer/recommend',
      'GET /api/fertilizer/history'
    ]
  });
});

// Connect to MongoDB
console.log('🔌 Connecting to MongoDB...');
console.log('📍 URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  console.log('✅ Database:', mongoose.connection.name);
  
  // Start server
  app.listen(PORT, () => {
    console.log('\n🎉 ==========================================');
    console.log('✅ Backend Server Started Successfully!');
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Test route: http://localhost:${PORT}/api/test`);
    console.log('🎉 ==========================================\n');
  });
})
.catch((err) => {
  console.error('\n❌ MongoDB connection error:', err.message);
  console.error('💡 Make sure MongoDB is running!');
  console.error('   - Local: Start MongoDB service or run mongod');
  console.error('   - Atlas: Check connection string in .env\n');
  
  // Still start server, but requests will fail
  app.listen(PORT, () => {
    console.log(`⚠️  Server started on port ${PORT} but MongoDB is not connected!`);
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log('⚠️  API requests will fail until MongoDB is connected.\n');
  });
});








