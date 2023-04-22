import axios from 'axios';

//baseURL: 'https://your-backend-api-url.com',
//baseURL: '',

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
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

export default apiClient;