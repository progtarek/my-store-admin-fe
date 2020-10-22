import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_URL;

let instance = axios.create({
  baseURL: API_ROOT,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('token') || null;
    if (AUTH_TOKEN) {
      config.headers.Authorization = `JWT ${AUTH_TOKEN}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const responseBody = (res) => res.data;
const catchError = (err) => {
  return Promise.reject(err.response.data);
};

const requests = {
  post: (url, body, params) =>
    instance.post(url, body, params).then(responseBody).catch(catchError),
  put: (url, body) =>
    instance.put(url, body).then(responseBody).catch(catchError),
  del: (url) => instance.delete(url).then(responseBody).catch(catchError),
  get: (url, params) =>
    instance.get(url, { params }).then(responseBody).catch(catchError),
};

const Auth = {
  login: (credentials) =>
    requests.post('/admins/auth/login', { ...credentials }),
};

const products = {
  getProducts: (params) => requests.get('/admins/product', params),
  createProduct: (body, params) =>
    requests.post('/admins/product', body, params),
};

const categories = {
  getCategories: (params) => requests.get('/admins/category', params),
};

export { Auth, products, categories };
