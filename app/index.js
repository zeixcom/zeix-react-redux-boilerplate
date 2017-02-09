import React from 'react';
import {render} from 'react-dom';

import App from './components/App/index';

import {Router, Route, IndexRoute} from 'react-router';

import {Provider} from 'react-redux';
import store, {history} from './store';

import css from './assets/style.scss'; // eslint-disable-line no-unused-vars

const router = () => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Topic}></IndexRoute>
        </Route>
      </Router>
    </Provider>
  );
};

render(router(), document.getElementById('app'));
