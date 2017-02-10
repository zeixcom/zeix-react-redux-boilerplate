import React from 'react';
import {render} from 'react-dom';

import App from './containers/App/App';

import {Router, Route, IndexRoute} from 'react-router';

import {Provider} from 'react-redux';
import store, {history} from './store';

import css from './assets/style.scss'; // eslint-disable-line no-unused-vars

const router = () => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute></IndexRoute>
        </Route>
      </Router>
    </Provider>
  );
};

render(router(), document.getElementById('app'));
