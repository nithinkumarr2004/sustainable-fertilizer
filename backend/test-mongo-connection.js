/**
 * Quick MongoDB Connection Test Script
 * Run this to test if MongoDB is connected properly
 */
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fertilizer_db';

console.log('🔍 Testing MongoDB Connection...');
console.log('Connection URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide password

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log('✅ Database:', mongoose.connection.name);
  console.log('✅ Host:', mongoose.connection.host);
  console.log('✅ Port:', mongoose.connection.port);
  
  // Test if we can write to the database
  return mongoose.connection.db.admin().ping();
})
.then(() => {
  console.log('✅ Database Ping Successful!');
  console.log('\n🎉 MongoDB is ready to use!\n');
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:');
  console.error('Error:', err.message);
  console.error('\n💡 Troubleshooting Tips:');
  
  if (err.message.includes('ECONNREFUSED')) {
    console.error('   - MongoDB service is not running');
    console.error('   - Start MongoDB: net start MongoDB (Windows)');
    console.error('   - Or run: mongod');
  } else if (err.message.includes('Authentication failed')) {
    console.error('   - Check username/password in connection string');
    console.error('   - Verify database user exists');
  } else if (err.message.includes('getaddrinfo')) {
    console.error('   - Check MongoDB URI in .env file');
    console.error('   - Verify network connectivity');
  } else {
    console.error('   - Check MongoDB is installed');
    console.error('   - Verify connection string in .env');
  }
  
  console.error('\n📖 See MONGODB_SETUP.md for detailed instructions\n');
  process.exit(1);
});








