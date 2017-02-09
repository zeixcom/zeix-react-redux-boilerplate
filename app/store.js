import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import {defaultState} from './defaultState';

// import the router reducer
import rootReducer from './reducers';


const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./**/**/reducer.js/', () => {
    const nextRootReducer = require('./reducers.js').default;

    store.replaceReducer(nextRootReducer);
  });
}

export default store;
