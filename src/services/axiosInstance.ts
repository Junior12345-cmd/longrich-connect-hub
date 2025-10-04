import axios from 'axios';

// Crée une instance Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // change si ton backend est ailleurs
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // pas besoin pour API stateless
});

// Interceptor pour ajouter le token automatiquement
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
