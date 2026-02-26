const mongoose = require('mongoose');

const fertilizerRecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  soilData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoilData',
    required: true
  },
  fertilizerType: {
    type: String,
    required: true,
    enum: ['N', 'P', 'K', 'Organic', 'Mixed']
  },
  quantityKgPerAcre: {
    type: Number,
    required: true,
    min: 0
  },
  soilHealthScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  deficiencyAnalysis: [{
    nutrient: String,
    level: Number,
    status: String,
    severity: String,
    recommendation: String
  }],
  improvementSuggestions: [String],
  inputData: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    ph: Number,
    moisture: Number,
    temperature: Number,
    cropType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FertilizerRecommendation', fertilizerRecommendationSchema);
