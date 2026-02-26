const axios = require('axios');

const AI_MODEL_API_URL = process.env.AI_MODEL_API_URL || 'http://localhost:5000';

exports.getFertilizerPrediction = async (payload) => {
  try {
    const { data } = await axios.post(`${AI_MODEL_API_URL}/predict`, payload, {
      timeout: 10000 // 10 second timeout
    });
    return data;
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      throw new Error('AI model service is currently unavailable. Please ensure the AI model server is running on port 5000.');
    }
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.error || 'AI model service returned an error');
    }
    throw error;
  }
};








