// reducers.js
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './auth.reducer';

const createRootReducer = (history) =>
  combineReducers({
    auth: authReducer,
    router: connectRouter(history),
  });
export default createRootReducer;
