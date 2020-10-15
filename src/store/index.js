import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers/index';
import * as logger from 'redux-logger';
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const reduxLogger = logger.createLogger();

/*eslint-disable */
const composeSetup =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
/*eslint-enable */

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeSetup(
      applyMiddleware(routerMiddleware(history), reduxLogger, sagaMiddleware)
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
