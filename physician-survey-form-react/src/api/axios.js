import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API base URL
  withCredentials: true, // Important for sending cookies (like your token)
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You don't explicitly add the 'token' to headers here if it's in a cookie.
    // `withCredentials: true` handles sending the cookie automatically.
    // This interceptor is more useful for adding other headers, or logging.
    // If your token was in localStorage/sessionStorage, you'd add it here:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      // You would typically use your AuthContext's logout/redirect logic here
      console.log('Unauthorized request, redirecting to login...');
      // Example: window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;