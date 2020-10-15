import axios from 'axios';

const API_ROOT = process.env.REACT_APP_API_URL;
const AUTH_TOKEN = localStorage.getItem('token') || null;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const instance = axios.create({
  baseURL: API_ROOT,
  headers: { Authorization: `JWT ${AUTH_TOKEN}` },
});

const responseBody = (res) => res.data;
const catchError = (err) => {
  return Promise.reject(err.response.data);
};

const requests = {
  post: (url, body) =>
    instance.post(url, body).then(responseBody).catch(catchError),
  put: (url, body) =>
    instance.put(url, body).then(responseBody).catch(catchError),
  del: (url) => instance.delete(url).then(responseBody).catch(catchError),
  get: (url) => instance.get(url).then(responseBody).catch(catchError),
};

const Auth = {
  login: (credentials) =>
    requests.post('/admins/auth/login', { ...credentials }),
};

export { Auth };
