const mongoose = require('mongoose');

const soilDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nitrogen: {
    type: Number,
    required: [true, 'Nitrogen level is required'],
    min: 0,
    max: 100
  },
  phosphorus: {
    type: Number,
    required: [true, 'Phosphorus level is required'],
    min: 0,
    max: 100
  },
  potassium: {
    type: Number,
    required: [true, 'Potassium level is required'],
    min: 0,
    max: 100
  },
  ph: {
    type: Number,
    required: [true, 'pH level is required'],
    min: 4.0,
    max: 8.5
  },
  moisture: {
    type: Number,
    required: [true, 'Moisture level is required'],
    min: 0,
    max: 100
  },
  temperature: {
    type: Number,
    required: [true, 'Temperature is required'],
    min: 0,
    max: 50
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    enum: ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Tomato', 'Potato', 'Sugarcane']
  },
  location: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SoilData', soilDataSchema);
