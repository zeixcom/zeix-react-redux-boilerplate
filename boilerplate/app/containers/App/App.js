import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../Main/Main';

// IMPORT ACTIONS HERE //

function mapStateToProps(state) {
  return {
// ADD STATE RETURN //
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
// ADD ACTIONS HERE //
  ), dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
