import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import topics from './components/Topic/reducer.js';

const rootReducer = combineReducers({topics, routing: routerReducer});

export default rootReducer;