const SoilData = require('../models/SoilData');
const FertilizerRecommendation = require('../models/FertilizerRecommendation');
const { getFertilizerPrediction } = require('../services/aiService');

exports.recommendFertilizer = async (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, ph, moisture, temperature, cropType, soilDataId } = req.body;

    const predictionPayload = {
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      ph: parseFloat(ph),
      moisture: parseFloat(moisture),
      temperature: parseFloat(temperature),
      crop_type: cropType
    };

    const prediction = await getFertilizerPrediction(predictionPayload);

    let soilData;
    if (soilDataId) {
      soilData = await SoilData.findById(soilDataId);
      if (!soilData || soilData.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ success: false, message: 'Soil data not found' });
      }
    } else {
      soilData = await SoilData.create({
        nitrogen: predictionPayload.nitrogen,
        phosphorus: predictionPayload.phosphorus,
        potassium: predictionPayload.potassium,
        ph: predictionPayload.ph,
        moisture: predictionPayload.moisture,
        temperature: predictionPayload.temperature,
        cropType,
        user: req.user._id
      });
    }

    const recommendation = await FertilizerRecommendation.create({
      user: req.user._id,
      soilData: soilData._id,
      fertilizerType: prediction.fertilizer_type,
      quantityKgPerAcre: prediction.quantity_kg_per_acre,
      soilHealthScore: prediction.soil_health_score,
      deficiencyAnalysis: prediction.deficiency_analysis,
      improvementSuggestions: prediction.improvement_suggestions,
      inputData: {
        nitrogen: prediction.input_data.nitrogen,
        phosphorus: prediction.input_data.phosphorus,
        potassium: prediction.input_data.potassium,
        ph: prediction.input_data.ph,
        moisture: prediction.input_data.moisture,
        temperature: prediction.input_data.temperature,
        cropType: prediction.input_data.crop_type
      }
    });

    const populatedRecommendation = await FertilizerRecommendation.findById(recommendation._id)
      .populate('user', 'name email')
      .populate('soilData');

    res.json({ success: true, data: populatedRecommendation, prediction });
  } catch (error) {
    console.error('Fertilizer recommendation error:', error.message);
    const statusCode = error.response?.status === 503 ? 503 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.response?.data?.error || 'AI model service is currently unavailable',
      error: error.message
    });
  }
};

exports.getFertilizerHistory = async (req, res) => {
  try {
    const recommendations = await FertilizerRecommendation.find({ user: req.user._id })
      .populate('soilData')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, count: recommendations.length, data: recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFertilizerById = async (req, res) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id)
      .populate('soilData')
      .populate('user', 'name email');

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }

    if (recommendation.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to access this recommendation' });
    }

    res.json({ success: true, data: recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit feedback for a recommendation
// @route   PATCH /api/fertilizer/:id/feedback
// @access  Private
exports.submitFeedback = async (req, res) => {
  try {
    const { isHelpful, feedbackText } = req.body;

    let recommendation = await FertilizerRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }

    // Check if user owns the recommendation
    if (recommendation.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    recommendation.feedback = {
      isHelpful,
      feedbackText,
      updatedAt: Date.now()
    };

    await recommendation.save();

    res.json({ success: true, data: recommendation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
