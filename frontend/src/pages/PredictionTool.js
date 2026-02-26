import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import api from '../services/api';

const PredictionTool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: '',
    temperature: '',
    cropType: 'Wheat'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const cropTypes = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Tomato', 'Potato', 'Sugarcane'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/fertilizer/recommend', formData);
      
      if (response.data.success) {
        setResult(response.data.data || response.data.prediction);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Moderate':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Optimized Fertilizer Prediction Tool</h1>
          <p className="text-gray-600">Enter your soil parameters to get AI-powered fertilizer recommendations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Soil Parameters</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start space-x-2">
                <FaExclamationTriangle className="mt-1" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
                    Nitrogen (N) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    value={formData.nitrogen}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0-100</p>
                </div>

                <div>
                  <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">
                    Phosphorus (P) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    value={formData.phosphorus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0-100</p>
                </div>

                <div>
                  <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
                    Potassium (K) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="potassium"
                    name="potassium"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    value={formData.potassium}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0-100</p>
                </div>

                <div>
                  <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">
                    pH Level <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="ph"
                    name="ph"
                    min="4.0"
                    max="8.5"
                    step="0.1"
                    required
                    value={formData.ph}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="4.0-8.5"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 4.0-8.5</p>
                </div>

                <div>
                  <label htmlFor="moisture" className="block text-sm font-medium text-gray-700 mb-1">
                    Moisture (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="moisture"
                    name="moisture"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    value={formData.moisture}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0-100%</p>
                </div>

                <div>
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°C) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    min="0"
                    max="50"
                    step="0.1"
                    required
                    value={formData.temperature}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Range: 0-50°C</p>
                </div>
              </div>

              <div>
                <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="cropType"
                  name="cropType"
                  required
                  value={formData.cropType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {cropTypes.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <FaLeaf />
                    <span>Get Recommendation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enter Soil Data</h3>
                  <p className="text-gray-600 text-sm">Fill in all required parameters accurately for best results.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI Analysis</h3>
                  <p className="text-gray-600 text-sm">Our ML model analyzes your data and generates recommendations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Results</h3>
                  <p className="text-gray-600 text-sm">Receive detailed recommendations with fertilizer type, quantity, and suggestions.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Tips for Best Results</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use recent soil test results</li>
                    <li>• Measure moisture and temperature at the same time</li>
                    <li>• Select the correct crop type</li>
                    <li>• Regular testing improves accuracy over time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div id="results" className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center space-x-2">
              <FaCheckCircle className="text-green-600" />
              <span>Recommendation Results</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Recommended Fertilizer Type</h3>
                <p className="text-3xl font-bold text-primary-600">{result.fertilizerType || result.fertilizer_type}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Quantity Required</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {result.quantityKgPerAcre || result.quantity_kg_per_acre} <span className="text-lg">kg/acre</span>
                </p>
              </div>
              <div className={`p-6 rounded-lg ${getHealthScoreColor(result.soilHealthScore || result.soil_health_score).includes('green') ? 'bg-green-50' : getHealthScoreColor(result.soilHealthScore || result.soil_health_score).includes('yellow') ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Soil Health Score</h3>
                <p className={`text-3xl font-bold ${getHealthScoreColor(result.soilHealthScore || result.soil_health_score)}`}>
                  {result.soilHealthScore || result.soil_health_score}
                </p>
              </div>
            </div>

            {/* Deficiency Analysis */}
            {(result.deficiencyAnalysis || result.deficiency_analysis) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Deficiency Analysis</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(result.deficiencyAnalysis || result.deficiency_analysis).map((def, index) => (
                    <div key={index} className={`p-4 rounded-lg ${getSeverityColor(def.severity)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{def.nutrient}</h4>
                        <span className="text-xs font-semibold px-2 py-1 rounded">{def.severity}</span>
                      </div>
                      <p className="text-sm mb-2">
                        Level: {def.level} - <span className="font-semibold">{def.status}</span>
                      </p>
                      <p className="text-sm">{def.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            {(result.improvementSuggestions || result.improvement_suggestions) && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Improvement Suggestions</h3>
                <div className="space-y-2">
                  {(result.improvementSuggestions || result.improvement_suggestions).map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                      <FaInfoCircle className="text-primary-600 mt-1" />
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/history')}
                className="bg-primary-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-700"
              >
                View History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionTool;
