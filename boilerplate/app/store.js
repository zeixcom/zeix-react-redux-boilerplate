import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

// import the root saga
import rootSaga from './sagas/root';

// import the root reducer
import rootReducer from './reducers';

export default function createStoreWithMiddleware(history, data) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [reduxRouterMiddleware, sagaMiddleware];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      || compose;
  const store = createStore(rootReducer, data, composeEnhancers(
      applyMiddleware(...middleware)
  ));

  sagaMiddleware.run(rootSaga);

  return store;
}