import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaLeaf, FaChartLine, FaArrowRight, FaHistory, FaCalculator } from 'react-icons/fa';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRecommendations: 0,
    averageHealthScore: 0,
    totalCostSavings: 0,
    recentRecommendations: []
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [historyRes] = await Promise.all([
        api.get('/fertilizer/history')
      ]);

      const recommendations = historyRes.data.data || [];
      
      setStats({
        totalRecommendations: recommendations.length,
        averageHealthScore: recommendations.length > 0
          ? (recommendations.reduce((sum, r) => sum + r.soilHealthScore, 0) / recommendations.length).toFixed(2)
          : 0,
        totalCostSavings: (recommendations.length * 50).toFixed(2), // Estimated savings
        recentRecommendations: recommendations.slice(0, 5)
      });

      // Prepare chart data (last 7 recommendations)
      const recent = recommendations.slice(0, 7).reverse();
      setChartData(recent.map(r => ({
        date: new Date(r.createdAt).toLocaleDateString(),
        healthScore: r.soilHealthScore,
        quantity: r.quantityKgPerAcre
      })));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const fertilizerTypeData = stats.recentRecommendations.reduce((acc, rec) => {
    const type = rec.fertilizerType;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(fertilizerTypeData).map(([name, value]) => ({
    name,
    value
  }));

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your fertilizer optimization dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Recommendations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRecommendations}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <FaLeaf className="text-primary-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Avg Health Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageHealthScore}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Est. Cost Savings</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalCostSavings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 text-2xl font-bold">$</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Recent Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recentRecommendations.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaHistory className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Soil Health Score Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="healthScore" stroke="#22c55e" strokeWidth={2} name="Health Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Fertilizer Quantity Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#3b82f6" name="Quantity (kg/acre)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {pieData.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Fertilizer Type Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/prediction"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-2 border-primary-200 hover:border-primary-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Get New Recommendation</h3>
                <p className="text-gray-600 mb-4">Use our AI-powered tool to get fertilizer recommendations</p>
              </div>
              <FaCalculator className="text-primary-600 text-3xl" />
            </div>
            <div className="flex items-center text-primary-600 font-semibold mt-4">
              <span>Try Now</span>
              <FaArrowRight className="ml-2" />
            </div>
          </Link>

          <Link
            to="/history"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-2 border-primary-200 hover:border-primary-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">View History</h3>
                <p className="text-gray-600 mb-4">Browse your past recommendations and soil data</p>
              </div>
              <FaHistory className="text-primary-600 text-3xl" />
            </div>
            <div className="flex items-center text-primary-600 font-semibold mt-4">
              <span>View All</span>
              <FaArrowRight className="ml-2" />
            </div>
          </Link>
        </div>

        {/* Recent Recommendations */}
        {stats.recentRecommendations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Recommendations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fertilizer Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Health Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentRecommendations.map((rec, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rec.inputData?.cropType || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          {rec.fertilizerType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rec.quantityKgPerAcre} kg/acre
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-semibold ${rec.soilHealthScore >= 70 ? 'text-green-600' : rec.soilHealthScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {rec.soilHealthScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/history"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All History →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
