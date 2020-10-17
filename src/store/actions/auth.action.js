import { LOGIN_REQUEST, LOGOUT } from '../constants';

export const loginRequestAction = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const logoutAction = () => ({
  type: LOGOUT,
});
