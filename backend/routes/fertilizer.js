const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  recommendFertilizer,
  getFertilizerHistory,
  getFertilizerById
} = require('../controllers/fertilizerController');

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
