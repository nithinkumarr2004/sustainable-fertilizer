const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/fertilizer', require('./routes/fertilizer'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
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
