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
    instance.patch(url, body).then(responseBody).catch(catchError),
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
  getProduct: (id) => requests.get(`admins/product/${id}`, null),
  createProduct: (body, params) =>
    requests.post('/admins/product', body, params),
  deleteProduct: (id) => requests.del(`admins/product/${id}`),
  updateProduct: (id, payload) => requests.put(`admins/product/${id}`, payload),
};

const categories = {
  getCategories: (params) => requests.get('/admins/category', params),
  getCategory: (id) => requests.get(`admins/category/${id}`, null),
  createCategory: (body, params) =>
    requests.post('/admins/category', body, params),
  deleteCategory: (id) => requests.del(`admins/category/${id}`),
  updateCategory: (id, payload) =>
    requests.put(`admins/category/${id}`, payload),
};

const media = {
  upload: (files) => requests.post('media/upload', files),
};

export { Auth, products, categories, media };
