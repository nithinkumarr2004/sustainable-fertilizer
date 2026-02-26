import axios from 'axios';

// Use environment variable if set, otherwise use relative path (proxy handles it)
// In development, React proxy will forward /api/* to http://localhost:3000/api/*
// In production, use full URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
