const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  recommendFertilizer,
  getFertilizerHistory,
  getFertilizerById,
  submitFeedback
} = require('../controllers/fertilizerController');
const { getWeatherData, getSoilGridsData, getReverseGeocoding, getDetailedAddress } = require('../services/locationService');

// @route   PATCH /api/fertilizer/:id/feedback
// @desc    Submit feedback for a recommendation
// @access  Private
router.patch('/:id/feedback', protect, submitFeedback);

// @route   POST /api/fertilizer/fetch-location-data
// @desc    Fetch automated soil and weather data based on location
// @access  Private
router.post('/fetch-location-data', protect, async (req, res) => {
  try {
    const { lat, lon } = req.body;
    if (!lat || !lon) {
      return res.status(400).json({ success: false, message: 'Latitude and Longitude are required' });
    }

    const weatherTask = getWeatherData(lat, lon);
    const soilTask = getSoilGridsData(lat, lon);
    const addressTask = getDetailedAddress(lat, lon);

    const [weather, soil, detailedAddress] = await Promise.all([weatherTask, soilTask, addressTask]);

    res.json({
      success: true,
      data: {
        ...soil,
        temperature: weather.temperature,
        moisture: weather.humidity, // Mapping humidity to moisture as a proxy
        locationName: detailedAddress || weather.locationName
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/fertilizer/recommend
// @desc    Get fertilizer recommendation
// @access  Private
router.post('/recommend', protect, recommendFertilizer);

// @route   GET /api/fertilizer/history
// @desc    Get user's fertilizer recommendation history
// @access  Private
router.get('/history', protect, getFertilizerHistory);

// @route   GET /api/fertilizer/:id
// @desc    Get single recommendation by ID
// @access  Private
router.get('/:id', protect, getFertilizerById);

module.exports = router;
