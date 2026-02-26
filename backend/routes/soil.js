const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { submitSoilData, getSoilHistory } = require('../controllers/soilController');

// @route   POST /api/soil/submit
// @desc    Submit soil data
// @access  Private
router.post('/submit',
  protect,
  [
    body('nitrogen').isFloat({ min: 0, max: 100 }).withMessage('Nitrogen must be between 0 and 100'),
    body('phosphorus').isFloat({ min: 0, max: 100 }).withMessage('Phosphorus must be between 0 and 100'),
    body('potassium').isFloat({ min: 0, max: 100 }).withMessage('Potassium must be between 0 and 100'),
    body('ph').isFloat({ min: 4.0, max: 8.5 }).withMessage('pH must be between 4.0 and 8.5'),
    body('moisture').isFloat({ min: 0, max: 100 }).withMessage('Moisture must be between 0 and 100'),
    body('temperature').isFloat({ min: 0, max: 50 }).withMessage('Temperature must be between 0 and 50'),
    body('cropType').isIn(['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Tomato', 'Potato', 'Sugarcane']).withMessage('Invalid crop type')
  ],
  submitSoilData
);

// @route   GET /api/soil/history
// @desc    Get user's soil data history
// @access  Private
router.get('/history', protect, getSoilHistory);

module.exports = router;
