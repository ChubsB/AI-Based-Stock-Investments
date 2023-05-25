import axios from 'axios';
import jwtDecode from 'jwt-decode';

//baseURL: 'https://your-backend-api-url.com',
//baseURL: '',

const apiClient = axios.create({
  baseURL: 'https://rupi-backend.vercel.app',
});

apiClient.interceptors.request.use((config) => {
  if (config.url !== '/login') {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
}

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function isTokenValid() {
  const token = getAuthToken();
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
}

export default apiClient;