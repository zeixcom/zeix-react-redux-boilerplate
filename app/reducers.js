import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
// IMPORT HERE//

const rootReducer = combineReducers({
// ADD REDUCER HERE //
  routing: routerReducer,
});

export default rootReducer;
