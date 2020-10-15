import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../constants';

const initialState = {
  username: null,
  firstName: null,
  lastName: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
