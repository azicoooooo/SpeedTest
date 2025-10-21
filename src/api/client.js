import axios from 'axios';

const DEFAULT_BASE_URL = '/api';
const baseURL = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setAuthToken = (token) => {
  if (!token) {
    delete apiClient.defaults.headers.common.Authorization;
    return;
  }

  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiUtils = {
  baseURL,
  hasCustomBaseUrl: Boolean(import.meta.env.VITE_API_BASE_URL)
};
