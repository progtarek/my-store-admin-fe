import { LOGIN_SUCCESS } from '../constants';

const initialState = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
};
