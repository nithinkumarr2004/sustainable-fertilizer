import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaChartLine, FaBrain, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Fertilizer Optimization System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Optimize your fertilizer usage with AI-powered recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/prediction"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Go to Prediction Tool</span>
                  <FaArrowRight />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <FaArrowRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <FaBrain className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms analyze your soil data to provide accurate fertilizer recommendations.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
              <p className="text-gray-600">
                Track your soil health over time with detailed analytics and visualization tools.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Farming</h3>
              <p className="text-gray-600">
                Optimize fertilizer usage to reduce costs and environmental impact while maximizing crop yield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Input Soil Data</h3>
              <p className="text-gray-600 text-sm">
                Enter your soil parameters: N, P, K, pH, moisture, temperature, and crop type.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our AI model analyzes the data using advanced machine learning algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed fertilizer type, quantity, and improvement suggestions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Monitor your soil health over time and optimize your farming practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-primary-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Cost Reduction</h3>
                <p className="text-gray-600">Reduce fertilizer costs by up to 30% through optimized application.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-primary-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Increased Yield</h3>
                <p className="text-gray-600">Maximize crop yield with precise nutrient management.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-primary-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Environmental Protection</h3>
                <p className="text-gray-600">Minimize environmental impact through sustainable practices.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-primary-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Soil Health</h3>
                <p className="text-gray-600">Improve and maintain optimal soil health scores over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
