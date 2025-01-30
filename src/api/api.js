import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("JWT_TOKEN")
    ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
    : null;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token in Authorization header
    }
    // If there is no token, simply return the config without modifications
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 ) {
      // Token expired or unauthorized - redirect to login page

      localStorage.removeItem('JWT_TOKEN'); 
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default api;
