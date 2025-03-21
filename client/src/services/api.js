import axios from 'axios';
import "dotenv/config";

// For now, we'll use mock data. In a real app, you'd use an actual API endpoint
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle API errors (like 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Handle auth error - e.g., redirect to login
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; // ✅ Fixed export
