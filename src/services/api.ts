import axios, {AxiosInstance} from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const TOKEN_KEY_NAME = 'six-cities-token';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_KEY_NAME);
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY_NAME);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};

