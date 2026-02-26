const { validationResult } = require('express-validator');
const SoilData = require('../models/SoilData');

exports.submitSoilData = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const soilData = await SoilData.create({ ...req.body, user: req.user._id });
    const populatedData = await SoilData.findById(soilData._id).populate('user', 'name email');

    res.status(201).json({ success: true, data: populatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSoilHistory = async (req, res) => {
  try {
    const soilData = await SoilData.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, count: soilData.length, data: soilData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};








