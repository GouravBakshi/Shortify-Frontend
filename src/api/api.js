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
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message || error.response.data.detail || '';

      if (errorMessage.includes("Invalid login credentials")) {
        // console.error("Invalid username or password.");

      } else if (errorMessage.includes("JWT token has expired")) {
        // console.error("JWT token expired. Please log in again.");
        localStorage.removeItem('JWT_TOKEN');
        window.location.replace('/login');
      } else if (errorMessage.includes("JWT signature is invalid")) {
        // console.error("JWT signature is invalid.");
        localStorage.removeItem('JWT_TOKEN');
        window.location.replace('/login');
      } else if (errorMessage.includes("Malformed JWT")) {
        // console.error("JWT is malformed.");
        localStorage.removeItem('JWT_TOKEN');
        window.location.replace('/login');
      } else {
        // console.error("Unauthorized access. Please log in.");
        localStorage.removeItem('JWT_TOKEN');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
