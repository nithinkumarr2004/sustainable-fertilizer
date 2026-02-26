import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaMapMarkerAlt, FaSync, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import api from '../services/api';

const PredictionTool = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(null); // null, 'liked', 'disliked'
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [detectedLocation, setDetectedLocation] = useState('');

  const cropTypes = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Tomato', 'Potato', 'Sugarcane'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setFetchingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await api.post('/fertilizer/fetch-location-data', {
            lat: latitude,
            lon: longitude
          });

          if (response.data.success) {
            const autoData = response.data.data;
            setFormData(prev => ({
              ...prev,
              nitrogen: autoData.nitrogen,
              phosphorus: autoData.phosphorus,
              potassium: autoData.potassium,
              ph: autoData.ph,
              moisture: autoData.moisture,
              temperature: autoData.temperature
            }));
            setDetectedLocation(autoData.locationName);
          }
        } catch (err) {
          setError('Failed to fetch location-based soil data. Please try entering manually.');
          console.error(err);
        } finally {
          setFetchingLocation(false);
        }
      },
      (err) => {
        setFetchingLocation(false);
        setError('Location access denied. Please enable location permissions or enter data manually.');
      },
      { timeout: 10000 }
    );
  };

  const handleFeedback = async (isHelpful) => {
    try {
      await api.patch(`/fertilizer/${result._id}/feedback`, {
        isHelpful
      });
      setFeedbackSubmitted(isHelpful ? 'liked' : 'disliked');
    } catch (err) {
      console.error('Failed to submit feedback', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setDetectedLocation('');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('prediction.title')}</h1>
          <p className="text-gray-600">{t('prediction.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">{t('prediction.form_title')}</h2>
              <button
                type="button"
                onClick={handleAutoDetect}
                disabled={fetchingLocation}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {fetchingLocation ? (
                  <FaSync className="animate-spin mr-2" />
                ) : (
                  <FaMapMarkerAlt className="mr-2" />
                )}
                {fetchingLocation ? t('prediction.detecting') : t('prediction.auto_detect')}
              </button>
            </div>

            {detectedLocation && (
              <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md flex items-center space-x-2 text-blue-700 animate-fade-in shadow-sm">
                <FaMapMarkerAlt className="flex-shrink-0 text-blue-500" />
                <span className="text-sm font-medium">{t('prediction.detected_location')}: <span className="font-bold underline">{detectedLocation}</span></span>
                <button
                  onClick={() => setDetectedLocation('')}
                  className="ml-auto text-blue-400 hover:text-blue-600 transition-colors"
                  title="Clear location"
                >
                  &times;
                </button>
              </div>
            )}

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
                    {t('prediction.nitrogen')} <span className="text-red-500">*</span>
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
                    {t('prediction.phosphorus')} <span className="text-red-500">*</span>
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
                    {t('prediction.potassium')} <span className="text-red-500">*</span>
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
                    {t('prediction.ph')} <span className="text-red-500">*</span>
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
                    {t('prediction.moisture')} <span className="text-red-500">*</span>
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
                    {t('prediction.temperature')} <span className="text-red-500">*</span>
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
                  {t('prediction.crop_type')} <span className="text-red-500">*</span>
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
                    <option key={crop} value={crop}>{t(`crops.${crop}`)}</option>
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
                    <span>{t('prediction.analyzing')}</span>
                  </>
                ) : (
                  <>
                    <FaLeaf />
                    <span>{t('prediction.submit')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('home.how_it_works')}</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('home.step1_title')}</h3>
                  <p className="text-gray-600 text-sm">{t('home.step1_desc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('home.step2_title')}</h3>
                  <p className="text-gray-600 text-sm">{t('home.step2_desc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-full">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{t('home.step3_title')}</h3>
                  <p className="text-gray-600 text-sm">{t('home.step3_desc')}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <FaInfoCircle className="text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">{t('home.benefits')}</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• {t('about.tip_timing')}</li>
                    <li>• {t('about.tip_quantity')}</li>
                    <li>• {t('prediction.crop_type')}</li>
                    <li>• {t('about.tip_moisture')}</li>
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
              <span>{t('results.title')}</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t('results.fertilizer_type')}</h3>
                <p className="text-3xl font-bold text-primary-600">{result.fertilizerType || result.fertilizer_type}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t('results.quantity')}</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {result.quantityKgPerAcre || result.quantity_kg_per_acre} <span className="text-lg">{t('results.kg_acre')}</span>
                </p>
              </div>
              <div className={`p-6 rounded-lg ${getHealthScoreColor(result.soilHealthScore || result.soil_health_score).includes('green') ? 'bg-green-50' : getHealthScoreColor(result.soilHealthScore || result.soil_health_score).includes('yellow') ? 'bg-yellow-50' : 'bg-red-50'}`}>
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t('results.health_score')}</h3>
                <p className={`text-3xl font-bold ${getHealthScoreColor(result.soilHealthScore || result.soil_health_score)}`}>
                  {result.soilHealthScore || result.soil_health_score}
                </p>
              </div>
            </div>

            {/* Deficiency Analysis */}
            {(result.deficiencyAnalysis || result.deficiency_analysis) && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t('results.deficiency_analysis')}</h3>
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
                <h3 className="text-xl font-bold mb-4 text-gray-800">{t('results.improvement_suggestions')}</h3>
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

            {/* Feedback Section */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('results.feedback_question')}</h3>
                {feedbackSubmitted ? (
                  <div className="flex items-center space-x-2 text-green-600 animate-bounce">
                    <FaCheckCircle />
                    <span className="font-medium">{t('results.feedback_success')}</span>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleFeedback(true)}
                      className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 hover:border-green-500 hover:text-green-600 transition-all font-medium"
                    >
                      <FaThumbsUp />
                      <span>{t('results.helpful')}</span>
                    </button>
                    <button
                      onClick={() => handleFeedback(false)}
                      className="flex items-center space-x-2 px-6 py-2 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-600 transition-all font-medium"
                    >
                      <FaThumbsDown />
                      <span>{t('results.not_useful')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionTool;
