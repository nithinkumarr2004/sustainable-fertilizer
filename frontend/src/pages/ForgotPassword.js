import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaEnvelope, FaLeaf, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetInfo, setResetInfo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/auth/forgot-password', { email });
      
      if (response.data.success) {
        setSuccess(response.data.message);
        
        // In development, show the reset token and URL
        if (response.data.resetToken) {
          setResetInfo({
            token: response.data.resetToken,
            url: response.data.resetUrl
          });
        }
      } else {
        setError(response.data.message || 'Failed to process request');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      
      // Provide more detailed error messages
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend server is running on port 3000.');
      } else if (err.response) {
        // Server responded with error status
        setError(err.response.data?.message || `Server error: ${err.response.status}. Please try again.`);
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please check your connection and try again.');
      } else {
        setError(err.message || 'Failed to send reset email. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-600 p-3 rounded-full">
              <FaLeaf className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <p className="font-semibold mb-2">{success}</p>
            {resetInfo && (
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                <p className="font-semibold mb-2">Development Mode - Reset Link:</p>
                <p className="break-all text-xs mb-2">{resetInfo.url}</p>
                <p className="text-xs text-gray-600">
                  Copy this link and open it in your browser to reset your password.
                </p>
              </div>
            )}
            <div className="mt-3">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {!success && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                <FaArrowLeft className="mr-2" />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

