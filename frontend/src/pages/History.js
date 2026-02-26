import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaEye, FaCalendarAlt, FaLeaf } from 'react-icons/fa';
import api from '../services/api';

const History = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRec, setSelectedRec] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/fertilizer/history');
      setRecommendations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('common.history')}</h1>
            <p className="text-gray-600">{t('dashboard.history_subtitle')}</p>
          </div>
          <Link
            to="/prediction"
            className="bg-primary-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-700 flex items-center space-x-2"
          >
            <FaLeaf />
            <span>{t('dashboard.new_recommendation')}</span>
          </Link>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaLeaf className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">{t('dashboard.no_history')}</h2>
            <p className="text-gray-600 mb-6">{t('dashboard.no_history_desc')}</p>
            <Link
              to="/prediction"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700"
            >
              {t('prediction.submit')}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => setSelectedRec(rec)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <FaCalendarAlt />
                      <span className="text-sm">
                        {new Date(rec.createdAt).toLocaleDateString()} {new Date(rec.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthScoreColor(rec.soilHealthScore)}`}>
                      {t('results.health_score')}: {rec.soilHealthScore}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('prediction.crop_type')}</p>
                      <p className="font-semibold text-gray-900">{rec.inputData?.cropType || rec.inputData?.crop_type || rec.soilData?.cropType || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('results.fertilizer_type')}</p>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                        {rec.fertilizerType}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('results.quantity')}</p>
                      <p className="font-semibold text-gray-900">{rec.quantityKgPerAcre} {t('results.kg_acre')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">N-P-K</p>
                      <p className="font-semibold text-gray-900">
                        {rec.inputData?.nitrogen || rec.soilData?.nitrogen || 0}-{rec.inputData?.phosphorus || rec.soilData?.phosphorus || 0}-{rec.inputData?.potassium || rec.soilData?.potassium || 0}
                      </p>
                    </div>
                  </div>

                  <button
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRec(rec);
                    }}
                  >
                    <FaEye />
                    <span>{t('dashboard.view_details')}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              {selectedRec ? (
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">{t('dashboard.details_title')}</h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('dashboard.date')}</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedRec.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('prediction.crop_type')}</p>
                      <p className="font-semibold text-gray-900">{selectedRec.inputData?.cropType || selectedRec.inputData?.crop_type || selectedRec.soilData?.cropType || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('results.fertilizer_type')}</p>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">
                        {selectedRec.fertilizerType}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('results.quantity')}</p>
                      <p className="font-semibold text-gray-900">{selectedRec.quantityKgPerAcre} {t('results.kg_acre')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('results.health_score')}</p>
                      <p className={`text-2xl font-bold ${getHealthScoreColor(selectedRec.soilHealthScore).split(' ')[0]}`}>
                        {selectedRec.soilHealthScore}
                      </p>
                    </div>
                  </div>

                  {/* Input Data */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-800">{t('prediction.form_title')}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">N:</span> <span className="font-semibold">{selectedRec.inputData?.nitrogen || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">P:</span> <span className="font-semibold">{selectedRec.inputData?.phosphorus || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">K:</span> <span className="font-semibold">{selectedRec.inputData?.potassium || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">pH:</span> <span className="font-semibold">{selectedRec.inputData?.ph || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Moisture:</span> <span className="font-semibold">{selectedRec.inputData?.moisture || 0}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Temp:</span> <span className="font-semibold">{selectedRec.inputData?.temperature || 0}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Deficiency Analysis */}
                  {selectedRec.deficiencyAnalysis && selectedRec.deficiencyAnalysis.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2 text-gray-800">{t('results.deficiency_analysis')}</h3>
                      <div className="space-y-2">
                        {selectedRec.deficiencyAnalysis.slice(0, 3).map((def, index) => (
                          <div key={index} className={`p-3 rounded-lg text-sm ${getSeverityColor(def.severity)}`}>
                            <div className="font-semibold mb-1">{def.nutrient}</div>
                            <div className="text-xs">{def.status} - {def.severity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {selectedRec.improvementSuggestions && selectedRec.improvementSuggestions.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-800">{t('results.improvement_suggestions')}</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {selectedRec.improvementSuggestions.slice(0, 3).map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary-600 mt-1">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  <FaEye className="text-4xl mx-auto mb-4 text-gray-300" />
                  <p>{t('dashboard.select_to_view')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
