import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
// IMPORT HERE //

const rootReducer = combineReducers({
pageReducer,
// ADD REDUCER HERE //
  routing: routerReducer,
});

export default rootReducer;
