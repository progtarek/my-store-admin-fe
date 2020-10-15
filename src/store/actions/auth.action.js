import { LOGIN_REQUEST } from '../constants';

export const loginRequestAction = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});
